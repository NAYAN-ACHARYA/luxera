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
      onClick={() => router.push(`/footwear/${id}`)}
      className="bg-white rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-md mb-4 transition-opacity duration-300 hover:opacity-90"
      />
      <h3 className="text-2xl font-semibold mb-2">{name}</h3>
      <p className="text-lg text-gray-600">₹{cost}</p>
    </div>
  );
}
