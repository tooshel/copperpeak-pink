# Copper Peak, pink edition

Design previews of the Copper Peak Heating & Cooling site at **https://pink.copperpeakair.com**. One set of pages,
three looks, and a customizer that lets each visitor pick colors, spacing, and text size.

| Path | Look |
|---|---|
| `/` | Picker: choose a look |
| `/kitchen/` | Enamel Kitchen: white cabinets, glossy enamel, "Choose your finish" |
| `/chips/` | Paint Chip Deck: pull a paint chip from the fan to repaint |
| `/thermostat/` | Seven-Segment Thermostat: MODE changes colors, arrows set spacing |

Pink and white is the default everywhere, including the logo and favicon (both recolored from the palette in the
browser; the logo file itself is unchanged). A visitor's choice is saved in their own browser and carries across all
three looks. Reset puts it back to Blush.

This is a preview, not the real site: every page is `noindex`, `robots.txt` disallows everything, and canonical
links point to https://www.copperpeakair.com. The page text comes from the main site (`tooshel/copperpeak`) and was
copied on 2026-10-25; edits there don't flow here automatically.

## Build

```
node tools/build.js
```

Zero dependencies. Writes `docs/`, which GitHub Pages serves (branch `main`, folder `/docs`). The build writes
`docs/CNAME` itself so Pages keeps the custom domain.

- `content/`: page text (same format as the main site)
- `tools/palette.js`: the six preset palettes and `cpDerive()`, which turns any background + main color into a full
  set of readable colors. The build stops if a preset falls under 4.5:1 contrast anywhere, and visitor-mixed colors
  are pushed until they pass too.
- `tools/engine.js`: the in-browser customizer (saving, reset, logo recolor, favicon)
- `tools/base.js`: layout shared by all three looks; `tools/themes/*.js`: each look's styling, hero, and controls
- `tools/picker.js`: the root page and 404
- `static/fonts/`: self-hosted fonts (OFL; see `FONTS-LICENSE.txt` and `DSEG-LICENSE.txt`)

Design notes: `PRODUCT.md`, and the direction for each look in `.impeccable/surfaces/`.
