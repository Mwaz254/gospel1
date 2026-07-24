import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackgroundDecoration from '@/components/BackgroundDecoration';
import Home from './pages/Home';
import About from './pages/About';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Devotionals from './pages/Devotionals';
import FreeSample from './pages/FreeSample';
import PrayerGuidelines from './pages/PrayerGuidelines';
import PrayerPartners from './pages/PrayerPartners';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Communities from './pages/Communities';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundDecoration />
      <Navigation />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/devotionals" element={<Devotionals />} />
          <Route path="/free-sample" element={<FreeSample />} />
          <Route path="/prayer-guidelines" element={<PrayerGuidelines />} />
          <Route path="/prayer-partners" element={<PrayerPartners />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
