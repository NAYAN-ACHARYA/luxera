type ProductCardProps = {
  name: string;
  cost: number;
  image: string;
};

export default function ProductCard({ name, cost, image }: ProductCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h3 className="text-2xl font-semibold mb-2">{name}</h3>
      <p className="text-lg text-gray-600">₹{cost}</p>
    </div>
  );
}
