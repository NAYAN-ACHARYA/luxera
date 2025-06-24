'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import Header from '@/components/Header/Header';

type Product = {
  name: string;
  cost: number;
  description?: {
    about: string;
    role: string;
    impact: string;
  };
  images: string[];
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, 'products', id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data() as Product);
      } else {
        console.error('No such product!');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10 text-lg">Loading product details...</p>;
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mt-[200px] bg-white mx-auto font-[Barlow_Condensed]">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-800 mb-4">₹{product.cost}</p>

            {product.description && typeof product.description === 'object' && (
              <div className="space-y-2 text-gray-700">
                <p><strong>About:</strong> {product.description.about}</p>
                <p><strong>Role:</strong> {product.description.role}</p>
                <p><strong>Impact:</strong> {product.description.impact}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
