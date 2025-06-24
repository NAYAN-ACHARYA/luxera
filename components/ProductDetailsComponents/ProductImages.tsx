'use client';
import React from 'react';

interface ProductImagesProps {
  images: string[];
  productName: string;
  onImageClick: (index: number) => void;
}

export default function ProductImages({ images, productName, onImageClick }: ProductImagesProps) {
  return (
    <div className="w-full md:w-[85%]">
      <img
        src={images[0]}
        alt={productName}
        className="w-full md:h-[680px] object-cover cursor-pointer rounded-lg mb-6"
        onClick={() => onImageClick(0)}
      />
      <div className="grid grid-cols-2 gap-4">
        {images.slice(1, -1).map((img, idx) => (
          <img
            key={idx + 1}
            src={img}
            alt={`${productName} ${idx + 1}`}
            className="w-full md:h-[580px] object-cover cursor-pointer rounded-md"
            onClick={() => onImageClick(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
}
