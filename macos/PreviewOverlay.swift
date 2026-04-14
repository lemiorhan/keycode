import AppKit

struct ColorSpan {
    let color: NSColor
    let range: NSRange
}

final class NonActivatingPanel: NSPanel {
    override var canBecomeKey: Bool { false }
    override var canBecomeMain: Bool { false }
}

final class ZoomableScrollView: NSScrollView {
    var onZoom: ((CGFloat) -> Void)?

    override func scrollWheel(with event: NSEvent) {
        if event.modifierFlags.contains(.command) {
            let delta = event.scrollingDeltaY

            if abs(delta) > 0.1 {
                onZoom?(delta > 0 ? 1 : -1)
            }

            return
        }

        super.scrollWheel(with: event)
    }

    override func magnify(with event: NSEvent) {
        if abs(event.magnification) > 0.01 {
            onZoom?(event.magnification > 0 ? 1 : -1)
        }
    }
}

final class PreviewController: NSObject, NSApplicationDelegate {
    private let left: CGFloat
    private let top: CGFloat
    private let width: CGFloat
    private let height: CGFloat
    private var panel: NSPanel?
    private var scrollView: ZoomableScrollView?
    private var textView: NSTextView?
    private var fontSize: CGFloat = 11
    private var lastText: String = ""
    private static let minFontSize: CGFloat = 6
    private static let maxFontSize: CGFloat = 40

    init(left: CGFloat, top: CGFloat, width: CGFloat, height: CGFloat) {
        self.left = left
        self.top = top
        self.width = width
        self.height = height
    }

    private static let ansiColors: [String: NSColor] = [
        "31": NSColor(calibratedRed: 0.9, green: 0.3, blue: 0.3, alpha: 1),
        "32": NSColor(calibratedRed: 0.3, green: 0.85, blue: 0.3, alpha: 1),
        "33": NSColor(calibratedRed: 0.95, green: 0.85, blue: 0.3, alpha: 1),
        "34": NSColor(calibratedRed: 0.4, green: 0.5, blue: 1, alpha: 1),
        "35": NSColor(calibratedRed: 0.85, green: 0.4, blue: 0.85, alpha: 1),
        "36": NSColor(calibratedRed: 0.3, green: 0.9, blue: 0.9, alpha: 1),
        "37": NSColor.white,
        "90": NSColor(calibratedWhite: 0.55, alpha: 1)
    ]

    private func parseAnsiText(_ text: String) -> NSAttributedString {
        let defaultColor = NSColor(calibratedWhite: 0.85, alpha: 1)
        let font = NSFont.monospacedSystemFont(ofSize: fontSize, weight: .regular)
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.lineSpacing = 4

        let result = NSMutableAttributedString()
        var currentColor = defaultColor

        let pattern = try! NSRegularExpression(pattern: "\\x1b\\[([0-9;]*)m", options: [])
        let nsText = text as NSString
        var lastEnd = 0

        let matches = pattern.matches(in: text, options: [], range: NSRange(location: 0, length: nsText.length))

        for match in matches {
            let matchRange = match.range
            if matchRange.location > lastEnd {
                let chunk = nsText.substring(with: NSRange(location: lastEnd, length: matchRange.location - lastEnd))
                let attrs: [NSAttributedString.Key: Any] = [
                    .foregroundColor: currentColor,
                    .font: font,
                    .paragraphStyle: paragraphStyle
                ]
                result.append(NSAttributedString(string: chunk, attributes: attrs))
            }

            let codeRange = match.range(at: 1)
            let code = nsText.substring(with: codeRange)

            if code == "39" || code == "0" || code == "37" {
                currentColor = defaultColor
            } else if let color = PreviewController.ansiColors[code] {
                currentColor = color
            }

            lastEnd = matchRange.location + matchRange.length
        }

        if lastEnd < nsText.length {
            let chunk = nsText.substring(from: lastEnd)
            let attrs: [NSAttributedString.Key: Any] = [
                .foregroundColor: currentColor,
                .font: font,
                .paragraphStyle: paragraphStyle
            ]
            result.append(NSAttributedString(string: chunk, attributes: attrs))
        }

        return result
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        let primaryHeight = NSScreen.screens.first?.frame.height ?? 0

        guard primaryHeight > 0 else {
            NSApp.terminate(nil)
            return
        }

        let appKitY = primaryHeight - top - height
        let frame = NSRect(x: left, y: appKitY, width: width, height: height)

        let panel = NonActivatingPanel(
            contentRect: frame,
            styleMask: [.titled, .closable, .resizable, .miniaturizable, .nonactivatingPanel],
            backing: .buffered,
            defer: false
        )
        panel.title = "Slide Preview"
        panel.level = .floating
        panel.isFloatingPanel = true
        panel.hidesOnDeactivate = false
        panel.backgroundColor = NSColor(calibratedWhite: 0.08, alpha: 0.92)
        panel.isOpaque = false
        panel.hasShadow = true
        panel.collectionBehavior = [.canJoinAllSpaces, .stationary]
        panel.minSize = NSSize(width: 200, height: 120)
        panel.isMovableByWindowBackground = true

        let scrollView = ZoomableScrollView(frame: panel.contentView!.bounds)
        scrollView.hasVerticalScroller = true
        scrollView.hasHorizontalScroller = false
        scrollView.autoresizingMask = [.width, .height]
        scrollView.drawsBackground = false
        scrollView.borderType = .noBorder
        scrollView.onZoom = { [weak self] direction in
            self?.zoom(direction)
        }

        let textView = NSTextView(frame: scrollView.bounds)
        textView.isEditable = false
        textView.isSelectable = true
        textView.drawsBackground = false
        textView.textContainerInset = NSSize(width: 14, height: 14)
        textView.textContainer?.lineFragmentPadding = 4
        textView.textContainer?.widthTracksTextView = true

        scrollView.documentView = textView
        panel.contentView = scrollView

        self.panel = panel
        self.scrollView = scrollView
        self.textView = textView

        panel.orderFront(nil)

        readStdinAsync()
    }

    private func readStdinAsync() {
        let handle = FileHandle.standardInput

        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            var buffer = ""

            while true {
                let data = handle.availableData

                if data.isEmpty {
                    DispatchQueue.main.async {
                        NSApp.terminate(nil)
                    }
                    return
                }

                guard let chunk = String(data: data, encoding: .utf8) else {
                    continue
                }

                buffer += chunk

                while let separatorRange = buffer.range(of: "\n---END---\n") {
                    let message = String(buffer[buffer.startIndex..<separatorRange.lowerBound])
                    buffer = String(buffer[separatorRange.upperBound...])

                    DispatchQueue.main.async { [weak self] in
                        self?.handleMessage(message)
                    }
                }
            }
        }
    }

    private func handleMessage(_ message: String) {
        let trimmed = message.trimmingCharacters(in: .whitespacesAndNewlines)

        if trimmed == "---HIDE---" {
            panel?.orderOut(nil)
            return
        }

        if trimmed == "---SHOW---" {
            panel?.orderFront(nil)
            return
        }

        updateContent(message)
    }

    private func updateContent(_ text: String) {
        lastText = text
        guard let textView = self.textView else { return }

        if text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            textView.textStorage?.setAttributedString(NSAttributedString(string: ""))
            return
        }

        let attributed = parseAnsiText(text)
        textView.textStorage?.setAttributedString(attributed)
        textView.scrollToBeginningOfDocument(nil)
    }

    private func zoom(_ direction: CGFloat) {
        let newSize = fontSize + direction
        fontSize = min(max(newSize, PreviewController.minFontSize), PreviewController.maxFontSize)

        guard let textView = self.textView else { return }

        if lastText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            return
        }

        let attributed = parseAnsiText(lastText)
        textView.textStorage?.setAttributedString(attributed)
    }
}

guard CommandLine.arguments.count >= 5 else {
    exit(1)
}

let left = CGFloat(Double(CommandLine.arguments[1]) ?? 0)
let top = CGFloat(Double(CommandLine.arguments[2]) ?? 0)
let width = CGFloat(Double(CommandLine.arguments[3]) ?? 600)
let height = CGFloat(Double(CommandLine.arguments[4]) ?? 500)

let app = NSApplication.shared
let delegate = PreviewController(left: left, top: top, width: width, height: height)
app.setActivationPolicy(.accessory)
app.delegate = delegate
app.run()
