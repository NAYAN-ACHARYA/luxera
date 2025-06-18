'use client';

import Link from 'next/link';
import { User } from 'lucide-react';

// Define type for each navigation link
interface NavLink {
  href: string;
  label: string;
}

// Define props for the component
interface DesktopNavProps {
  navLinks: NavLink[];
  pathname: string;
}

export default function DesktopNav({ navLinks, pathname }: DesktopNavProps) {
  return (
    <>
      {navLinks.map(({ href, label }) => {
        if (label === 'Categories' && pathname !== '/') {
          return (
            <div key={href} className="relative group">
              <Link
                href={href}
                className="relative inline-block text-black px-4 py-2 transition-all duration-300 
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] 
                after:w-0 after:bg-black after:transition-all after:duration-300 
                group-hover:after:left-0 group-hover:after:w-full"
              >
                {label}
              </Link>

              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[160px]">
                <Link href="/men" className="block px-4 py-2 hover:bg-gray-100">
                  Men
                </Link>
                <Link href="/women" className="block px-4 py-2 hover:bg-gray-100">
                  Women
                </Link>
                <Link href="/footwear" className="block px-4 py-2 hover:bg-gray-100">
                  Men Sneaker
                </Link>
              </div>
            </div>
          );
        }

        return (
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
        );
      })}

      <Link href="/profile" className="text-black ml-2 hover:text-gray-700 transition">
        <User size={22} />
      </Link>
    </>
  );
}
