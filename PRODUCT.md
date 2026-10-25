# Product

<!-- impeccable:product-schema 1 -->

> Product truth carried over from the design alternate (copperpeak-design/PRODUCT.md), confirmed against the live
> site's content. This copy is the **pink alternate with a visitor color customizer**, served at
> pink.copperpeakair.com. The owner (Sheldon, with partner Phillip) said it "might just be the main site" if it works.

## Platform

web

## Users

- **Homeowners in Mesa and the Phoenix East Valley** whose AC or heat has a problem, often mid-summer (110°+) when a
  dead AC is urgent. They want to know who to call, roughly what it costs, and whether they can trust the answer.
- **Handy homeowners (DIYers)** who'd rather fix a $30 part themselves: they read the DIY guides and order the exact
  part by texting a photo of the unit's label.
- **Prospective techs**: curious fixers the DIY page invites to apply.
- Everyone above, regardless of gender. The pink default and customizer are for anyone who enjoys making a thing
  their own (owner's analogy: the avatar creator at the start of a game).

## Product Purpose

Marketing site for Copper Peak Heating & Cooling, a family-owned HVAC company. Success is a phone call or text to
(480) 673-8311, an email to service@copperpeakair.com, or a parts request. DIY guides and FYI explainers earn trust
and search traffic.

## Positioning

The honest small shop: up-front prices published on the site, DIY guides plus parts sales, a one-year no-hassle
guarantee, and openly arguing against big-company overhead. This alternate adds a second differentiator: **a site
that lets each visitor choose its look**, something no other HVAC company bothers to do.

## Operating Context

- Mostly phone visitors, often in a hot house, wanting the phone number fast. *(inferred)*
- Hours Monday–Friday 7:00 AM – 5:00 PM; emergencies: "Call. We answer."
- Service area: Mesa, Apache Junction, Buckeye, Chandler, Gilbert, Glendale, Gold Canyon, Peoria, Phoenix,
  Queen Creek, San Tan Valley, Scottsdale, Tempe.

## Capabilities and Constraints

- Static site, zero-dependency generator `tools/build.js` → `docs/`, served by GitHub Pages. No server, no forms
  backend (contact is tel:, sms:, mailto:). Customizer state lives in the visitor's own browser (localStorage).
- Pages: home, heating, cooling, air quality, pricing, DIY & Parts (+7 guides tagged Easy/Moderate/Advanced),
  FYI (+refrigerants explainer), service area, 404.
- Refrigerant work is legally EPA-certified-tech only; guides must keep their safety callouts.
- Alternate for review at pink.copperpeakair.com: noindex, canonical to www.copperpeakair.com.

## Brand Commitments

- Name "Copper Peak Heating & Cooling", tagline "Your comfort. Our commitment."
- **Default palette pinned by the owner: pink and white, everywhere**, including the logo (rendered in pinks and
  whites) and the favicon. Reference: a home where every decoration is pink or white, white cabinets, pink
  accents throughout.
- **Visitor customizer (binding feature):** choose the color palette (e.g. a "goth" black and dark purple), and
  possibly spacing/density and similar. Must keep text readable at any choice, remember the choice per visitor,
  offer one-click reset, and never obstruct calling.
- **Explicitly NOT**: no gauge/manifold motif (that's the design alternate's world); no copy framing the site "for
  women" or telling the pink house story. The feature speaks for itself.
- Logo source `static/images/copper-peak-logo-2026.jpg`: bearded tech with manifold gauges, desert mountains,
  sunset, saguaros. Recolored by palette, not redrawn.
- Voice: plain-spoken, warm, a little funny, anti-upsell.

## Evidence on Hand

- Real: phone, email, address, hours, city list, owner quote, published price ranges, 7 DIY guides, 1 FYI article,
  logo, hiring invitation.
- Absent, do not fabricate: reviews, ratings, license numbers, years beyond "15+", team or job photos.

## Product Principles

1. The phone number is never more than a glance away, in every palette.
2. Say the price out loud; honesty is the differentiator.
3. Respect the DIYer: teach first, sell the part, be there if it gets bigger.
4. Safety warnings are part of the product, never decoration, and stay legible in every palette.
5. Customization is play for everyone, never a gimmick that costs clarity.
