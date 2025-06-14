import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import ScrollFadeIn from "@/components/ScrollFadeIn";
export default function HomePage() {
  return (
    <main className="bg-white min-h-screen text-gray-900">
      {/* Header */}
      <Header/>
      <ScrollFadeIn delay={0.1}>
      <HeroSection/>
      </ScrollFadeIn>


<ScrollFadeIn delay={0.2}>
      {/* Featured Categories */}
      <section className="py-12 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">Featured Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Men', 'Women', 'Electronics', 'Home'].map((cat) => (
            <Link key={cat} href={`/categories/${cat.toLowerCase()}`} className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition">
              <p className="text-center font-medium">{cat}</p>
            </Link>
          ))}
        </div>
      </section>
</ScrollFadeIn>
      {/* Best Sellers */}
      <ScrollFadeIn delay={0.3}>
      <section className="py-12 px-4 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-6 text-center">Best Sellers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-white shadow rounded p-4 hover:shadow-lg transition">
              <div className="bg-gray-200 h-40 mb-4 rounded" />
              <h4 className="font-semibold text-lg">Product {i}</h4>
              <p className="text-sm text-gray-600">Short product description</p>
              <p className="font-bold mt-2">$49.99</p>
              <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
</ScrollFadeIn>
      
<ScrollFadeIn delay={0.4}>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 ShopEase. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </footer>
      </ScrollFadeIn>
    </main>
  );
}
