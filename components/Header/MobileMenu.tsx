'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function MobileMenu({ navLinks, pathname, closeMenu }: any) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white z-[100] flex flex-col items-center justify-start pt-24 px-6 space-y-4 overflow-y-auto">
      <button
        onClick={closeMenu}
        className="absolute top-6 right-6 text-black"
        aria-label="Close menu"
      >
        <X size={28} />
      </button>

      {navLinks.map(({ href, label }: any) => {
        if (label === 'Categories' && pathname !== '/') {
          return (
            <div key={href} className="w-full">
              <button
                onClick={() => setIsSubOpen(!isSubOpen)}
                className="w-full text-left text-black text-2xl font-medium flex justify-between items-center"
              >
                {label}
                <span className="text-lg">{isSubOpen ? '−' : '+'}</span>
              </button>

              {isSubOpen && (
                <div className="mt-2 ml-4 flex flex-col space-y-2">
                  <Link
                    href="/#cat1"
                    onClick={closeMenu}
                    className="text-black text-lg hover:underline"
                  >
                    Subcategory 1
                  </Link>
                  <Link
                    href="/#cat2"
                    onClick={closeMenu}
                    className="text-black text-lg hover:underline"
                  >
                    Subcategory 2
                  </Link>
                  <Link
                    href="/#cat3"
                    onClick={closeMenu}
                    className="text-black text-lg hover:underline"
                  >
                    Subcategory 3
                  </Link>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            onClick={closeMenu}
            className="text-black text-2xl font-medium hover:underline transition-all w-full text-left"
          >
            {label}
          </Link>
        );
      })}

      <Link
        href="/profile"
        onClick={closeMenu}
        className="text-black text-2xl font-medium hover:underline w-full text-left"
      >
        Profile
      </Link>
    </div>
  );
}
