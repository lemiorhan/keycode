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

Add `<beautify/>` to a slide to enable decorative ASCII ornament bands around the content. This is especially useful for title slides with a lot of empty space.

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

## Paragraphs

Use `<p ...>...</p>` to soft-wrap text to a fixed width.

Supported properties:

- `max-width`
- `align`

Supported `align` values:

- `left`
- `center`
- `right`

Example:

```md
<p max-width=80 align=left>
People without developer background are sometimes shipping AI-generated prototypes faster than experienced engineers.
</p>
```

QR slides still default to left-aligned text unless you explicitly use paragraph alignment.

## Inline colors

Use `<color fg="...">...</color>` to highlight parts of a line.

Supported foreground colors:

- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `gray`

Example:

```md
This is <color fg="cyan">highlighted</color> text.
```

## Footnotes

Use `<footnote>...</footnote>` to pin a gray note to the bottom of the slide.

Multi-line footnotes are supported.

Example:

```md
Main slide content

<footnote>
Source: Example report
Updated March 2026
</footnote>
```

## ASCII Art Side Pane

Use two `<screen ...></screen>` tags to split the terminal into a media pane and a text pane. The first screen becomes the media pane and the second screen becomes the text pane.

Example:

```md
<screen content-align=right width=40%></screen>
<screen content-align=left width=60%></screen>

<ascii-art>
  /\\_/\\\\
 ( o.o )
  > ^ <
</ascii-art>

Speaker notes and content go on the other side.

`content-align` supports `left`, `center`, and `right`. `width` controls each pane width as a percentage of the terminal width.
```

## QR blocks

Use `<qr>...</qr>` or `<qr width=30%>...</qr>` to place a QR code on a slide.

Example:

```md
<title>
Join the live notes
</title>

<qr width=30%>
https://example.com/talk
</qr>

Scan to follow along
```

Behavior:

- On macOS, the QR is shown in a lightweight native overlay window above Terminal.
- The overlay is positioned near the bottom-right of the Terminal window when possible.
- The overlay is designed to stay visible without taking focus away from Terminal.
- `width` controls the overlay width as a percentage of the Terminal window width.
- The PNG is cached in the deck folder using a deterministic filename derived from the QR content.
- Existing QR PNG files are reused if they already exist.
- The terminal slide itself stays text-only and defaults to left alignment unless you override it.
- QR slides skip the scramble transition so the code stays scannable.

## Image overlays

Use `<image ...>` to show an external image overlay on macOS using the same native viewer flow as QR.

Example:

```md
<screen content-align=center width=40%></screen>
<screen content-align=left width=60%></screen>

<image path="lemi.png" width=30% bg-color="#111111">

Lemi Orhan Ergin
Co-Founder at Craftgate
```

Properties:

- `path`: relative to the deck folder, or an absolute filesystem path
- `width`: overlay width as a percentage of the Terminal window width
- `bg-color`: background color for the native overlay panel, for example `#111111`, `black`, `white`, or `gray`

Behavior:

- The image opens in the native overlay window above Terminal.
- The image is shown in the first screen pane and horizontally centered there.
- Height is calculated automatically from the image aspect ratio.
- Relative image paths are resolved from the folder containing `slides.md`.
- The overlay closes automatically when you leave the slide or quit.

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
