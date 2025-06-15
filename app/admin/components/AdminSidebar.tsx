'use client';
import { FC } from "react";
import Link from "next/link";
const AdminSidebar: FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <Link href="/admin" className="block text-gray-700 hover:text-black">Dashboard</Link>
        <Link href="/admin/product" className="block text-gray-700 hover:text-black">Products</Link>
        <Link href="/admin/add" className="block text-gray-700 hover:text-black">Add Product</Link>
        <Link href="/" className="block text-gray-700 hover:text-black">Return </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
