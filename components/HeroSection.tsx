'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const images = [
  '/fashion-model1.png',
  '/fashion-model2.png',
  '/fashion-model3.png',
  '/fashion-model4.png',
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen sm:h-[90vh] lg:h-[150vh] overflow-hidden flex items-center justify-center text-center">
      {/* Background crossfade */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
      ))}

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl px-4 sm:px-6 py-10 text-white font-sans text-center ">
  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] animate-fade-in-up">
    Discover Your Style
  </div>

  <p className="text-base sm:text-xl md:text-2xl mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] animate-fade-in-up delay-300">
    Trendy. Affordable. Effortless Shopping.
  </p>

  <Link
    href="/shop"
    className="relative inline-block text-white font-semibold transition-all duration-300 animate-fade-in-up delay-500
      text-[32px] font-[Inter,sans-serif]
      after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white
      after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
  >
    Shop Now
  </Link>
</div>


      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
