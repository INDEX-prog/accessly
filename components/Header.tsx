"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">Accessly</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Testimonials
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="#signup" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="#signup" className="btn-primary text-sm py-2 px-4">
              Get Started Free
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-navy-700">
            <div className="flex flex-col space-y-4">
              <Link href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Testimonials
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Dashboard
              </Link>
              <div className="pt-4 border-t border-navy-700 space-y-3">
                <Link href="#signup" className="block text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="#signup" className="btn-primary text-sm py-2 px-4 inline-block text-center">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
