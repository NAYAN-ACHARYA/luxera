'use client';
import Header from "@/components/Header/Header";
import {db} from "@/lib/firebase-config";
import {collection,getDocs} from 'firebase/firestore'
import {useState,useEffect} from 'react';
import ProductCard from "./components/ProductCard";
import HeroSection from "./components/HeroSection";
type Product = {
  id: string;
  name: string;
  cost: number;
  images: string[];
};
export default function Shop(){
    const [products,setProducts]=useState<Product[]>([]);
    const userCollectionRef = collection(db, 'products');
    
       const getProducts = async () => {
    try {
      const data = await getDocs(userCollectionRef); // ✅ Use the collection reference
      const productsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
    
      useEffect(() => {
        getProducts();
      }, []);
    return(
        <>
        <Header/>
        <HeroSection/>
        <div className="px-6 py-50 grid grid-cols-2 md:grid-cols-3  gap-6 bg-white font-[Barlow_Condensed]">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    cost={product.cost}
                    image={product.images[0]}
                  />
                ))}
              </div>
        </>
    )
}