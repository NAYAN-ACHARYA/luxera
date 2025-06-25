"use client";

import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-config";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return <div className="text-center text-xl p-8">Checking authentication...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "info":
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">My Info</h2>
      <p className="text-2xl font-semibold">Name: {user.displayName || "Unnamed User"}</p>
      <p className="text-xl">Email: {user.email}</p>
      <p className="text-xl text-gray-600">
        Email Verified: {user.emailVerified ? "✅ Yes" : "❌ No"}
      </p>
    </div>
  );

      case "orders":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6">My Orders</h2>
            <p className="text-lg text-gray-600">You have no orders yet.</p>
          </div>
        );
      case "addresses":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6">My Addresses</h2>
            <p className="text-lg text-gray-600">No saved addresses.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      {/* Fixed Mobile Nav */}
      <div className="md:hidden fixed top-[70px] left-0 right-0 z-40 bg-white border-b border-gray-200 flex justify-around items-center h-[50px]">
        {["orders", "addresses", "info"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium ${
              activeTab === tab ? "text-black underline" : "text-gray-500"
            }`}
          >
            {`My ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="min-h-screen font-[barlow_condensed] flex flex-col md:flex-row bg-white text-black">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block w-[40%] border-r border-gray-300 p-8 space-y-0 bg-white mt-[100px]">
          <button
            onClick={() => setActiveTab("orders")}
            className={`block w-full text-left text-xl px-4 py-3 border-t border-b ${
              activeTab === "orders" ? "bg-gray-100 text-black" : "hover:bg-gray-100"
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`block w-full text-left text-xl px-4 py-3 border-t border-b ${
              activeTab === "addresses" ? "bg-gray-100 text-black" : "hover:bg-gray-100"
            }`}
          >
            My Addresses
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`block w-full text-left text-xl px-4 py-3 border-t border-b ${
              activeTab === "info" ? "bg-gray-100 text-black" : "hover:bg-gray-100"
            }`}
          >
            My Info
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left text-xl px-4 py-3 border-t border-b bg-black text-white hover:bg-gray-800 mt-10"
          >
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-[60%] px-4 md:px-12 pt-[140px] md:pt-[120px] flex justify-center items-start">
          {renderContent()}
        </div>
      </div>
    </>
  );
} //image not visisble