# Keycode Terminal Based Presentation Tool

Terminal-based presentation app for terminal or console apps.

## Install

```bash
npm install
```

## Run

All decks live under the `decks/` folder. Each deck is a directory containing one or more `.sld` files. Files are sorted alphabetically and presented as a single continuous deck.

```bash
# By deck name
./keycode present my-talk

# By explicit deck directory path
./keycode present decks/my-talk
```

If you want to run `keycode` without `./`, add this repo to your `PATH`, symlink the script into a directory on your `PATH`, or install the package globally.

## Create a Deck

Scaffold a new deck inside `decks/`:

```bash
./keycode init my-talk
```

This creates:

```text
decks/
  my-talk/
    01-slides.sld
    images/
```

The generated `01-slides.sld` includes a starter title slide, sample headers, and basic content you can edit. You can split your deck into multiple `.sld` files (e.g. `01-intro.sld`, `02-main.sld`, `03-closing.sld`) — they are sorted alphabetically and combined automatically.

## Slide Format Reference

See [REFERENCE.md](REFERENCE.md) for the complete slide format documentation, including every supported tag, attribute, behavior, tag interaction, layout rules, keyboard controls, and examples.

## Development

Run directly in dev mode:

```bash
npx tsx src/cli.tsx decks/my-talk
```

Build the app:

```bash
npm run build
```

Run tests:

```bash
npm test
```
