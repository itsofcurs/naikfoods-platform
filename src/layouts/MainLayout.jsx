import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFAB from '../components/WhatsAppFAB';
import AajiChatbot from '../components/AajiChatbot';
import ScrollToTop from '../components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ScrollToTop />
      <Toaster position="top-center" />
      <Header />
      <main className="flex-grow bg-[#F7F7F7] dark:bg-[#070B14] transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
      <AajiChatbot />
    </div>
  );
}
