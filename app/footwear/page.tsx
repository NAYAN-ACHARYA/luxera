'use client';
import Header from '@/components/Header/Header';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  cost: number;
  images: string[];
};

export default function FootwearPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const userCollectionRef = collection(db, 'products');

  const getProducts = async () => {
    try {
      const q = query(
        userCollectionRef,
        where('category', '==', 'Men'),
        where('subcategory', '==', 'Footwear')
      );

      const data = await getDocs(q);
      const productsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
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
      <div className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 bg-white font-[Barlow_Condensed]">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            cost={product.cost}
            image={product.images[0]}
          />
        ))}
      </div>
    </>
  );
}
