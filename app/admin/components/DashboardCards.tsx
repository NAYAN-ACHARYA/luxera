const DashboardCards = () => {
  const stats = [
    { label: "Total Orders", value: "1,240" },
    { label: "Total Revenue", value: "$56,300" },
    { label: "Products", value: "320" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">{stat.label}</p>
          <p className="text-2xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
