# Keycode

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green.svg)](https://nodejs.org)
[![macOS](https://img.shields.io/badge/Platform-macOS-blue.svg)](https://www.apple.com/macos)

A terminal-based presentation tool for macOS. Write your slides in `.sld` files and present them directly in the terminal -- with colors, layouts, QR codes, images, animations, and more.

Built with TypeScript, React, and [Ink](https://github.com/vadimdemedes/ink).

## Features

- **Rich slide format** -- titles, headers, paragraphs, inline colors, footnotes, and ASCII art
- **Progressive reveal** -- show content step-by-step with `=>` reveal lines
- **QR codes** -- embed QR codes in slides, displayed in a native macOS overlay
- **Images** -- display images in a floating native window alongside your terminal
- **Two-screen layouts** -- split slides into side-by-side panels with `<screen>` tags
- **Presenter notes** -- write notes in `/* PRESENTER NOTES: */` blocks, shown in a separate floating overlay
- **Live reload** -- slides update instantly when you edit `.sld` files
- **Smooth transitions** -- text scramble animation between slides
- **Interactive questions** -- prompt the audience with `[QUESTION]` and capture input
- **AI simulation** -- typewriter-style text reveal with `<ai-sim>` for dramatic effect
- **Slide navigation** -- arrow keys, jump to any slide with `:` prefix
- **Zoom** -- Cmd+scroll or pinch to resize presenter notes

## Requirements

- **macOS** (native overlay windows use AppKit via Swift)
- **Node.js >= 22**
- **Terminal.app** or any terminal emulator

## Installation

```bash
git clone https://github.com/lemiorhan/keycode.git
cd keycode
npm install
```

Optionally build the TypeScript:

```bash
npm run build
```

To make `keycode` available globally, add the repo directory to your `PATH` or symlink the script:

```bash
ln -s "$(pwd)/keycode" /usr/local/bin/keycode
```

## Quick Start

Create a new deck:

```bash
./keycode init my-talk
```

This scaffolds a starter deck:

```
decks/
  my-talk/
    01-slides.sld
    images/
```

Present it:

```bash
./keycode present my-talk
```

## Usage

```bash
# Present a deck by name (looks in decks/ directory)
./keycode present my-talk

# Present a deck by explicit path
./keycode present /path/to/my-talk

# Preview slides in a floating window
./keycode preview my-talk

# Scaffold a new deck
./keycode init my-talk
```

### Keyboard Controls

| Key | Action |
|-----|--------|
| Right / Down | Next slide or reveal |
| Left / Up | Previous slide |
| `:N` + Enter | Jump to slide N |
| `q` | Quit |
| `p` | Toggle presenter notes overlay |
| Ctrl+C | Force quit |

### Deck Structure

Each deck is a directory containing one or more `.sld` files. Files are combined in alphabetical order, or you can control the order with an `.index` file:

```
my-talk/
  .index          # optional: controls slide file order
  01-intro.sld
  02-main.sld
  03-closing.sld
  images/
    photo.jpg
```

The `.index` file lists filenames without the `.sld` extension, one per line:

```
01-intro
02-main
03-closing
```

### Environment Variables

Configure via `.env` file in the project root (see `.env.example`):

| Variable | Description | Default |
|----------|-------------|---------|
| `DECK_SOURCE_PATH` | Base directory for deck folders | `./decks` |
| `SHOW_PRESENTER_NOTES` | Show presenter notes overlay | `false` |

## Slide Format

Slides are written in `.sld` files using a custom tag-based format. Here is a quick overview:

```
<beautify/>
<title>
My Presentation
</title>
Your Name

---

<header color=cyan>
First Topic
</header>

<p align=left max-width=72>
Content with <color fg="yellow">inline colors</color> and
automatic word wrapping.
</p>

---

<header color=green>
Step by Step
</header>

=> First point
=> Second point
=> Third point
```

### Supported Tags

| Tag | Purpose |
|-----|---------|
| `<title>` | Large centered title text |
| `<header>` | Colored section header |
| `<beautify/>` | Apply decorative styling to the slide |
| `<size>` | Set text size (`normal`, `large`, `xlarge`) |
| `<align>` | Set horizontal alignment (`left`, `center`, `right`) |
| `<p>` | Paragraph with word wrapping and alignment |
| `<color>` | Inline text coloring |
| `<footnote>` | Footnote at the bottom of the slide |
| `<slide-number/>` | Display current slide number |
| `<qr>` | Embed a QR code |
| `<image>` | Display an image in a native overlay |
| `<screen>` | Define split-screen layout panels |
| `<ascii-art>` | Preserve whitespace for ASCII art |
| `[QUESTION]` | Interactive question prompt |
| `<ai-sim>` | AI-style typewriter simulation |
| `=>` / `==>` | Progressive content reveal lines |
| `/* PRESENTER NOTES: */` | Speaker notes (shown in overlay) |

For complete documentation of every tag, attribute, and behavior, see [REFERENCE.md](REFERENCE.md).

## Development

Run directly in dev mode (no build step):

```bash
npx tsx src/cli.tsx decks/sample-deck
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

See [CONVENTIONS.md](CONVENTIONS.md) for code style and project conventions.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
