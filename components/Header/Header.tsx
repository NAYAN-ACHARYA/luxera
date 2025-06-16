'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0); // Use ref instead of useState
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/#categories', label: 'Categories' },
    { href: '/contact', label: 'Contact' },
    { href: '/cart', label: 'Cart' },
    { href: '/admin', label: 'Admin' },
  ];

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Handle header visibility based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up or near top
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-white shadow-md px-6 py-4 fixed top-0 left-0 w-full z-50 
        transition-transform duration-300 font-['Barlow_Condensed'] text-[18px] 
        ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="font-extrabold text-black text-[22px]">
          LUXÉRA
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 font-medium">
          <DesktopNav navLinks={navLinks} pathname={pathname} />
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenu
          navLinks={navLinks}
          pathname={pathname}
          closeMenu={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
