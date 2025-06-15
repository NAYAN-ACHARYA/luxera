'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '#categories', label: 'Categories' },
    { href: '/contact', label: 'Contact' },
    { href: '/cart', label: 'Cart' },
  ];

  // Disable scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Show/hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white shadow-md px-6 py-4 flex items-center justify-between 
        fixed top-0 left-0 w-full z-50 transition-transform duration-300 
        font-['Barlow_Condensed'] text-[18px] ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="font-extrabold text-black tracking-wide text-[22px]">
        <Link href="/">Luxera</Link>
      </div>

      <button
        className="md:hidden text-black"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className="hidden md:flex items-center space-x-4 font-medium">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="relative inline-block text-black px-4 py-2 transition-all duration-300 
              after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] 
              after:w-0 after:bg-black after:transition-all after:duration-300 
              hover:after:left-0 hover:after:w-full"
          >
            {label}
          </Link>
        ))}

        <Link href="/profile" className="text-black ml-2 hover:text-gray-700 transition">
          <User size={22} />
        </Link>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-[100] flex flex-col items-center justify-center space-y-6 px-4 transition-all duration-300">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-black"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-black text-2xl font-medium hover:underline transition-all"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className="text-black text-2xl font-medium hover:underline transition-all"
          >
            Profile
          </Link>
        </div>
      )}
    </header>
  );
}
