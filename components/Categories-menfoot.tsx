import Link from "next/link";

export default function MenFootCategoryCard() {
  const category = {
    name: "MenFootwear",
    image: "/footwear-men.png",
  };

  return (
    <section className="py-0 px-0 w-full mt-[110px] sm:mt-0 " >
      <div className="flex flex-col md:flex-row w-full">
        {/* Image Section - left 50% */}
        <div className="w-full md:w-1/2 h-[400px] sm:h-[500px] relative overflow-hidden">
          <img
            src={category.image}
            alt="Men Category"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>

        {/* Text + Buttons - right 50% */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16 font-['Barlow_Condensed']">
          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-4xl sm:text-5xl font-bold  mb-6">
              Elevate Every Step
            </h3>
            <p className="text-gray-700 text-lg sm:text-xl mb-8">
              From street-ready sneakers to refined leather shoes — find the perfect pair to match your stride. Style, comfort, and durability in every step.
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
