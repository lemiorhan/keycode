# Keycode Slide Format Reference

> **Purpose:** Comprehensive reference for humans and AI agents authoring `.sld` slide files for the Keycode terminal presentation tool. This document describes every supported tag, attribute, behavior, interaction, and convention. Keep this document in sync whenever the slide format changes.

---

## Table of Contents

1. [File Structure](#file-structure)
2. [Slide Separator](#slide-separator)
3. [Comments](#comments)
4. [Plain Text Content](#plain-text-content)
5. [Tags Reference](#tags-reference)
   - [`<title>`](#title)
   - [`<header>`](#header)
   - [`<beautify/>`](#beautify)
   - [`<size>`](#size)
   - [`<align>`](#align)
   - [`<p>`](#p-paragraph)
   - [`<color>`](#color)
   - [`<footnote>`](#footnote)
   - [`<slide-number/>`](#slide-number)
   - [`<qr>`](#qr)
   - [`<image>`](#image)
   - [`<screen>`](#screen)
   - [`<ascii-art>`](#ascii-art)
   - [`[QUESTION]`](#question-token)
   - [`<ai-sim>`](#ai-sim)
   - [Reveal Lines (`=>` and `==>`)](#reveal-lines--and-)
6. [Tag Interactions & Composition Rules](#tag-interactions--composition-rules)
7. [Layout Behavior](#layout-behavior)
8. [Navigation & Controls](#navigation--controls)
9. [Live Reload](#live-reload)
10. [Conventions & Best Practices](#conventions--best-practices)
11. [Complete Slide Examples](#complete-slide-examples)

---

## File Structure

- All decks live under the **`decks/`** folder in the project root.
- Each deck is a subfolder containing one or more UTF-8 **`.sld`** files and an optional **`images/`** subfolder.
- All `.sld` files in a deck directory are **sorted alphabetically** and concatenated into a single continuous presentation.
- Use a numbered prefix convention (e.g. `01-intro.sld`, `02-main.sld`) to control ordering.
- Typical structure:

```
decks/
  my-talk/
    01-intro.sld
    02-main.sld
    03-closing.sld
    images/
      logo.png
      photo.jpg
```

- Run by deck name: `./keycode present my-talk` (resolves to `decks/my-talk/`).
- Run by explicit path: `./keycode present decks/my-talk`.

---

## Slide Separator

Slides are separated by a line containing exactly `---` (three hyphens) with optional trailing whitespace, on its own line.

```md
First slide content

---

Second slide content
```

**Rules:**
- `---` must be on its own line. It cannot appear inline.
- Leading/trailing blank lines around each slide are trimmed automatically.
- Empty slides (slides with no content after trimming) are discarded.

---

## Comments

Two comment styles are supported. Comments are stripped **before** any tag parsing.

### Line comments

Lines where the first non-whitespace characters are `//` are removed entirely.

```md
// This line is invisible in the presentation
Visible content here
// Another invisible comment
```

### Block comments

C-style block comments `/* ... */` are removed, including across multiple lines.

```md
/* This entire block
   is stripped out */
Visible content
```

**Important:** Comments are stripped globally before slide splitting. A comment can span across a `---` separator, but this is not recommended.

---

## Plain Text Content

Any text that is not inside a recognized tag and not a comment is rendered as **plain body text**. Plain text is:

- Vertically and horizontally centered on the terminal screen by default.
- Rendered with the slide's current `size` spacing (`normal` = single newline between lines, `large`/`xlarge` = double newline).
- Subject to the slide's alignment setting (default `center`, or `left` if a QR block is present).

The **first slide** and **last slide** of a deck are flagged as `isAsciiArt` slides, which means their raw spacing is preserved more faithfully — ideal for hand-crafted ASCII art layouts.

---

## Tags Reference

### `<title>`

Renders text inside a centered Unicode box-drawing frame (`┌─┐│└─┘`).

**Syntax:**
```md
<title>
Title Line 1
Title Line 2
</title>
```

**Behavior:**
- Multi-line titles are supported. Each non-empty line becomes a row inside the box.
- The box is auto-sized to fit the widest line plus internal padding.
- Padding and margin scale with the slide's `<size>` setting:
  - `normal`: paddingX=3, paddingY=1, outerMargin=0
  - `large`: paddingX=4, paddingY=1, outerMargin=1
  - `xlarge`: paddingX=6, paddingY=2, outerMargin=1
- `<color>` tags work inside `<title>` — the color markup is rendered but not counted for box width calculations.
- The title block is extracted from the slide body and rendered as a separate section above the remaining body text.
- **A slide with `<title>` always uses `center` alignment**, overriding any explicit `<align>` tag or QR-based default.
- Only **one** `<title>` per slide is recognized (first match wins).

**Visual output example:**
```
┌──────────────────────────────┐
│                              │
│   THE REBIRTH OF             │
│   SOFTWARE CRAFTSMANSHIP     │
│   IN AI ERA                  │
│                              │
└──────────────────────────────┘
```

**Interactions:**
- Combine with `<beautify/>` on the first slide for decorative ornament bands.
- Combine with `<size>` to control the box padding/margin.
- Body text below the title is rendered as a separate section beneath the box.

---

### `<header>`

Renders a per-slide heading pinned to the **top** of the terminal, styled as an ASCII ornament banner.

**Syntax:**
```md
<header color=cyan>Header Text Here</header>
```

**Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `color` | No | `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray` | none (no color) | ANSI foreground color for the header text |

**Behavior:**
- Header text is converted to **UPPERCASE** automatically.
- Rendered with ornamental side decorations: `.=~~~~ TEXT ~~~~=.`
- Multi-line headers are supported (each line gets its own ornament row).
- The header is separated from the main body content by blank lines.
- Only **one** `<header>` per slide is recognized (first match wins).
- The header occupies reserved rows at the top of the terminal; body content is laid out beneath it.

**Attribute format note:** The `color` attribute can be written with or without quotes:
- `color=cyan` ✓
- `color="cyan"` ✓
- `color='cyan'` ✓

**Visual output example:**
```
.=~~~~ THE ARCHITECTURE OF REALITY ~~~~=.
```

**Interactions:**
- Headers work alongside all other tags (`<p>`, `<color>`, `<qr>`, `<image>`, `<screen>`, etc.).
- Headers are rendered during transitions (they persist from the previous slide until the new slide's transition completes).

---

### `<beautify/>`

Adds decorative ASCII ornament bands above and below the slide content.

**Syntax:**
```md
<beautify/>
```

**Behavior:**
- Self-closing tag; no content or attributes.
- Adds star/tent-like decorative patterns rendered in gray above and below the main content.
- Primarily used on the **title slide** (first slide) to fill empty space attractively.
- When slide `size` is `xlarge`, extra decoration rows are added at the top and bottom.
- Only **one** `<beautify/>` per slide is recognized.

**Interactions:**
- Best combined with `<title>` for visually rich opening/closing slides.
- Works with any slide content, but designed for slides with significant empty space.

---

### `<size>`

Controls the visual scale/spacing of the slide.

**Syntax:**
```md
<size>xlarge</size>
```

**Values:**

| Value | Line Spacing | Title Box Metrics | Beautify Extra Rows |
|-------|-------------|-------------------|---------------------|
| `normal` (default) | Single newline | paddingX=3, paddingY=1, margin=0 | No |
| `large` | Double newline | paddingX=4, paddingY=1, margin=1 | No |
| `xlarge` | Double newline | paddingX=6, paddingY=2, margin=1 | Yes |

**Behavior:**
- If omitted, the slide defaults to `normal`.
- Affects body text line spacing: `normal` uses `\n`, `large`/`xlarge` use `\n\n`.
- Affects `<title>` box padding and outer margin.
- Affects `<beautify/>` decoration density.
- Only **one** `<size>` per slide is recognized (first match wins).
- Case-insensitive.

---

### `<align>`

Sets the overall horizontal alignment of the entire slide body.

**Syntax:**
```md
<align>left</align>
```

**Values:** `left`, `center`, `right`

**Behavior:**
- Default alignment is `center`.
- Exception: slides with a `<qr>` block automatically default to `left` alignment (unless explicitly overridden with `<align>`).
- This controls how the **block of body text** is positioned within the terminal viewport.
- Case-insensitive.
- Only **one** `<align>` per slide is recognized (first match wins).

**Note:** This is a slide-level alignment tag, different from the `align` attribute on `<p>` tags which controls text alignment within the paragraph's own width.

---

### `<p>` (Paragraph)

Wraps and aligns text within a constrained width. This is the primary tool for controlling text flow.

**Syntax:**
```md
<p max-width=72 align=left>
Paragraph content here. This text will be soft-wrapped
to fit within the specified max-width.
</p>
```

**Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `max-width` | No | Any positive integer | `80` | Maximum character width for soft-wrapping |
| `align` | No | `left`, `center`, `right` | `center` | Text alignment within the paragraph's max-width |

**Behavior:**
- Text inside `<p>` is soft-wrapped at word boundaries to respect `max-width`.
- Each wrapped line is then aligned (left/center/right) within the `max-width` column space.
- Explicit newlines in the source are preserved as paragraph breaks.
- Multiple consecutive whitespace characters are collapsed to a single space.
- Leading/trailing blank lines inside the `<p>` block are trimmed.
- `<color>` tags inside `<p>` are fully supported — color markup is not counted toward visible width for wrapping calculations.
- Multiple `<p>` blocks per slide are supported; each is processed independently.
- The paragraph tag produces pre-aligned text with ANSI color codes already applied.

**Attribute format note:** Attribute values can be written with or without quotes:
- `max-width=72` ✓
- `max-width="72"` ✓
- `align=left` ✓
- `align="left"` ✓

**Interactions:**
- `<p>` is the recommended way to control text layout inside `<header>`, `<ai-step>`, and `<ai-final>` content.
- The `align` attribute on `<p>` controls internal text alignment, while the slide-level `<align>` tag controls where the entire paragraph block sits on screen.
- Nesting `<p>` inside `<p>` is **not** supported.

---

### `<color>`

Applies ANSI foreground color to inline text.

**Syntax:**
```md
<color fg="yellow">highlighted text</color>
```

**Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `fg` | Yes | `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray` | — | Foreground color name |

**ANSI mappings:**

| Color | ANSI Code |
|-------|-----------|
| `red` | `\x1b[31m` |
| `green` | `\x1b[32m` |
| `yellow` | `\x1b[33m` |
| `blue` | `\x1b[34m` |
| `magenta` | `\x1b[35m` |
| `cyan` | `\x1b[36m` |
| `white` | `\x1b[37m` |
| `gray` | `\x1b[90m` |

**Behavior:**
- Inline tag — can appear anywhere text is rendered.
- Nesting `<color>` inside `<color>` is supported. The inner color takes effect, and the outer color resumes after `</color>`.
- Color tags are **not counted** toward visible character width (important for wrapping and alignment calculations).
- The `fg` attribute **requires** quotes (`"` or `'`): `fg="yellow"` or `fg='yellow'`.

**Where it works:**
- Plain body text ✓
- Inside `<title>` ✓
- Inside `<p>` ✓
- Inside `<ai-step>` ✓
- Inside `<ai-final>` ✓
- Inside `<footnote>` ✓
- Inside `<header>` text content: colors are applied but the header also applies its own `color` attribute, so mixing is possible but the header `color` wraps the entire text.

---

### `<footnote>`

Pins a gray-colored note to the **bottom** of the slide.

**Syntax:**
```md
<footnote>
Source: Example report, 2026
Additional reference info
</footnote>
```

**Behavior:**
- Content is rendered in gray (`\x1b[90m`) automatically.
- Multi-line footnotes are supported.
- Leading/trailing whitespace is trimmed.
- The footnote occupies reserved rows at the bottom of the terminal viewport.
- `<color>` tags inside footnotes are supported (they override the gray for their span).
- Only **one** `<footnote>` per slide is recognized (first match wins).

**Interactions:**
- Footnotes are rendered below the main body, above any bottom overlay (slide number).
- Footnotes are preserved during slide transitions.

---

### `<slide-number/>`

Enables persistent slide number display from the current slide onward.

**Syntax:**
```md
<slide-number v-align="top" h-align="left"/>
```

**Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `v-align` | No | `top`, `bottom` | `bottom` | Vertical position |
| `h-align` | No | `left`, `center`, `right` | `right` | Horizontal position |

**Behavior:**
- Self-closing tag.
- Once placed on a slide, **all subsequent slides** (including the current one) display the 1-based slide number at the specified position.
- The slide number is rendered as an overlay line — it doesn't consume body content space but occupies one reserved row.
- Displays as a plain number (e.g., `2`, `15`).
- The directive is **cumulative**: if a later slide has its own `<slide-number/>`, it overrides the position for that slide onward.
- Only **one** `<slide-number/>` per slide is recognized.

**Attribute format note:** Quotes are optional: `v-align=top` and `v-align="top"` both work.

---

### `<qr>`

Displays a QR code as a native macOS overlay window above the terminal.

**Syntax:**
```md
<qr colors=white-on-transparent width=15%>https://example.com</qr>
```

**Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `width` | No | `10%` to `90%` | `30%` | Overlay width as percentage of Terminal window width |
| `colors` | No | `black-on-white`, `white-on-black`, `white-on-transparent` | `black-on-white` | QR code color scheme |

**Behavior:**
- The content between `<qr>` and `</qr>` is the URL/text to encode.
- On macOS, the QR is displayed in a lightweight native overlay window positioned near the bottom-right of the Terminal window. The overlay stays visible without taking focus away from Terminal.
- The QR PNG is cached in the deck's `images/` folder with a deterministic filename.
- Existing cached PNGs are reused automatically.
- The terminal slide itself remains text-only.
- **Slides with QR blocks default to `left` alignment** (unless explicitly overridden).
- **QR slides skip the scramble transition** so the text remains readable next to the QR.
- Only **one** `<qr>` per slide is used (first match wins; additional `<qr>` tags are stripped).
- The overlay closes automatically when navigating away from the slide.

**Interactions:**
- QR slides commonly use `<p align=left>` to keep text on the left side.
- Can coexist with `<header>`, `<footnote>`, `<color>`, `<title>`, etc.
- Cannot coexist with `<image>` on the same slide (only one media overlay is shown at a time).

---

### `<image>`

Displays an external image as a native macOS overlay window.

**Syntax:**
```md
<image path="photo.jpg" width=30% bg-color="#111111"/>
```

**Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `path` | Yes | Filename or absolute path | — | Image file path (relative to `images/` folder, or absolute) |
| `width` | No | `10%` to `90%` | `30%` | Overlay width as percentage of Terminal window width |
| `bg-color` | No | Any CSS color string (e.g., `#111111`, `black`, `white`) | none | Background color for the overlay panel |

**Behavior:**
- Self-closing tag (use `<image .../>` or `<image ...>`).
- The image opens in the native macOS overlay window.
- Image height is calculated automatically from the aspect ratio.
- Relative paths are resolved from the deck's `images/` subfolder.
- An anchor token is inserted into the body text at the image tag's position; the layout engine uses this to position text around the image.
- The overlay closes automatically when navigating away from the slide.
- If the image file is not found, an error message `[image not found: filename]` is displayed in the slide body.
- Only **one** `<image>` per slide is recognized (first match wins).
- **Important:** The `<image>` tag must **not** be confused with `<image-url>` — the latter is silently stripped and ignored.

**Interactions:**
- When combined with two `<screen>` tags, the image is shown in the first (left) screen pane and horizontally centered there.
- Without `<screen>` tags, the image is positioned inline with an anchor-based layout.
- Cannot coexist with `<qr>` on the same slide.

---

### `<screen>`

Defines split-pane layout by dividing the terminal into two side-by-side panes.

**Syntax:**
```md
<screen content-align=right width=40%></screen>
<screen content-align=left width=60%></screen>
```

**Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `content-align` | No | `left`, `center`, `right` | `center` | Horizontal alignment of content within the pane |
| `width` | No | `10%` to `90%` | `50%` | Pane width as percentage of terminal width |

**Behavior:**
- **Exactly two** `<screen>` tags are required for split layout to activate. If fewer or more are present, only the first two are used.
- The **first** `<screen>` defines the **left pane** (media/ASCII art pane).
- The **second** `<screen>` defines the **right pane** (text content pane).
- `<screen>` tags are self-closing with empty content: `<screen ...></screen>`.
- The two pane widths do not need to add up to 100% — each is calculated independently as a percentage of terminal width.

**Interactions:**
- **With `<ascii-art>`:** The ASCII art is placed in the left pane; body text goes in the right pane.
- **With `<image>`:** The image overlay is positioned in the left pane area; text goes in the right pane.
- **Without media content:** The left pane is empty and the right pane holds the body text.
- Screen layout works with `<header>` and `<footnote>` — headers span the full width above both panes, footnotes below.

---

### `<ascii-art>`

Embeds pre-formatted ASCII art that preserves exact spacing and line structure.

**Syntax:**
```md
<ascii-art>
 /\_/\\
( o.o )
 > ^ <
</ascii-art>
```

**Behavior:**
- Content inside `<ascii-art>` is preserved verbatim (no wrapping, no alignment adjustment).
- Leading single `\n` and trailing single `\n` are stripped from the content.
- Only **one** `<ascii-art>` per slide is recognized (first match wins).

**Interactions:**
- **Without `<screen>` tags:** ASCII art and body text are stacked vertically (ASCII art on top, text below), both centered on screen.
- **With two `<screen>` tags:** ASCII art goes in the left pane; body text goes in the right pane — side-by-side layout.
- `<color>` tags inside `<ascii-art>` are **not** processed (content is treated as raw text by the extractor). If you need colored ASCII art, put it in the body text directly instead.

---

### `[QUESTION]` Token

Turns a slide into an interactive question slide that pauses for audience input.

**Syntax:**
```md
[QUESTION] What do you think about AI?

<p max-width=72 align=left>
Some context for the question.
</p>
```

**Behavior:**
- `[QUESTION]` can appear anywhere in the slide content; the token itself is stripped from the displayed output.
- The slide pauses and displays a text input prompt with a blinking cursor.
- The user types an answer and presses `Enter` to submit.
- **Without `<ai-sim>`:** After submission, the answer is shown as `Answer: <typed text>`.
- **With `<ai-sim>`:** After submission, the answer is shown as `> <typed text>`, followed by the AI simulation sequence.
- **While input is active or AI simulation is running, slide navigation is locked** — the user cannot advance or go back.
- Pressing `:` during question input opens jump mode instead of typing a colon.
- Navigating away from a question slide with an AI simulation **resets** the answer and simulation state for that slide.

---

### `<ai-sim>`

Creates an animated AI response simulation that plays after a `[QUESTION]` answer is submitted.

**Syntax:**
```md
<ai-sim interval-min=3000 interval-max=5000>
  <ai-step delay-ms=1200><color fg="green">[OK]</color> Step 1 text...</ai-step>
  <ai-step><color fg="green">[OK]</color> Step 2 text...</ai-step>
  <ai-step delay-ms=4200><color fg="red">[!]</color> Step 3 text...</ai-step>
  <ai-final>
    <p max-width=72 align=left>
    <color fg="red">FINAL RESULT</color>
    Summary text here.
    </p>
  </ai-final>
</ai-sim>
```

**`<ai-sim>` Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `interval-min` | No | Milliseconds (integer, min 50) | `3000` | Minimum delay between steps |
| `interval-max` | No | Milliseconds (integer, min 50) | `5000` | Maximum delay between steps |

**`<ai-step>` Attributes:**

| Attribute | Required | Values | Default | Description |
|-----------|----------|--------|---------|-------------|
| `delay-ms` | No | Milliseconds (integer, min 50) | Random between interval-min and interval-max | Override delay before this specific step appears |

**`<ai-final>`:** No attributes. Content appears immediately after the last `<ai-step>` completes.

**Behavior:**
- After the user submits an answer, steps appear one at a time with randomized delays between `interval-min` and `interval-max` milliseconds.
- Each step's `delay-ms` overrides the random interval for that specific step.
- A spinning indicator (`⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏`) is shown while steps are streaming.
- `<ai-final>` content appears immediately once all steps have been emitted.
- Pressing `Esc` during the simulation **fast-forwards** to the fully revealed result (all steps + final).
- `<color>` and `<p>` tags work inside both `<ai-step>` and `<ai-final>`.
- **Slides with `<ai-sim>` skip the scramble transition** entirely.
- Empty `<ai-step>` tags (no content after trimming) are ignored.
- `interval-max` is clamped to be at least `interval-min`.
- Only **one** `<ai-sim>` per slide is recognized (first match wins).

---

### Reveal Lines (`=>` and `==>`)

Lines prefixed with `=>` are progressively revealed one at a time as the user presses next. Lines prefixed with `==>` are revealed together as a group.

**Syntax:**
```md
Regular visible text

=> First revealed line (step 1)
==> These three lines (step 2)
==> are all revealed
==> together as one step
=> Last revealed line (step 3)
```

**Behavior:**
- **`=>`** — Lines starting with `=>` (with optional leading whitespace) are hidden initially. Each is revealed as a **single step**.
- **`==>`** — Lines starting with `==>` are hidden initially. **Consecutive** `==>` lines form a group and are all revealed together as a **single step**.
- Each press of `Right`/`Down` reveals the next step (one `=>` line, or an entire `==>` group).
- Each press of `Left`/`Up` hides the last revealed step.
- Once all steps are revealed, the next `Right`/`Down` press advances to the next slide.
- When going back to a slide, all reveal lines on the previous slide are automatically fully revealed.
- **Dimming behavior:** When at least one step has been revealed, all **non-reveal** body lines (regular text) are dimmed to gray. Structural tag lines (e.g., `<p>`, `</p>`) are not dimmed. Previously revealed steps are also dimmed gray, while the **most recently revealed** step is shown at full brightness.
- The `=>` / `==>` prefix is stripped from the displayed output; only the content after the prefix is shown.
- Leading whitespace before `=>` / `==>` is preserved as indentation in the output.
- A `==>` group ends when a non-`==>` line is encountered (including `=>` lines, blank lines, or regular text).

---

## Tag Interactions & Composition Rules

### Parsing Order

Tags are extracted from each slide in a specific pipeline order. Each extractor removes its tag from the body before the next one runs:

1. `<ai-sim>` (and its children `<ai-step>`, `<ai-final>`)
2. `<align>`
3. `<size>`
4. `<beautify/>`
5. `<screen>`
6. `<qr>`
7. `<image>`
8. `<ascii-art>`
9. `<footnote>`
10. `<header>`
11. `<slide-number/>`
12. `<title>`

After all tag extraction, remaining text becomes the slide **body**.

### Common Tag Combinations

| Combination | Behavior |
|---|---|
| `<title>` + `<beautify/>` | Decorative title slide with ornament bands |
| `<title>` + `<size>xlarge` | Larger title box with more padding |
| `<header>` + `<p>` | Header banner at top, wrapped paragraph below |
| `<header>` + `<qr>` | Header at top, text left-aligned, QR overlay bottom-right |
| `<header>` + `<footnote>` | Header at top, footnote pinned at bottom, body in middle |
| `<screen>` × 2 + `<ascii-art>` | Split layout: ASCII art left, text right |
| `<screen>` × 2 + `<image>` | Split layout: image overlay left, text right |
| `[QUESTION]` + `<ai-sim>` | Interactive question with animated AI response |
| `[QUESTION]` without `<ai-sim>` | Simple question with `Answer:` display |
| `<p>` + `<color>` | Colored text within a wrapped, aligned paragraph |
| `<qr>` + `<p align=left>` | QR overlay with left-aligned paragraph text |

### Mutually Exclusive / Conflicting Tags

| Tags | Conflict |
|---|---|
| `<qr>` + `<image>` | Only one media overlay per slide. Both are parsed, but only one overlay is displayed (image takes priority in overlay rendering). |
| Multiple `<title>` | Only first is used |
| Multiple `<header>` | Only first is used |
| Multiple `<ai-sim>` | Only first is used |
| Multiple `<footnote>` | Only first is used |
| Multiple `<ascii-art>` | Only first is used |
| `<screen>` × 1 | Ignored; exactly 2 are required for split layout |
| `<screen>` × 3+ | Only first 2 are used |

### Tag Placement Within Slide

Tags can generally appear anywhere in the slide block (before or after body text). The parser extracts them regardless of position. However, for readability:

- Place `<beautify/>`, `<size>`, `<align>`, `<slide-number/>` at the **top** of the slide.
- Place `<header>` near the **top**, before body content.
- Place `<screen>` tags near the **top**, before content.
- Place `<footnote>` and `<qr>` near the **bottom** of the slide.
- Place `<ai-sim>` at the **bottom** of the slide, after `[QUESTION]` context.

---

## Layout Behavior

### Vertical Centering

All slide content is **vertically centered** in the terminal viewport by default. Reserved regions are subtracted first:
- Header rows (if present) + 2 blank separator rows
- Footer/footnote rows (if present) + 1 blank separator row
- Top overlay row (slide number at top, if active)
- Bottom overlay row (slide number at bottom, if active)
- Hint line row (jump mode prompt, if active)

The remaining usable rows are used to vertically center the body content.

### Horizontal Centering

- Default horizontal alignment is `center` (the text block is centered on the terminal width).
- If a `<qr>` block is present, the default shifts to `left`.
- The `<align>` tag or per-paragraph `align` attribute can override this.
- When content has pre-aligned padding (e.g., from `<p>` output), the layout engine detects this and preserves internal alignment while centering the block as a whole.

### Split-Pane Layout (Two Screens)

When two `<screen>` tags are present:
- The terminal is divided into left and right panes.
- Each pane has 2 characters of inner padding on each side.
- Content within each pane is vertically centered independently.
- `content-align` controls horizontal alignment within each pane.

### Scramble Transition

When navigating to a new slide, a brief "scramble" animation plays where characters are progressively revealed from random glyphs to their final form.

- **Default:** 10 transition steps at 34ms each (~340ms total).
- **Compact terminals** (< 60 columns or < 16 rows): 4 steps.
- **Skipped for:** slides with `<ai-sim>` (question/simulation slides) and QR slides.
- Whitespace and newlines are never scrambled.
- ANSI color codes pass through unchanged during transition.

### Content Cropping

If content exceeds the terminal dimensions:
- Lines wider than the terminal width are cropped (ANSI codes are preserved).
- Lines exceeding the terminal height are clipped (bottom lines are lost).

---

## Navigation & Controls

| Key | Action |
|-----|--------|
| `Right` / `Down` | Next slide (or reveal next `=>` line) |
| `Left` / `Up` | Previous slide (or hide last revealed `=>` line) |
| `:` | Open slide jump mode |
| `0-9` (in jump mode) | Type slide number |
| `Enter` (in jump mode) | Jump to typed slide number (1-based) |
| `Esc` (in jump mode) | Cancel jump mode |
| `Esc` (during AI sim) | Fast-forward AI simulation to completion |
| `q` | Quit presentation |
| `Ctrl+C` | Quit presentation |

**Jump mode:** Type `:` followed by a slide number and `Enter`. The prompt appears at the bottom of the screen with a blinking cursor. Invalid numbers are silently ignored.

**Blinking cursor:** A block cursor (`█`) blinks at the end of the last non-empty line of the current slide when idle (not transitioning, not in AI simulation, not in jump mode).

---

## Live Reload

The presentation watches the `.sld` file and the `images/` folder for changes:
- When the file is modified, the deck is re-parsed and re-rendered automatically (120ms debounce).
- The current slide index is preserved (clamped to the new slide count if needed).
- Image/media overlays are refreshed on reload.
- If the reload fails (e.g., syntax error), a status message is shown at the bottom.

---

## Conventions & Best Practices

1. **One `<header>` per content slide** — Use `<header color=cyan>` consistently for a unified look.
2. **Use `<p>` for all multi-sentence text** — Always wrap prose in `<p max-width=72 align=...>` to ensure clean line wrapping.
3. **Keep `max-width` between 60–80** — This ensures readability on most terminal sizes.
4. **Use `<color fg="yellow">` for emphasis** — Yellow stands out best on dark terminal backgrounds. Use `<color fg="gray">` for de-emphasized text (attributions, sources).
5. **Title slide pattern:** `<beautify/>` + `<title>` + author name + gray subtitle.
6. **Closing slide pattern:** `<title>` + thank you text + optional `<qr>`.
7. **Place `<slide-number/>` on the second content slide** — The first slide is usually a title that doesn't need numbering.
8. **Keep comments for speaker notes** — Use `//` lines for personal notes; they're stripped from rendering.
9. **Test on your target terminal size** — Layout is responsive but content density should match your presentation terminal.
10. **Attribute quoting:** `<color>` requires quotes on `fg` (`fg="yellow"`). Most other tags accept both quoted and unquoted values (`align=left` or `align="left"`).

---

## Complete Slide Examples

### Title Slide

```md
<beautify/>
<title>
THE REBIRTH OF
<color fg="yellow">SOFTWARE CRAFTSMANSHIP</color>
IN AI ERA
</title>
Lemi Orhan Ergin
<color fg="gray">Co-Founder @ Craftgate</color>
```

### Slide Number Activation

```md
<slide-number v-align="top" h-align="left"/>

// This slide and all subsequent slides will show the slide number
// in the top-left corner.
```

### Standard Content Slide

```md
<header color=cyan>The Architecture of Reality</header>

<p max-width=72 align=left>
Software engineering isn't about code.
It's about <color fg="yellow">solving problems.</color>

Interesting problems don't have trivial solutions.
</p>
```

### QR Code Slide

```md
<header color=cyan>The Great Asset Flip</header>

<p max-width=72 align=left>
"The code that we have is a <color fg="red">liability</color>, and
the <color fg="yellow">system is the asset</color> that we're building."

<color fg="gray">— Chad Fowler</color>
</p>

<qr colors=white-on-transparent width=15%>https://www.youtube.com/watch?v=n3uEWZ1KT64</qr>
```

### Interactive AI Simulation Slide

```md
<p max-width=72 align=left>
[QUESTION] Compared to humans, how good is the <color fg="cyan">quality</color> of AI-generated code?</p>

<ai-sim interval-min=3000 interval-max=5000>
  <ai-step delay-ms=1200><color fg="green">[OK]</color> Connecting to global engineering telemetry...</ai-step>
  <ai-step><color fg="green">[OK]</color> Sampling 153 million lines of code...</ai-step>
  <ai-step><color fg="green">[OK]</color> Filtering noise from 40+ organizations...</ai-step>
  <ai-step delay-ms=4200><color fg="red">[!]</color> Anomaly detected: High discrepancy between speed and quality.</ai-step>
  <ai-final>
    <p max-width=72 align=left>
    <color fg="red">CRITICAL WARNING: SLOPPY DEBT DETECTED.</color>

Mistakes requiring correction or revert (Code Churn) have <color fg="yellow">DOUBLED (2x)</color> compared to human-written code.

<color fg="gray">Source: 153M lines of code analysis</color>
    </p>
  </ai-final>
</ai-sim>
```

### Split-Pane with ASCII Art

```md
<screen content-align=right width=40%></screen>
<screen content-align=left width=60%></screen>

<ascii-art>
 █████╗ ██╗
██╔══██╗██║
███████║██║
██╔══██║██║
██║  ██║██║
╚═╝  ╚═╝╚═╝
</ascii-art>

<p align=left>
Meet Lemi
* Craftgate
* speakerdeck
* linkedin
</p>
```

### Split-Pane with Image

```md
<screen content-align=center width=40%></screen>
<screen content-align=left width=60%></screen>

<image path="lemi.jpg" width=50% bg-color="#111111"/>

<p align=left>This is Lemi!</p>
```

### Slide with Footnote

```md
<header color=yellow>Important Topic</header>

<p align=left max-width=80>
Main content of the slide goes here.
</p>

<footnote>
Source: https://example.com/report
Updated March 2026
</footnote>
```

### Reveal Lines Slide

```md
<header color=cyan>Key Points</header>

<p max-width=60 align=left>
Here is the context for the audience:

=> First point revealed on next press
==> These two lines appear
==> together on one press
=> Last point revealed on next press
</p>
```

### Closing Slide

```md
<title> root@craftsman:~$ exit </title>

<p align=center>
Thank you!
<color fg="gray">Lemi Orhan Ergin</color>
</p>

<qr colors=white-on-transparent width=20%>https://manifesto.softwarecraftsmanship.org/</qr>
```
