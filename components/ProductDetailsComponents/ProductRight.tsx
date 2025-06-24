'use client';
import React from 'react';
import AccordionSection from './AccordionSection';

interface ProductDetailsProps {
  product: {
    name: string;
    cost: number;
    sizes: { quantity: number; size: string }[];
    tags: string[];
  };
}

export default function ProductRight({ product }: ProductDetailsProps) {
  return (
    <div className="w-full md:w-[30%] flex flex-col gap-6 bg-white p-4 rounded-xl shadow-sm">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-black mb-2">{product.name}</h1>
      <p className="text-xl md:text-3xl text-center text-gray-900 sm:mt-[40px] mb-2">₹{product.cost}</p>
      <div className="flex justify-center items-center gap-2 sm:mt-4 text-sm text-gray-600">
        <span className="text-yellow-500 text-lg">★★★★☆</span>
        <span>(112 reviews)</span>
      </div>

        {/* Tags */}
  <div className="flex gap-2 justify-center">
    <span className="text-black text-xs sm:text-[18px] px-3 py-1 rounded-full uppercase tracking-wide">{product.tags?.[0]}</span>
    <span className="text-black text-xs sm:text-[18px] px-3 py-1 rounded-full uppercase tracking-wide">{product.tags?.[1]}</span>
  </div>

      {product.sizes?.length > 0 && (
        <div className="sm:mt-[50px] mt-3">
          <h2 className="text-lg font-semibold text-black mb-2">Available Sizes:</h2>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((sizeObj, idx) => (
              <span
                key={idx}
                className={`border-2 sm:px-4 sm:py-2 px-2 py-1 rounded-lg text-[10px] sm:text-xl text-base sm:font-medium ${
                  sizeObj.quantity > 0
                    ? 'hover:bg-black hover:text-white cursor-pointer text-black'
                    : 'text-gray-400 border-gray-300 cursor-not-allowed line-through'
                }`}
              >
                {sizeObj.size}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-600 mt-1">Size chart (coming soon)</p>

      <button className="md:mt-4 px-8 md:py-5 py-1 bg-black text-[13px] rounded-full text-white sm:text-lg border border-transparent cursor-pointer hover:border-black hover:bg-white hover:text-black transition font-semibold">
        Add to Cart
      </button>

      <p className="text-sm text-center text-gray-700 mt-2">🚚 Free shipping on orders above ₹7999</p>

      <p className="text-sm text-gray-700 mt-1 leading-relaxed sm:text-[20px] sm:mt-[30px]">
        🛠️ <strong>MADE LOCALLY IN INDIA</strong><br />
        Crafted with responsibly sourced cotton and recycled fibers.<br />
        Designed, stitched, and finished in small-scale Indian workshops.<br />
        Supporting local artisans and sustainable manufacturing.
      </p>

      {/* Accordion Sections */}
      <AccordionSection title="Shipping & Returns">
        <p>Free standard shipping is available on all orders above ₹7999 across India.</p>
        {/* ... other content */}
      </AccordionSection>

      <AccordionSection title="Care Instructions">
        <p>Machine wash cold with like colors using a gentle cycle and mild detergent.</p>
        {/* ... other content */}
      </AccordionSection>

      <AccordionSection title="Recyclability">
        <p>This product is crafted using sustainably sourced materials such as organic cotton and recycled fibers.</p>
        {/* ... other content */}
      </AccordionSection>
    </div>
  );
}
