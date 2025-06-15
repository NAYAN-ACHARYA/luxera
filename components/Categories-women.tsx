import Link from "next/link";

export default function MenCategoryCard() {
  const category = {
    name: "Men",
    image: "/women-transparent.png",
  };

  return (
    <section className="py-0 px-0 w-full mt-[114px] sm:mt-0 font-['Barlow_Condensed']">
      <div className="flex flex-col md:flex-row w-full">
        {/* Text + Buttons - left 50% */}
        <div className="hidden w-full md:w-1/2 sm:flex items-center justify-center px-6 md:px-16">
          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-4xl sm:text-5xl font-bold  mb-6">
              Define Your Elegance
            </h3>
            <p className="text-gray-700 text-lg sm:text-xl mb-8">
              Explore the latest in women’s fashion — from timeless classics to modern silhouettes. Curated with care, crafted for confidence
            </p>

            <div className="flex justify-center md:justify-between sm:mx-1.5">
  <Link
    href="/categories/men"
    className="relative text-[26px] font-semibold text-black group transition-transform duration-300 hover:scale-105"
  >
    Shop Now
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-300 group-hover:w-0"></span>
  </Link>
</div>
          </div>
        </div>

        {/* Image Section - right 50% */}
        <div className="w-full md:w-1/2 h-[400px] sm:h-[500px] relative overflow-hidden">
          <img
            src={category.image}
            alt="Women Category"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
        
        {/* div for mobile only  */}
        <div className="sm:hidden w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Define Your Elegance
            </h3>
            <p className="text-gray-700 text-lg sm:text-xl mb-8">
              Explore the latest in women’s fashion — from timeless classics to modern silhouettes. Curated with care, crafted for confidence
            </p>

            <div className="flex justify-center md:justify-between sm:mx-1.5">
  <Link
    href="/categories/men"
    className="relative text-[26px] font-semibold text-black group transition-transform duration-300 hover:scale-105"
  >
    Shop Now
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-300 group-hover:w-0"></span>
  </Link>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
