import AppKit

final class OverlayController: NSObject, NSApplicationDelegate {
    private let imagePath: String
    private let left: CGFloat
    private let top: CGFloat
    private let width: CGFloat
    private let height: CGFloat
    private let backgroundColorValue: String
    private var panel: NSPanel?

    init(
        imagePath: String,
        left: CGFloat,
        top: CGFloat,
        width: CGFloat,
        height: CGFloat,
        backgroundColorValue: String
    ) {
        self.imagePath = imagePath
        self.left = left
        self.top = top
        self.width = width
        self.height = height
        self.backgroundColorValue = backgroundColorValue
    }

    private func panelBackgroundColor() -> NSColor {
        let normalized = backgroundColorValue.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()

        if normalized.isEmpty || normalized == "transparent" || normalized == "clear" {
            return .clear
        }

        switch normalized {
        case "black":
            return .black
        case "white":
            return .white
        case "gray", "grey":
            return NSColor(calibratedWhite: 0.2, alpha: 1)
        case "dark":
            return NSColor(calibratedWhite: 0.1, alpha: 1)
        default:
            break
        }

        let hex = normalized.hasPrefix("#") ? String(normalized.dropFirst()) : normalized

        guard hex.count == 6, let value = Int(hex, radix: 16) else {
            return .clear
        }

        return NSColor(
            calibratedRed: CGFloat((value >> 16) & 0xff) / 255,
            green: CGFloat((value >> 8) & 0xff) / 255,
            blue: CGFloat(value & 0xff) / 255,
            alpha: 1
        )
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        guard let image = NSImage(contentsOfFile: imagePath),
              let screen = NSScreen.main ?? NSScreen.screens.first else {
            NSApp.terminate(nil)
            return
        }

        let screenHeight = screen.frame.height
        let appKitY = screenHeight - top - height
        let frame = NSRect(x: left, y: appKitY, width: width, height: height)

        let panel = NSPanel(
            contentRect: frame,
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered,
            defer: false
        )
        panel.level = .floating
        panel.isFloatingPanel = true
        panel.hidesOnDeactivate = false
        panel.backgroundColor = panelBackgroundColor()
        panel.isOpaque = panel.backgroundColor != .clear
        panel.hasShadow = true
        panel.collectionBehavior = [.canJoinAllSpaces, .stationary, .ignoresCycle]
        panel.ignoresMouseEvents = true

        let imageView = NSImageView(frame: NSRect(origin: .zero, size: frame.size))
        imageView.image = image
        imageView.imageScaling = .scaleProportionallyUpOrDown
        imageView.wantsLayer = true
        imageView.layer?.cornerRadius = 14
        imageView.layer?.masksToBounds = true
        panel.contentView = imageView

        self.panel = panel
        panel.orderFrontRegardless()
    }
}

guard CommandLine.arguments.count >= 6 else {
    exit(1)
}

let imagePath = CommandLine.arguments[1]
let left = CGFloat(Double(CommandLine.arguments[2]) ?? 0)
let top = CGFloat(Double(CommandLine.arguments[3]) ?? 0)
let width = CGFloat(Double(CommandLine.arguments[4]) ?? 420)
let height = CGFloat(Double(CommandLine.arguments[5]) ?? 420)
let backgroundColorValue = CommandLine.arguments.count >= 7 ? CommandLine.arguments[6] : "transparent"

let app = NSApplication.shared
let delegate = OverlayController(
    imagePath: imagePath,
    left: left,
    top: top,
    width: width,
    height: height,
    backgroundColorValue: backgroundColorValue
)
app.setActivationPolicy(.accessory)
app.delegate = delegate
app.run()
