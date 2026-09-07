# 🌾 Naik Foods — Next-Gen D2C E-Commerce Platform

> **Full Stack MERN / Modern Web Engineering Intern Assignment**  
> **Target Case Study Website:** [Naik Foods (naikfoods.co.in/in)](https://www.naikfoods.co.in/in)  
> **Live Production Deployment:** [https://naikfoods-platform.vercel.app](https://naikfoods-platform.vercel.app) *(or active Vercel mirror)*  
> **Source Repository:** [https://github.com/itsofcurs/naikfoods-platform](https://github.com/itsofcurs/naikfoods-platform)

---

## 📌 1. Description of What Was Developed

A complete, high-performance, mobile-first D2C e-commerce platform re-engineered from the ground up to solve critical UX bottlenecks, legal compliance deficiencies, and checkout drop-offs identified during an in-depth forensic audit of the live Naik Foods website.

### 🌟 Key Feature Highlights & Innovations
1. **D2C Festive Hamper Builder (`/in/box-builder` & `/in/hamper-builder`):**
   - Interactive 3-step bundle customizer: Select celebratory box size (4, 6, or 8 items) with custom greeting card message.
   - Real-time slot tracker with dynamic 15% bundle discount auto-applied directly to subtotal and cart.
2. **Regional Taste Map of Maharashtra (`/` homepage):**
   - Interactive SVG/Card geospatial selector exploring authentic regional specialties across **Konkan, Kolhapur/Western Ghats, Vidarbha, Khandesh, and Marathwada**.
   - Filters catalog instantly to deliver authentic hyper-local heritage discovery.
3. **Swad Coins Loyalty Rewards Engine:**
   - 150 welcome bonus coins on signup, 5% cashback on every order, tier progression (**Silver ➔ Gold ➔ Platinum**).
   - Real-time coin redemption slider at cart & checkout with floating 3D embossed gold reward widget.
4. **"Aaji AI" Culinary & Kitchen Concierge:**
   - On-device deterministic AI assistant providing traditional Maharashtrian recipes, storage shelf-life advice, dietary guidance, and instant 1-click WhatsApp escalation.
5. **Smart Map & GPS Pinpoint Address Selector (`/in/checkout`):**
   - OpenStreetMap & Leaflet geolocation search + reverse geocoding to eliminate delivery failures without expensive proprietary API dependencies.
6. **Robust Checkout Flow & Conditional COD:**
   - Streamlined multi-step checkout with instant guest / member authentication gate, dynamic promo code validation (`DIWALI10`, `MAHA50`, `SWAD100`, `FREESHIP`), and strict Cash on Delivery risk validation (restricted to orders between ₹299 and ₹1,500).
7. **Dual Visual Aesthetics (Starlit Sky Night Theme & Heritage Saffron Light Theme):**
   - Specially calibrated dark mode with midnight deep navy (`#0B0F19`), nebula indigo cards, starlit golden accents, and WCAG AAA contrast compliance.
8. **Trust & Compliance Suite:**
   - FSSAI License badges (`11521036000458`), transparent nutritional breakdowns, dietary icon chips (100% Vegetarian, No Artificial Preservatives, Gluten-Free), live Pincode Serviceability estimator, and dynamic Free Shipping threshold progress bar (₹499).

---

## 🛠️ 2. Technologies Used

### Frontend & UI Ecosystem
- **Framework:** React 19 (`react`, `react-dom`)
- **Build Engine & Bundler:** Vite 8.2 (Fast HMR, optimized ESM bundling, Rolldown pipeline)
- **State Management:** Zustand with `persist` middleware (for Cart, Wishlist, Swad Coins, and Theme)
- **Styling & Design System:** Tailwind CSS + Vanilla CSS Custom Properties (Custom Color Tokens, Glassmorphism, Micro-animations)
- **Icons:** Lucide React (`lucide-react`)
- **Geospatial & Mapping:** Leaflet (`leaflet`, `react-leaflet`) with OpenStreetMap tiles and Nominatim Geocoding API
- **Routing:** React Router DOM v7 (`react-router-dom`) with client-side SPA redirects

### Backend & Data Integration
- **RESTful E-Commerce Architecture:** Medusa-compatible modular cart & catalog schema
- **Dynamic API Proxy / Mock Engine:** Custom in-memory and persisted catalog with real product weights, discounts, and regional tags
- **Storage:** HTML5 LocalStorage synchronization via Zustand

---

## ⚙️ 3. Setup and Installation Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher (or `pnpm` / `yarn`)
- **Git:** Version 2.30+

### Clone the Repository
```bash
git clone https://github.com/itsofcurs/naikfoods-platform.git
cd naikfoods-platform
```

### Install Dependencies
```bash
npm install
```

---

## 🚀 4. How to Run the Project

### Development Server (with Hot Module Replacement)
```bash
npm run dev
```
The application will spin up at `http://localhost:5173`. Open your browser and navigate to the URL.

### Production Build & Local Preview
```bash
# Generate optimized production bundle in /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 💡 5. Brief Explanation of Implementation & Architecture

```
naikfoods-app/
├── public/                  # Static brand assets, favicon, category imagery
├── src/
│   ├── components/          # Reusable UI & Business Logic Components
│   │   ├── AajiChatbot.jsx      # Traditional Culinary AI Support Widget
│   │   ├── FreeShippingBar.jsx  # Dynamic ₹499 Free Shipping Progress Meter
│   │   ├── DietaryBadge.jsx     # FSSAI & 100% Veg Compliance Badges
│   │   ├── SpiceMeter.jsx       # Visual Scoville-Scale Heat Indicator
│   │   ├── RegionalTasteMap.jsx # Interactive 5-Region Maharashtra Explorer
│   │   ├── SwadCoinsModal.jsx   # Loyalty Rewards & Cashback Portal
│   │   ├── ThemeToggle.jsx      # Sun / Starlit Sky Theme Switcher
│   │   ├── CheckoutAuthModal.jsx# Guest vs Member Authentication Gate
│   │   └── WhatsAppFAB.jsx      # Draggable, Hoverable Direct Support FAB
│   ├── pages/               # Route Views
│   │   ├── Home.jsx             # Hero slider, Deals, Regional Map, Reels
│   │   ├── Store.jsx            # Category filter, Global Search, Sorting
│   │   ├── ProductDetails.jsx   # Gallery, 6-digit Pincode check, FSSAI tabs
│   │   ├── FestiveHamperBuilder.jsx # Custom 3-Step Gift Box Configurator
│   │   ├── Cart.jsx             # Promo engine, Swad Coins slider, Cross-sells
│   │   ├── Checkout.jsx         # Map Geocoding, Address, Conditional COD
│   │   ├── Wishlist.jsx         # Saved items with 1-click cart migration
│   │   ├── AboutUs.jsx          # Heritage story, Quality commitments
│   │   └── Legal/               # FSSAI, Privacy, Refund, Terms, Shipping
│   ├── store/               # State Stores (Zustand + LocalStorage Sync)
│   │   ├── cartStore.js         # Items, quantities, promo codes, discounts
│   │   ├── swadCoinsStore.js    # Balance, tiers, transaction ledger
│   │   ├── wishlistStore.js     # Saved products
│   │   └── themeStore.js        # Light vs Starlit Sky theme mode
│   ├── data/                # Product catalogs, regions, coupons, FSSAI metadata
│   ├── App.jsx              # Application Layout & Route Definitions
│   ├── main.jsx             # React 19 Root Entrypoint
│   └── index.css            # Tailwind & Dark Mode CSS Design System
├── vercel.json              # SPA Rewrites configuration for Vercel
├── vite.config.ts           # Vite Bundler configuration
└── package.json             # Scripts and dependencies
```

### Key Architectural Decisions:
1. **Deterministic AI Customer Concierge ("Aaji AI"):**  
   Implemented using a fast keyword-intent parsing engine with fuzzy taxonomy matching for instant zero-latency responses without requiring paid third-party API tokens, featuring instant escalation to WhatsApp business chat.
2. **Decoupled State Management:**  
   Zustand stores operate independently with discrete persistence partitions, ensuring zero re-render thrashing across deeply nested components.
3. **Zero-API-Cost Map Integration:**  
   Leverages Leaflet and the OpenStreetMap Nominatim API for exact reverse geocoding and live delivery pin dropping, eliminating the high billing barriers of Google Maps API while retaining pinpoint precision.
4. **Full Responsive Accessibility (WCAG AAA):**  
   All form fields, contrast ratios in both light and night themes, and navigation anchors are fully tested for keyboard navigability and mobile touch targets.

---

## 📄 License & Attribution
- **Author:** Rohan Ankush Jadhav (`itsofcurs`)
- **Submission For:** Bits and Volts Private Limited — Full Stack MERN Internship Assessment.
