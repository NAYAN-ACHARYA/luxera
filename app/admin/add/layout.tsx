import type { Metadata } from "next";
import AdminSidebar from "../components/AdminSidebar"; // Must be a Client Component if interactive

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin dashboard layout",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 bg-gray-50">{children}</main>
    </div>
  );
}
