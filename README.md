# sonoaacservices Portfolio Website

A clean, professional portfolio website for sonoaacservices built with vanilla HTML, CSS, and JavaScript. Features minimal design with smooth scroll-based animations and responsive layout.

## Features

### Design & Layout
- **Minimal Design**: Clean white background with teal accent color (#2a9d8f)
- **Responsive**: Mobile-first design that works on all devices
- **Professional Typography**: Google Fonts (Inter + Source Serif Pro)
- **Accessibility**: High contrast support, reduced motion preferences, keyboard navigation

### Interactive Elements
- **Smooth Scroll Navigation**: Animated navigation between sections
- **Scroll Progress Bar**: Visual indicator of page scroll progress
- **Mobile Menu**: Hamburger menu with smooth animations for mobile devices
- **Contact Form**: Validated contact form with success/error messaging

### Scroll-Based Animations
- **Fade-in Effects**: Content reveals smoothly as you scroll
- **Slide-in Animations**: Elements slide in from left, right, and bottom
- **Staggered Animations**: Service cards appear with sequential delays
- **Intersection Observer**: Performance-optimized scroll detection

### Sections
1. **Hero**: Eye-catching introduction with call-to-action
2. **About**: Professional overview with headshot
3. **Services**: Four key service offerings with custom SVG icons
4. **Portfolio**: Six sample projects with hover effects
5. **Industries**: Business types served with emoji icons
6. **Contact**: Contact form and business information
7. **Footer**: Links and copyright information

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript for interactivity
- **Google Fonts**: Professional typography
- **SVG Icons**: Custom scalable vector graphics

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
├── generated-icon.png  # Favicon
└── README.md          # This file
```

## Key CSS Features

### Animation Classes
- `.fade-in` - Basic fade-in animation
- `.slide-in-left` - Slide in from left side
- `.slide-in-right` - Slide in from right side
- `.slide-in-up` - Slide in from bottom
- `.stagger-1` to `.stagger-6` - Animation delays for sequential effects

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### CSS Variables
```css
--accent-color: #2a9d8f;
--text-color: #000000;
--bg-color: #ffffff;
--light-bg: #f8f9fa;
```

## JavaScript Features

### Core Functions
- `initSmoothScrolling()` - Smooth navigation between sections
- `initScrollEffects()` - Header styling on scroll
- `initFadeInAnimation()` - Intersection Observer for animations
- `initScrollProgress()` - Progress bar functionality
- `initMobileMenu()` - Mobile navigation toggle
- `initContactForm()` - Form validation and submission

### Performance Optimizations
- Debounced scroll events
- Intersection Observer for efficient animation triggers
- Image loading with fade-in effects
- Touch gesture support for mobile

## Contact Information

- **Email**: contact@sonoaacservices.com
- **Phone**: (862) 405-2498
- **Website**: Professional web design for small businesses

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Optimized Images**: Responsive images with proper sizing
- **Minimal Dependencies**: No external JavaScript libraries
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Friendly**: Semantic HTML and meta tags

## Animation Timing

All animations follow these principles:
- Duration: 0.6-0.8 seconds maximum
- Easing: CSS ease functions for natural motion
- Staggered delays: 0.1s increments for sequential animations
- Respects `prefers-reduced-motion` setting

## Setup Instructions

1. Clone or download the project files
2. Open `index.html` in a web browser
3. For development, serve files through a local server:
   ```bash
   python -m http.server 5000
   ```
4. Navigate to `http://localhost:5000`

## Customization

### Colors
Update CSS variables in `styles.css` to change the color scheme:
```css
:root {
    --accent-color: #your-color;
    --text-color: #your-text-color;
}
```

### Content
- Update text content directly in `index.html`
- Replace placeholder images with actual project images
- Modify contact information in the contact section

### Animations
- Add new animation classes in `styles.css`
- Update the Intersection Observer in `script.js` to include new classes
- Adjust timing by modifying transition durations

## License

© 2025 sonoaacservices. All rights reserved.