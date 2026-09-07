import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import FestiveHamperBuilder from './pages/FestiveHamperBuilder';

import MainLayout from './layouts/MainLayout';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Core Storefront Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/in" element={<Home />} />
        <Route path="/in/about" element={<About />} />
        <Route path="/in/store" element={<Shop />} />
        <Route path="/in/product/:handle" element={<ProductDetails />} />
        <Route path="/in/cart" element={<Cart />} />
        <Route path="/in/checkout" element={<Checkout />} />

        {/* D2C Innovation Routes */}
        <Route path="/in/box-builder" element={<FestiveHamperBuilder />} />
        <Route path="/in/hamper-builder" element={<FestiveHamperBuilder />} />
        <Route path="/box-builder" element={<Navigate to="/in/box-builder" replace />} />
        <Route path="/hamper-builder" element={<Navigate to="/in/hamper-builder" replace />} />

        {/* Member & Auth Routes */}
        <Route path="/in/account" element={<Account />} />
        <Route path="/in/login" element={<Account />} />
        <Route path="/in/register" element={<Account />} />
        <Route path="/in/wishlist" element={<Wishlist />} />

        {/* Content & Journal Routes */}
        <Route path="/in/blog" element={<Blog />} />
        <Route path="/in/blog/:slug" element={<BlogPost />} />
        <Route path="/in/contact" element={<Contact />} />

        {/* Legal & Policy Routes with Aliases */}
        <Route path="/terms" element={<Navigate to="/in/terms-and-conditions" replace />} />
        <Route path="/terms-and-conditions" element={<Navigate to="/in/terms-and-conditions" replace />} />
        <Route path="/terms-of-use" element={<Navigate to="/in/terms-and-conditions" replace />} />
        <Route path="/privacy" element={<Navigate to="/in/privacy-policy" replace />} />
        <Route path="/privacy-policy" element={<Navigate to="/in/privacy-policy" replace />} />
        <Route path="/about" element={<Navigate to="/in/about" replace />} />
        <Route path="/contact" element={<Navigate to="/in/contact" replace />} />
        <Route path="/blog" element={<Navigate to="/in/blog" replace />} />
        <Route path="/store" element={<Navigate to="/in/store" replace />} />

        <Route path="/in/privacy" element={<PrivacyPolicy />} />
        <Route path="/in/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/in/terms" element={<TermsAndConditions />} />
        <Route path="/in/terms-of-use" element={<TermsAndConditions />} />
        <Route path="/in/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/in/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/in/refund-policy" element={<RefundPolicy />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/in" replace />} />
      </Route>
    </Routes>
  );
}
