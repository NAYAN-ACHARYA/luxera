import AdminSidebar from "./components/AdminSidebar";
import DashboardCards from "./components/DashboardCards";
import ProductTable from "./components/ProductTable";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <DashboardCards />
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
          <ProductTable />
        </section>
      </main>
    </div>
  );
}
