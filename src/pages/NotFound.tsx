import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <p className="font-playfair text-8xl font-bold text-navy-700 mb-4">404</p>
        <h1 className="font-playfair text-2xl font-bold text-navy-700 mb-4">Page Not Found</h1>
        <p className="text-[#6B6B6B] mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-navy-700 text-white font-bold rounded-full hover:bg-navy-600 transition-colors">
          Go Home <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
