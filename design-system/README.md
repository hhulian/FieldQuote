# FieldQuote Design System

This repository contains the design system for the FieldQuote application, including color palettes, typography, component styles, and logo assets.

## Color Palette

### Primary Colors
- **Deep Blue** (#2C4E80) - Main branding, headers, buttons
- **Bright Orange** (#F28C38) - Highlights, CTAs (e.g., "Generate Quote" button)
- **Off-White** (#F5F6F5) - Backgrounds for readability
- **Dark Gray** (#333333) - Text color for clean contrast and professional appearance

### Color Usage
The Deep Blue grounds the app in trust and simplicity, while a splash of Orange adds energy and draws the eye to key actions—perfect for busy tradespeople who need to move fast. Off-White keeps the UI clean (crucial for small phone screens), and Dark Gray text ensures legibility in varied lighting (think outdoors on a job site).

## Typography

### Font Family
- **Primary Font**: System font (San Francisco on iOS, Roboto on Android)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif

### Font Sizes
- **Heading 1**: 24px, Bold (600)
- **Heading 2**: 20px, Bold (600)
- **Heading 3**: 18px, Bold (600)
- **Subtitle**: 16px, Medium (500)
- **Body**: 14px, Regular (400)
- **Caption**: 12px, Regular (400)
- **Button**: 16px, Medium (500)

## Components

### Buttons

#### Primary Button
- Background: Deep Blue (#2C4E80)
- Text: White (#FFFFFF)
- Border Radius: 8px
- Padding: 12px 24px
- Font: 16px, Medium (500)

#### Secondary Button
- Background: White (#FFFFFF)
- Text: Deep Blue (#2C4E80)
- Border: 1px solid Deep Blue (#2C4E80)
- Border Radius: 8px
- Padding: 12px 24px
- Font: 16px, Medium (500)

#### CTA Button
- Background: Bright Orange (#F28C38)
- Text: White (#FFFFFF)
- Border Radius: 8px
- Padding: 12px 24px
- Font: 16px, Medium (500)

### Cards

#### Standard Card
- Background: White (#FFFFFF)
- Border Radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.05)
- Padding: 16px

#### Quote Card
- Background: White (#FFFFFF)
- Border Radius: 12px
- Border Left: 4px solid Deep Blue (#2C4E80)
- Shadow: 0 2px 8px rgba(0,0,0,0.05)
- Padding: 16px

### Form Elements

#### Text Input
- Background: White (#FFFFFF)
- Border: 1px solid #E0E0E0
- Border Radius: 8px
- Padding: 12px
- Font: 16px, Regular (400)
- Text Color: Dark Gray (#333333)
- Placeholder Color: #999999

#### Dropdown
- Background: White (#FFFFFF)
- Border: 1px solid #E0E0E0
- Border Radius: 8px
- Padding: 12px
- Font: 16px, Regular (400)
- Text Color: Dark Gray (#333333)
- Icon Color: #999999

## Icons

- **Style**: Material Design Icons
- **Default Size**: 24px
- **Color**: Matches text color or specific component guidelines
- **Touch Target**: Minimum 44x44px for interactive icons

## Spacing

- **XS**: 4px
- **S**: 8px
- **M**: 16px
- **L**: 24px
- **XL**: 32px
- **XXL**: 48px

## Logo Usage

The FieldQuote logo consists of two parts:
- "field" in Bright Orange (#F28C38)
- "quote" in Deep Blue (#2C4E80)

### Logo Variations
- **Full Color**: Primary usage on white or light backgrounds
- **White**: For use on dark backgrounds
- **Monochrome**: For special applications where color is restricted

### Logo Spacing
Maintain clear space around the logo equal to the height of the lowercase "f" in the logo.

### Minimum Size
- **Digital**: 100px wide
- **Print**: 1 inch wide

## Assets

All logo assets are available in the `/assets/logos` directory in various formats:
- SVG (vector)
- PNG (transparent background)
- JPG (white background)

## Implementation Guidelines

When implementing the design system:
1. Use the exact color hex codes provided
2. Maintain consistent spacing using the defined scale
3. Follow typography guidelines for readability
4. Use components as defined for a consistent user experience
5. Ensure proper logo usage according to the guidelines

## Accessibility

- Maintain a minimum contrast ratio of 4.5:1 for text
- Use the defined color palette to ensure readability
- Provide sufficient touch targets (minimum 44x44px)
- Support dynamic text sizing for users with visual impairments
