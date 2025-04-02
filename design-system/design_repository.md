# FieldQuote Design Repository

## Brand Identity

### Logo
The FieldQuote logo combines the brand's primary colors:
- "field" in Bright Orange (#F28C38)
- "quote" in Deep Blue (#2C4E80)

Logo files are available in the following formats:
- SVG (vector): `/design_assets/fieldquote-high-resolution-logo-transparent.svg`
- PNG (raster): `/design_assets/fieldquote-high-resolution-logo-transparent.png`

### Logo Usage Guidelines
- Maintain clear space around the logo equal to the height of the "f" in "field"
- Do not distort, rotate, or alter the logo colors
- Minimum size: 100px wide for digital use
- For app icon, use the "f" lettermark version when needed for small spaces

## Brand Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Primary Deep Blue | #2C4E80 | rgb(44, 78, 128) | Main branding, headers, buttons |
| Secondary/Accent Bright Orange | #F28C38 | rgb(242, 140, 56) | Highlights, CTAs (e.g., "Generate Quote" button) |
| Neutral Off-White | #F5F6F5 | rgb(245, 246, 245) | Backgrounds for readability |
| Text Dark Gray | #333333 | rgb(51, 51, 51) | Main text, clean contrast on white |

## Color Variations

### Primary Blue Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Blue - Darkest | #1A3050 | Pressed states, footer |
| Blue - Dark | #2C4E80 | Primary color |
| Blue - Medium | #3E6BA8 | Secondary elements |
| Blue - Light | #7FA3D4 | Highlights, backgrounds |
| Blue - Lightest | #D0E0F5 | Subtle backgrounds, disabled states |

### Secondary Orange Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Orange - Darkest | #C06820 | Pressed states |
| Orange - Dark | #E07830 | Hover states |
| Orange - Medium | #F28C38 | Primary accent color |
| Orange - Light | #F7B475 | Highlights, secondary accents |
| Orange - Lightest | #FCDFC0 | Subtle backgrounds, notifications |

### Neutral Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| White | #FFFFFF | Card backgrounds, content areas |
| Off-White | #F5F6F5 | Main background |
| Light Gray | #E0E0E0 | Borders, dividers |
| Medium Gray | #999999 | Secondary text, icons |
| Dark Gray | #333333 | Primary text |
| Black | #000000 | Emphasis text |

## Typography

### Font Family

- **Primary Font**: San Francisco (iOS) / Roboto (Android)
- **Fallback**: System default sans-serif

### Text Styles

| Style Name | Font Weight | Size | Line Height | Color | Usage |
|------------|-------------|------|------------|-------|-------|
| Heading 1 | Bold | 24px | 32px | #2C4E80 | Screen titles |
| Heading 2 | Bold | 20px | 28px | #2C4E80 | Section headers |
| Heading 3 | Semibold | 18px | 24px | #2C4E80 | Card titles |
| Heading 4 | Semibold | 16px | 22px | #2C4E80 | Sub-section headers |
| Body | Regular | 16px | 22px | #333333 | Primary content text |
| Body Small | Regular | 14px | 20px | #333333 | Secondary content text |
| Caption | Regular | 12px | 16px | #999999 | Supporting information |
| Button Primary | Medium | 16px | 22px | #FFFFFF | Button text on primary background |
| Button Secondary | Medium | 16px | 22px | #2C4E80 | Button text on white background |

## Component Styles

### Buttons

#### Primary Button
- Background: #2C4E80 (Deep Blue)
- Text: #FFFFFF (White)
- Height: 48px
- Border Radius: 8px
- States:
  - Normal: #2C4E80
  - Pressed: #1A3050
  - Disabled: #2C4E80 (50% opacity)

#### Secondary Button
- Background: #FFFFFF (White)
- Border: 1.5px #2C4E80 (Deep Blue)
- Text: #2C4E80 (Deep Blue)
- Height: 48px
- Border Radius: 8px
- States:
  - Normal: Border #2C4E80
  - Pressed: Background #F5F6F5
  - Disabled: Border #2C4E80 (50% opacity)

#### CTA Button
- Background: #F28C38 (Bright Orange)
- Text: #FFFFFF (White)
- Height: 48px
- Border Radius: 8px
- States:
  - Normal: #F28C38
  - Pressed: #C06820
  - Disabled: #F28C38 (50% opacity)

### Cards

#### Standard Card
- Background: #FFFFFF
- Border Radius: 12px
- Shadow: 0px 2px 8px rgba(0, 0, 0, 0.1)
- Padding: 16px

#### Quote Card
- Background: #FFFFFF
- Border Radius: 12px
- Border Left: 4px solid #2C4E80
- Shadow: 0px 2px 8px rgba(0, 0, 0, 0.1)
- Padding: 16px

### Form Elements

#### Text Input
- Background: #FFFFFF
- Border: 1px #E0E0E0
- Text: #333333
- Height: 48px
- Border Radius: 8px
- States:
  - Normal: Border #E0E0E0
  - Focus: Border #2C4E80
  - Error: Border #E74C3C
  - Disabled: Background #F5F6F5

#### Toggle
- Track Height: 24px
- Track Width: 44px
- Thumb Size: 20px
- Off State: Gray track (#E0E0E0), white thumb
- On State: Blue track (#2C4E80), white thumb

## Icons

### Standard Icons
- Size: 24px x 24px
- Color: #2C4E80 (Primary) or #333333 (UI elements)
- Style: Outlined with 2px stroke

### Action Icons
- Size: 24px x 24px
- Color: #F28C38 (Accent)
- Style: Filled

## Layout Guidelines

### Spacing System
- XS: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- XL: 32px
- XXL: 48px

### Screen Margins
- Horizontal: 16px
- Vertical: 16px

### Content Width
- Maximum: 600px (centered on larger screens)

## Design Principles

1. **Clarity**: Information hierarchy is clear and content is easily scannable
2. **Efficiency**: Minimize steps to complete tasks, optimize for speed
3. **Consistency**: Use the same patterns throughout the app
4. **Feedback**: Always provide clear feedback for user actions
5. **Accessibility**: Ensure text is readable and touch targets are adequately sized

## Usage Guidelines

### Primary Blue (#2C4E80)
- Use for main navigation elements
- Primary buttons
- Headers and important UI elements
- App bar background

### Accent Orange (#F28C38)
- Use sparingly for emphasis
- Call-to-action buttons
- Highlighting important information
- Progress indicators

### Background Colors
- Main app background: Off-White (#F5F6F5)
- Cards and content areas: White (#FFFFFF)
- Avoid using pure white (#FFFFFF) for large background areas

### Text Colors
- Primary text: Dark Gray (#333333)
- Secondary text: Medium Gray (#999999)
- Button text on dark backgrounds: White (#FFFFFF)
- Avoid using pure black for text

## Implementation Notes

- Use the design system consistently across all screens
- Maintain adequate contrast ratios for accessibility (WCAG AA standard)
- Ensure touch targets are at least 44x44 points
- Support dynamic text sizes for accessibility
- Test designs in both light and dark environments
