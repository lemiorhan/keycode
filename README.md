# Keycode Terminal Based Presentation Tool

Terminal-based presentation app for terminal or console apps.

## Install

```bash
npm install
```

## Run

The main launcher is [present](/Users/lemiorhan/CascadeProjects/keycode/present).

```bash
./present /path/to/slidedeck-folder
```

The input must be a folder containing `slides.md`.

Example:

```text
my-talk/
  slides.md
```

If you want to run `present` without `./`, add this repo to your `PATH`, symlink the script into a directory on your `PATH`, or install the package globally.

## Deck format

Use a single UTF-8 Markdown file named `slides.md`.

- Separate slides with `---` on its own line.
- Multi-line content is supported.
- `[QUESTION]` anywhere in a slide pauses on that slide until input is entered and `Enter` is pressed.
- The first and last slides preserve spacing well for ASCII-art-heavy content.

## Title blocks

Use `<title>...</title>` for titles. Multi-line titles are supported.

Example:

```md
<title>
The Rebirth of Software Craftsmanship
in the AI Era
</title>

Lemi Orhan Ergin
Co-Founder at Craftgate
```

The title is rendered automatically inside a centered ASCII box with padding and margin.

## Slide sizes

Use `<size>...</size>` inside a slide to increase its visual presence.

Supported values:

- `normal`
- `large`
- `xlarge`

Example:

```md
<size>xlarge</size>
<title>
The Rebirth of Software Craftsmanship
in the AI Era
</title>
```

Image tags are ignored if present in old decks.

## QR blocks

Use `<qr>...</qr>` to place a QR code on a slide.

Example:

```md
<title>
Join the live notes
</title>

<qr>
https://example.com/talk
</qr>

Scan to follow along
```

Behavior:

- The QR is rendered in monochrome terminal blocks.
- It is anchored to the bottom-right of the terminal.
- The rest of the slide is centered in the remaining space and will not overlap the QR.
- QR slides skip the scramble transition so the code stays scannable.

## Controls

- `Right` / `Down`: next slide
- `Left` / `Up`: previous slide
- `q` or `Ctrl+C`: quit

## Development

Run directly in dev mode:

```bash
npx tsx src/cli.tsx /path/to/slidedeck-folder/slides.md
```

Build the app:

```bash
npm run build
```

Run tests:

```bash
npm test
```
