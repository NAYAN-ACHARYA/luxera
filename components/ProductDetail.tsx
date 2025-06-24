'use client';
import AccordionSection from './AccordionSection';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';

type Product = {
  name: string;
  cost: number;
  description?: {
    about: string;
    role: string;
    impact: string;
  };
  images: string[];
  sizes: {
    quantity: number;
    size: string;
  }[];
  tags:string[];
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  
useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = 'hidden'; // Disable scroll
  } else {
    document.body.style.overflow = ''; // Re-enable scroll
  }

  // Cleanup when component unmounts
  return () => {
    document.body.style.overflow = '';
  };
}, [isModalOpen]);
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

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  if (!product) {
    return <p className="text-center mt-10 text-lg">Loading product details...</p>;
  }

  return (
    <>
      <div className="p-6  sm:mt-[80px] mt-[30px] bg-white mx-auto font-[Barlow_Condensed]">
        <button onClick={() => router.back()} className="mb-6 text-blue-600 hover:underline">
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side - Images */}
          <div className="w-full md:w-[85%]  ">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full md:h-[680px] object-cover cursor-pointer rounded-lg mb-6"
              onClick={() => openModal(0)}
            />

            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1,-1).map((img, idx) => (
                <img
                  key={idx + 1}
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full md:h-[580px] object-cover cursor-pointer rounded-md"
                  onClick={() => openModal(idx + 1)}
                />
              ))}
            </div>
          </div>




{/* Right Side - Details */}
<div className="w-full md:w-[30%] flex flex-col gap-6 bg-white p-4 rounded-xl shadow-sm">
  {/* Product Name & Price */}
  <div>
    <h1 className="text-2xl md:text-4xl font-bold text-center text-black mb-2">{product.name}</h1>
    <p className="text-xl md:text-3xl text-center text-gray-900 sm:mt-[40px] mb-2">₹{product.cost}</p>

    {/* Rating and Reviews */}
    <div className="flex justify-center items-center gap-2 sm:mt-4 text-sm text-gray-600">
      <span className="text-yellow-500 text-lg">★★★★☆</span>
      <span>(112 reviews)</span>
    </div>
  </div>

  {/* Tags */}
  <div className="flex gap-2 justify-center">
    <span className="text-black text-xs sm:text-[18px] px-3 py-1 rounded-full uppercase tracking-wide">{product.tags?.[0]}</span>
    <span className="text-black text-xs sm:text-[18px] px-3 py-1 rounded-full uppercase tracking-wide">{product.tags?.[1]}</span>
  </div>

  {/* Sizes */}
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

  {/* Size Chart Note */}
  <p className="text-sm text-gray-600 mt-1">Size chart (coming soon)</p>

  {/* Add to Cart Button */}
  <button className="md:mt-4 px-8 md:py-5 py-1 bg-black text-[13px] rounded-full text-white sm:text-lg border border-transparent cursor-pointer hover:border-black hover:bg-white hover:text-black transition font-semibold">
    Add to Cart
  </button>

  {/* Shipping Info */}
  <p className="text-sm text-center text-gray-700 mt-2">
    🚚 Free shipping on orders above ₹7999
  </p>

   <p className="text-sm text-gray-700 mt-1 leading-relaxed sm:text-[20px] sm:mt-[30px]">
  🛠️ <strong>MADE LOCALLY IN INDIA</strong><br />
  Crafted with responsibly sourced cotton and recycled fibers.<br />
  Designed, stitched, and finished in small-scale Indian workshops.<br />
  Supporting local artisans and sustainable manufacturing.
</p>

{/* Expandable Details Sections */}
<AccordionSection title="Shipping & Returns">
  <p>Free standard shipping is available on all orders above ₹7999 across India.</p>
  <p>Orders are typically processed within 1–2 business days and shipped from our local warehouse.</p>
  <p>Delivery times range between 4–6 working days depending on your location and courier availability.</p>
  <p>We offer easy returns within 15 days of delivery. Items must be unworn, unwashed, and returned in original packaging.</p>
  <p>Refunds are processed within 5–7 business days after we receive the returned product.</p>
  <p>For return assistance or exchanges, please contact our support team through the Help Center.</p>
</AccordionSection>

<AccordionSection title="Care Instructions">
  <p>Machine wash cold with like colors using a gentle cycle and mild detergent.</p>
  <p>Do not bleach. Avoid using fabric softeners to maintain fabric integrity and longevity.</p>
  <p>Tumble dry on low heat or hang to dry. Avoid over-drying which may damage natural fibers.</p>
  <p>Iron on low temperature if necessary. For printed or embroidered areas, iron inside-out.</p>
  <p>Store garments in a cool, dry place away from direct sunlight to prevent fading.</p>
</AccordionSection>

<AccordionSection title="Recyclability">
  <p>This product is crafted using sustainably sourced materials such as organic cotton and recycled fibers.</p>
  <p>All packaging is 100% recyclable and made without plastic, using only biodegradable and FSC-certified paper.</p>
  <p>We encourage customers to dispose of garments responsibly through local textile recycling programs.</p>
  <p>Our design philosophy emphasizes durability and minimal environmental impact to support a circular fashion ecosystem.</p>
  <p>In the future, we plan to launch a take-back initiative to repurpose used garments and reduce landfill waste.</p>
</AccordionSection>

</div>


        </div>
      </div>

 {isModalOpen && product && (
  <div className="fixed inset-0  z-50 flex items-center justify-center backdrop-blur-sm bg-white/80 overflow-y-auto">
    {/* Close Button */}
    <button
      onClick={closeModal}
      className="absolute top-4 right-10 cursor-pointer text-gray-800 hover:text-gray-600 text-3xl font-bold"
      aria-label="Close"
    >
      ✕
    </button>

    {/* Previous Button */}
    <button
      onClick={prevImage}
      className="absolute left-4 md:left-8 cursor-pointer text-gray-800 hover:text-gray-600 text-4xl font-bold"
      aria-label="Previous"
    >
      ←
    </button>

    {/* Scrollable Image Container */}
    <div className="max-h-[90vh] overflow-y-auto px-4 py-9">
      <img
        src={product.images[selectedImageIndex]}
        alt="Fullscreen product"
        className="w-[95vw] h-auto object-contain rounded-xl shadow-2xl transition-all duration-300"
      />
    </div>

    {/* Next Button */}
    <button
      onClick={nextImage}
      className="absolute right-4 md:right-8 cursor-pointer text-gray-800 hover:text-gray-600 text-4xl font-bold"
      aria-label="Next"
    >
      →
    </button>
  </div>
)}




    </>
  );
}
