export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 gap-6 bg-[#fefaf6] font-[Barlow_Condensed] mt-[140px] md:max-h-96">
      {/* Left Content */}
      <div className="md:w-[25%] w-full md:text-right text-center">
        <h2 className="sm:text-6xl text-4xl font-bold mb-4 text-black">Sneakers</h2>
        <p className="text-gray-700 text-[26px]">
          Discover our sneakers designed from a rigorous selection of natural and recycled materials: recycled wool, hemp, linen and recycled cotton.
        </p>
      </div>

      {/* Right Image */}
      <div className="md:w-[50%] w-full">
        <img
          src="/footwear-2.jpg"
          alt="Sneakers"
          className="w-full max-h-96 rounded-lg shadow-md object-cover"
        />
      </div>
    </div>
  );
}
