---
name: Modern Team Social
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#b90538'
  on-secondary: '#ffffff'
  secondary-container: '#dc2c4f'
  on-secondary-container: '#fffbff'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#ffb2b7'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#92002a'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an internal office team platform that feels energetic, welcoming, and deeply human without sacrificing enterprise-grade polish. It strikes an intentional equilibrium between focused corporate collaboration and spontaneous social warmth.

### Target Audience & Emotional Impact
Designed for hybrid and in-office teams, the interface fosters psychological safety, mutual celebration, and effortless peer visibility. Every view should evoke:
- **Camaraderie:** A sense of working alongside real people, whether across desks or continents.
- **Vibrant Clarity:** Instant legibility of team context without clinical monotony or aggressive clutter.
- **Delight:** Micro-celebrations through kudos and generative persona expressions that elevate everyday team rituals.

### Visual Style
The aesthetic sits at the intersection of **Contemporary Soft Tech** and **Tactile Minimalism**. It leverages generous whitespace, structured card-based containers, soft geometric silhouettes, and luminous micro-accents. Surface hierarchies rely on tonal slate stepping and hair-thin structural borders rather than heavy dropshadows, ensuring dynamic color sparks—such as kudos coral and presence emerald—remain punchy and meaningful.

## Colors

The palette balances a grounding indigo core with lively accents reserved for social recognition and physical presence.

### Palette Architecture
- **Primary (`#4F46E5` / Warm Indigo):** Anchors primary actions, active navigational states, and corporate identity. Use Electric Iris (`#6366F1`) for hover and pressed elevations.
- **Secondary (`#F43F5E` / Electric Coral):** Reserved strictly for high-emotion touchpoints: peer recognition, kudos awards, milestone triggers, and creative AI persona tags. Sunset Peach accents can soften secondary badges.
- **Tertiary (`#10B981` / Fresh Emerald):** Serves as the real-time presence beacon (in-office status, desk booking confirmation, active focus availability).
- **Neutral (`#0F172A` / Crisp Slate):** Powers high-contrast typography, structural headings, and foundational layouts.
- **Surfaces & Borders:** Foundation surfaces utilize `#FFFFFF`, stepping into `#F8FAFC` for page backgrounds and `#F1F5F9` for secondary card fills. Structural separation relies on `#E2E8F0` at 1px thickness.
- **Secondary Text:** Slate `#64748B` maintains WCAG AAA accessibility on white and sub-surface containers for metadata, timestamps, and secondary captions.

## Typography

The design system standardizes on **Plus Jakarta Sans** across all roles to project an authentic, warm, and highly structured modern personality.

### Typographic Hierarchy Rules
- **Display & Headlines:** Set tight tracking (`-0.03em` to `-0.01em`) on larger scale steps to maintain dense, confident headings for office feeds, team dashboards, and profile banners.
- **Body & Editorial:** Normal letter spacing paired with relaxed line heights (`lineHeight: 22px` on `14px` body text) guarantees fatigue-free reading during dense team discussions and recognition feeds.
- **Labels, Badges & Indicators:** Uppercase treatments must only be used on `label-sm` with letter spacing widened to `+0.04em` for status tags (e.g., "AT DESK", "IN MEETING").
- **Font Pairing Restraint:** A single, versatile geometric family ensures consistent stroke weight across dynamic UI states, preventing visual conflict when interacting with media feeds and custom avatars.

## Layout & Spacing

A strictly proportional 4px/8px incremental rhythm underpins spatial harmony across all viewports.

### Grid & Canvas Structure
- **Mobile (< 768px):** 4-column fluid layout with `1rem` margins and `1rem` gutters. Primary interaction points gravitate to the lower thumb zone, with bottom navigation taking layout precedence.
- **Tablet (768px – 1024px):** 8-column layout with `2rem` margins and `1.25rem` gutters. Feeds and map modules break into balanced dual panes.
- **Desktop (> 1024px):** 12-column layout capped at a maximum width of `1280px` centered, utilizing `3rem` margins and `1.5rem` gutters. Standardized three-column architecture: Navigation / Team Activity Stream / Office Map & Context Panel.

### Spacing Guidelines
- Use `space-xs` (4px) and `space-sm` (8px) strictly for internal badge padding, icon-to-label gaps, and tight status stacks.
- Use `space-md` (16px) for standard component padding within cards, lists, and input shells.
- Use `space-lg` (24px) to separate card groupings and segment distinct conversational blocks.
- Use `space-xl` (32px) for page section headers and macro container separation.

## Elevation & Depth

Rather than relying on deep, theatrical drop shadows, this design system achieves spatial order through **Tonal Layering**, **Frosted Surfaces**, and **Crisp Structural Outlines**.

### Elevation Stack
1. **Canvas (Base Level):** Solid `#F8FAFC`. Provides a soft, warm canvas that mitigates screen glare in bright workplace lighting.
2. **Surface Level 1 (Resting Cards & Feeds):** `#FFFFFF` background bound by a 1px border of `#E2E8F0`. Elevation is subtly defined with an ambient, diffused tint: `0px 1px 3px rgba(15, 23, 42, 0.04), 0px 4px 12px rgba(15, 23, 42, 0.03)`.
3. **Surface Level 2 (Floating Modals & Interactive Overlays):** `#FFFFFF` paired with an ambient shadow: `0px 8px 24px rgba(15, 23, 42, 0.06), 0px 2px 6px rgba(15, 23, 42, 0.03)`.
4. **Frosted Chrome (Bottom Bar & Sticky Headers):** `rgba(255, 255, 255, 0.85)` surface combined with `backdrop-filter: blur(12px)` and a bottom or top border of `rgba(226, 232, 240, 0.8)`. Content flows gently beneath without loss of reading orientation.
5. **Interactive Glows (Hover & Focus States):** Never cast heavy dark dropshadows under buttons. Interactive items use a 3px outer glow tinted with the respective brand token at 15% opacity (e.g., `#4F46E5` for navigation buttons, `#F43F5E` for kudos reactions).

## Shapes

The design system implements a **Rounded (Level 2)** shape standard, establishing organic, human contours that feel approachable while maintaining structural discipline across data-dense layouts.

### Radius Conventions
- **Standard Surfaces & Cards (`rounded-lg` / 1rem / 16px):** Used across feed modules, persona cards, interactive maps, and popovers.
- **Micro UI & Form Controls (`rounded` / 0.5rem / 8px):** Applied to input fields, regular buttons, segmented indicators, and dropdown menus.
- **Pills & Full Rounds (`rounded-full`):** Reserved for interactive kudos tags, category filters, notification badges, presence dots, and bottom navigation pill selectors.
- **Avatars:** Rendered as full circles (`rounded-full`) to integrate seamlessly with surrounding presence status rings.

## Components

### Buttons
- **Primary:** Solid `#4F46E5` fill, `#FFFFFF` text, `rounded` (8px). Height: 44px (touch friendly). State changes: Hover to `#6366F1`, active scale down to `0.98`. Focus ring: 2px offset with `#4F46E5` glow.
- **Secondary:** Surface `#F1F5F9`, text `#0F172A`, 1px border `#E2E8F0`. Hover shifts surface to `#E2E8F0`.
- **Kudos Action:** High-vitality button. Linear gradient (`#F43F5E` to `#FB7185`), `#FFFFFF` text, `rounded-full` shape. Micro-bounce transition upon reaction click.

### Avatar Badges & Presence Rings
- Circular avatar frames with an outer 2px white gap ring framing a dynamic 2.5px status indicator:
  - **In-Office / At Desk:** `#10B981` (Fresh Emerald) solid ring.
  - **Remote / Online:** `#6366F1` (Electric Iris) ring.
  - **Focus Mode:** Amber-orange `#F59E0B` dashed or solid ring.
  - Presence status dot (8px) pins to the bottom-right corner of the avatar frame with a 2px `#FFFFFF` outline.

### Kudos Chips
- Capsule-shaped pills (`rounded-full`) featuring a soft background tint of `rgba(244, 63, 94, 0.08)` and a crisp border of `rgba(244, 63, 94, 0.2)`.
- Label typography: `label-md` in `#F43F5E`, paired with emoji micro-icons and counter tallies. Hover shifts background opacity to `0.14`.

### AI Photo Persona Showcase Cards
- Aspect ratio: `4:5` vertical portrait orientation. Border-radius: `1rem` (16px).
- Edge-to-edge AI photo portrait topped with a subtle dark gradient ramp (`rgba(15, 23, 42, 0)` to `rgba(15, 23, 42, 0.75)`) at the base.
- Overlay elements include team member real name (`title-md`), generated persona title (`label-md` in soft gold `#FDE68A` or violet `#DDD6FE`), and desk/zone location.

### Interactive Map Pins & Desk Cards
- Map pins: Teardrop/pill fusion in `#0F172A` with nested miniature avatars. Active selected state switches pin background to `#4F46E5` with an animated pulse ring.
- Popover Desk Cards: Minimal surface container floating above pin, displaying occupant avatar, current schedule window, and direct "Say Hi" or "Send Kudos" actions.

### Toggle Pills & Segmented Controls
- Container: Surface `#F1F5F9` with 4px inner padding, `rounded-full`.
- Active segment: Crisp `#FFFFFF` card pill with subtle ambient shadow (`0px 1px 3px rgba(15, 23, 42, 0.08)`), text `#0F172A`, `label-md` weight.
- Inactive segment: Transparent background, text `#64748B`, smooth transition on tab change.

### Input Fields
- Height: 44px. Background: `#FFFFFF`. Border: 1px `#E2E8F0`, `rounded` (8px).
- Placeholder text in `#94A3B8`. Focus state introduces a 1px border in `#4F46E5` accompanied by an ambient 3px primary glow ring (`rgba(79, 70, 229, 0.15)`).

### Bottom Navigation Bar (Mobile / Tablet Compact)
- Fixed at the bottom margin with safe-area inset accommodation.
- Background: Translucent frosted white `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(16px)` and top border `1px solid #E2E8F0`.
- Navigation items highlight with an active pill background in `#EEF2FF`, driving icon and label color to `#4F46E5`. Inactive states rest at `#64748B`.