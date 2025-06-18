'use client';

import Header from '@/components/Header/Header';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { useEffect, useState } from 'react';

type Product = {
  name: string;
  cost: number;
  images: string[];
};

export default function FootwearPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const userCollectionRef = collection(db, 'products');

  const getProducts = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      const productsData = data.docs.map((doc) => doc.data() as Product);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <div className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white font-[Barlow_Condensed]">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            cost={product.cost}
            image={product.images[0]}
          />
        ))}
      </div>
    </>
  );
}
