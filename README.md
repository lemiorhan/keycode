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
  image.png
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

The title is rendered automatically as centered block-style terminal art.

## Image slides

Use `<image-url>...</image-url>` inside any slide.

Example:

```md
<image-url>
image.png
</image-url>

Meet Lemi
```

Behavior:

- Local image paths are resolved relative to the folder containing `slides.md`.
- HTTP(S) image URLs are also supported.
- Image slides render the image on the left side of the terminal.
- The slide text is centered inside the empty area on the right.
- Image slides skip the scramble transition so ANSI image rendering stays intact.

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
