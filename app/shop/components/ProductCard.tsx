'use client';
import { useRouter } from 'next/navigation';

type ProductCardProps = {
  id: string;
  name: string;
  cost: number;
  image: string;
};

export default function ProductCard({ id, name, cost, image }: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/shop/${id}`)}
      className="bg-white rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer w-full md:w-[80%] justify-center"
    >
      <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-[center_30%] object-cover transition-opacity duration-300 hover:opacity-90"
        />
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-1">{name}</h3>
      <p className="text-base md:text-lg text-gray-600">₹{cost}</p>
    </div>
  );
}
