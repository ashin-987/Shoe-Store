# Social Media & SEO Configuration

## Meta Tags Setup

Add these meta tags to `index.html` for better social media sharing and SEO:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/nike-logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>Nike Premium Showcase | Interactive 3D Product Experience</title>
    <meta name="title" content="Nike Premium Showcase | Interactive 3D Product Experience" />
    <meta name="description" content="Explore Nike's latest innovations through cutting-edge 3D visualization. Built with React, Three.js, and modern web technologies." />
    <meta name="keywords" content="Nike, 3D Product Viewer, React, Three.js, Frontend Development, Portfolio Project" />
    <meta name="author" content="Your Name" />
    <meta name="theme-color" content="#111111" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ashin-987.github.io/NikeModel/" />
    <meta property="og:title" content="Nike Premium Showcase | Interactive 3D Experience" />
    <meta property="og:description" content="Explore Nike's latest innovations through cutting-edge 3D visualization. Built with React, Three.js, and modern web technologies." />
    <meta property="og:image" content="https://ashin-987.github.io/NikeModel/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://ashin-987.github.io/NikeModel/" />
    <meta property="twitter:title" content="Nike Premium Showcase | Interactive 3D Experience" />
    <meta property="twitter:description" content="Explore Nike's latest innovations through cutting-edge 3D visualization. Built with React, Three.js, and modern web technologies." />
    <meta property="twitter:image" content="https://ashin-987.github.io/NikeModel/twitter-image.png" />
    
    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    <link rel="canonical" href="https://ashin-987.github.io/NikeModel/" />
    
    <!-- Performance Hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## Creating Social Media Preview Images

### Required Images

1. **Open Graph Image** (Facebook, LinkedIn)
   - Size: 1200 x 630 pixels
   - Filename: `og-image.png`
   - Location: `/public/`

2. **Twitter Card Image**
   - Size: 1200 x 600 pixels
   - Filename: `twitter-image.png`
   - Location: `/public/`

3. **Favicon**
   - Size: 32 x 32 pixels (and larger variants)
   - Filename: `nike-logo.svg` or `favicon.ico`
   - Location: `/public/`

### Design Recommendations for Preview Images

**Content to Include:**
- Project name: "Nike Premium Showcase"
- Key feature: "Interactive 3D Product Experience"
- Visual: Screenshot of 3D viewer or hero section
- Tech stack badges: React, Three.js, Framer Motion
- Your name/brand

**Tools to Create:**
- Figma (recommended)
- Canva
- Photoshop
- Online tools: og-image.vercel.app

### Quick Template (Figma Dimensions)

```
Canvas: 1200 x 630px
Background: #111111 (Nike Black)
Accent: #FF6B35 (Nike Orange)

Layout:
┌─────────────────────────────┐
│                             │
│   NIKE PREMIUM SHOWCASE     │ ← 60px Archivo Black
│   Interactive 3D Product    │ ← 32px Inter
│   Experience                │
│                             │
│   [Screenshot or 3D Shoe]   │
│                             │
│   React • Three.js •        │ ← 20px badges
│   Framer Motion             │
│                             │
│   Your Name                 │ ← 24px
│   yourportfolio.com         │
└─────────────────────────────┘
```

## Testing Social Media Previews

### Facebook Debugger
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Click "Scrape Again" to refresh cache
4. Preview how it looks

### Twitter Card Validator
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL
3. Preview the card

### LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter your URL
3. Preview the preview

## Structured Data (JSON-LD)

Add this to `index.html` before closing `</body>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Nike Premium Showcase",
  "description": "Interactive 3D product visualization showcase built with React and Three.js",
  "url": "https://ashin-987.github.io/NikeModel/",
  "applicationCategory": "Portfolio, E-commerce Demo",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript, WebGL",
  "author": {
    "@type": "Person",
    "name": "Your Name",
    "url": "https://yourportfolio.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "screenshot": "https://ashin-987.github.io/NikeModel/og-image.png"
}
</script>
```

## Analytics Setup (Optional)

### Google Analytics 4

1. Create GA4 property at analytics.google.com
2. Add to `index.html` in `<head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

If deploying to Vercel:

```bash
npm install @vercel/analytics
```

Add to `src/main.jsx`:
```javascript
import { inject } from '@vercel/analytics';
inject();
```

## sitemap.xml

Create `/public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ashin-987.github.io/NikeModel/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## robots.txt

Create `/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://ashin-987.github.io/NikeModel/sitemap.xml
```

## Checklist Before Sharing

- [ ] Meta tags updated with your info
- [ ] OG image created and uploaded
- [ ] Twitter image created and uploaded
- [ ] Favicon added
- [ ] Tested in Facebook Debugger
- [ ] Tested in Twitter Validator
- [ ] Tested in LinkedIn Inspector
- [ ] Analytics installed (optional)
- [ ] Sitemap.xml created
- [ ] robots.txt created
- [ ] All URLs updated to your actual deployment

## Sharing Your Project

### LinkedIn Post Template

```
🚀 Just launched my new portfolio project: Nike Premium Showcase

Built an interactive product experience featuring:
• 3D product visualization with Three.js
• Smooth animations with Framer Motion  
• Full shopping cart functionality
• 90+ Lighthouse performance score

This project demonstrates production-level React development with WebGL graphics, complex state management, and performance optimization.

🔗 Live Demo: https://ashin-987.github.io/NikeModel/
💻 Source Code: https://github.com/ashin-987/NikeModel

Tech Stack: React • Three.js • Framer Motion • Zustand • Tailwind CSS

Would love to hear your feedback! 💬

#React #ThreeJS #WebDevelopment #Frontend #Portfolio
```

### Twitter Post Template

```
Built an interactive Nike showcase with 3D visualization 👟

✨ Three.js for WebGL rendering
✨ Framer Motion animations
✨ Full e-commerce cart
✨ 90+ Lighthouse score

🔗 https://ashin-987.github.io/NikeModel/

#ReactJS #ThreeJS #WebDev
```

---

**Remember**: First impressions matter! Great meta tags ensure your project looks professional when shared.
