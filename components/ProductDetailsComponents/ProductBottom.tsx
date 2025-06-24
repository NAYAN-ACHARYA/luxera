'use client';
import React from 'react';
import ScrollFadeIn from '../ScrollFadeIn'; // adjust path as needed

interface ProductBottomProps {
  images: string[];
  description: {
    about: string;
    role: string;
    impact: string;
  };
  productName: string;
}

export default function ProductBottom({ images, description, productName }: ProductBottomProps) {
  const bottomImages = images.slice(-3);
  const textSections = [
    { heading: 'About', content: description.about },
    { heading: 'Role', content: description.role },
    { heading: 'Impact & Vision', content: description.impact },
  ];

  return (
    <div className="sm:mt-20 mt-[20px] mb-24 space-y-2 sm:space-y-15 px-4 max-w-6xl mx-auto font-[barlow_condensed]">
      {bottomImages.map((img, index) => {
        const isImageLeft = index % 2 === 0;
        const section = textSections[index];

        return (
          <ScrollFadeIn key={index} delay={index * 0.2}>
            <div
              className={`flex flex-col md:flex-row items-center justify-center gap-10 ${
                !isImageLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="md:w-1/2 w-full flex justify-center">
                <img
                  src={img}
                  alt={`${productName} - section ${index + 1}`}
                  className="w-full max-w-md h-auto rounded-xl object-cover shadow-lg"
                />
              </div>

              {/* Text */}
              <div className="md:w-1/2 w-full text-center px-2">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                <p className="text-base sm:text-2xl text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </ScrollFadeIn>
        );
      })}
    </div>
  );
}
