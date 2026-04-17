# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- PDF export with `keycode exportToPdf <deck-name> [--zoom=N]` — exports all slides to a PDF file with dark background, colored monospace text, embedded images, and QR codes

## [0.1.0] - 2025-04-15

### Added

- Terminal-based slide presentation using `.sld` files with React and Ink
- Slide tags: `<title>`, `<header>`, `<beautify/>`, `<size>`, `<align>`, `<p>`, `<color>`, `<footnote>`, `<slide-number/>`, `<qr>`, `<image>`, `<screen>`, `<ascii-art>`
- Progressive content reveal with `=>` and `==>` lines
- Interactive question prompts with `[QUESTION]` tag
- AI simulation effect with `<ai-sim>` tag
- QR code generation and display in native macOS overlay
- Image display in native macOS overlay
- Presenter notes with `/* PRESENTER NOTES: */` blocks and floating overlay window
- Slide navigation with arrow keys, jump-to-slide with `:` prefix
- Live reload on `.sld`, `.index`, and image file changes
- Deck scaffolding with `keycode init <deck-name>`
- Preview mode with `keycode preview <deck-name>`
- Slide ordering via `.index` file or alphabetical fallback
- Smooth text scramble transitions between slides
- Two-screen split layouts with `<screen>` tags
- Zoom in/out for presenter notes (Cmd+scroll or pinch)
