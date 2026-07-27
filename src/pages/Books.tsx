import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BooksNav from './books/BooksNav';
import Hero from './books/Hero';
import AgeCards from './books/AgeCards';
import CollectionCards from './books/CollectionCards';
import FeaturesGrid from './books/FeaturesGrid';
import HowToUse from './books/HowToUse';
import ScriptureTimeline from './books/ScriptureTimeline';
import ComparisonSection from './books/ComparisonSection';
import OneMission from './books/OneMission';
import PricingCards from './books/PricingCards';
import TestimonialsCarousel from './books/TestimonialsCarousel';
import FinalCTA from './books/FinalCTA';
import BooksFooter from './books/BooksFooter';

export default function Books() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);

  return (
    <div className="relative min-h-screen text-white">
      <BooksNav />
      <main>
        <Hero />
        <AgeCards />
        <CollectionCards />
        <FeaturesGrid />
        <HowToUse />
        <ScriptureTimeline />
        <ComparisonSection />
        <OneMission />
        <PricingCards />
        <TestimonialsCarousel />
        <FinalCTA />
      </main>
      <BooksFooter />
    </div>
  );
}
