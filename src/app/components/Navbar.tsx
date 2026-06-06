import { Link } from 'react-router';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-[12px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Siksha Kendra</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-foreground hover:text-primary transition-colors">
              Courses
            </Link>
            <Link to="/become-vendor" className="text-foreground hover:text-primary transition-colors">
              Become a Vendor
            </Link>
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/courses"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/become-vendor"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Become a Vendor
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
