'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import ProductImages from './ProductDetailsComponents/ProductImages';
import ProductDetails from './ProductDetailsComponents/ProductRight';
import ProductBottom from './ProductDetailsComponents/ProductBottom';
type Product = {
  name: string;
  cost: number;
  images: string[];
  sizes: { quantity: number; size: string }[];
  tags: string[];
  description:{
    about:string,
    impact:string,
    role:string
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProduct(docSnap.data() as Product);
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      product ? (prev + 1) % (product.images.length-1) : 0
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      product ? (prev - 1 + product.images.length-1) % (product.images.length-1) : 0
    );
  };

  if (!product) return <p className="text-center mt-10 text-lg">Loading product details...</p>;

  return (
    <>
      <div className="p-6 sm:mt-[80px] mt-[30px] bg-white mx-auto font-[Barlow_Condensed]">
        <button onClick={() => router.back()} className="mb-6 text-blue-600 hover:underline">← Back</button>

        <div className="flex flex-col md:flex-row gap-10">
          <ProductImages
            images={product.images}
            productName={product.name}
            onImageClick={openModal}
          />
          <ProductDetails product={product} />
        </div>
      </div>

      {isModalOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/80 overflow-y-auto">
          <button onClick={closeModal} className="absolute top-4 right-10 text-gray-800 hover:text-gray-600 text-3xl font-bold">✕</button>
          <button onClick={prevImage} className="absolute left-4 md:left-8 text-gray-800 hover:text-gray-600 text-4xl font-bold">←</button>
          <div className="max-h-[90vh] overflow-y-auto px-4 py-9">
            <img
              src={product.images[selectedImageIndex]}
              alt="Fullscreen product"
              className="w-[95vw] h-auto object-contain rounded-xl shadow-2xl"
            />
          </div>
          <button onClick={nextImage} className="absolute right-4 md:right-8 text-gray-800 hover:text-gray-600 text-4xl font-bold">→</button>
        </div>
      )}
      <ProductBottom
  images={product.images}
  description={product.description}
  productName={product.name}
/>
    </>
  );
}
