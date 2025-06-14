'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/categories', label: 'Categories' },
    { href: '/contact', label: 'Contact' },
    { href: '/cart', label: 'Cart' },
  ];

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
      className={`bg-white shadow-md px-6 py-4 flex items-center justify-between font-sans fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="text-[1rem] font-extrabold text-black tracking-wide "><a href='/'>Luxera</a></div>

      <button
        className="md:hidden text-black"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className="hidden md:flex space-x-2 text-[14px] font-medium">
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
      </nav>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden py-4 z-50">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-[14px] text-black hover:bg-gray-100 w-full text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
