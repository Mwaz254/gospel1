import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <p className="font-playfair text-8xl font-bold text-gold-300 mb-4">404</p>
        <h1 className="font-playfair text-2xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/55 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 ih-btn-gold">
          Go Home <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
