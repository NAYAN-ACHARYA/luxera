const ProductTable = () => {
  const products = [
    { id: 1, name: "T-Shirt", price: "$20", stock: 30 },
    { id: 2, name: "Sneakers", price: "$89", stock: 12 },
    { id: 3, name: "Backpack", price: "$45", stock: 50 },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Product</th>
            <th className="text-left p-3">Price</th>
            <th className="text-left p-3">Stock</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.price}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3 space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Edit</button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
