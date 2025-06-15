"use client";

import { useState } from "react";

export default function AddProduct() {
     const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const urls = Array.from(files)
    .filter((file) => file.type.startsWith("image/"))
    .map((file) => URL.createObjectURL(file));

  setPreviews((prev) => [...prev, ...urls]);
};



  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Clothing");

  const getSizeOptions = () => {
    if (category === "Men" && subcategory === "Footwear") {
      return ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];
    }
    return ["S", "M", "L", "XL", "XXL"];
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Product Name</label>
          <input type="text" name="name" className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" className="w-full border p-2 rounded" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Category</label>
            <select
              className="w-full border p-2 rounded"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(e.target.value === "Men" ? "Clothing" : "");
              }}
            >
              <option>Men</option>
              <option>Women</option>
            </select>
          </div>

          {category === "Men" && (
            <div>
              <label className="block mb-1">Subcategory</label>
              <select
                className="w-full border p-2 rounded"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option>Clothing</option>
                <option>Footwear</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">Sizes Available</label>
          <div className="flex flex-wrap gap-2">
            {getSizeOptions().map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input type="checkbox" name="sizes" value={size} />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1">Quantity</label>
          <input type="number" name="quantity" min="0" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Cost (in ₹)</label>
          <input type="number" name="cost" step="0.01" min="0" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">SKU (Stock Keeping Unit)</label>
          <input type="text" name="sku" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Tags (comma-separated)</label>
          <input type="text" name="tags" placeholder="e.g., summer, casual" className="w-full border p-2 rounded" />
        </div>

            <div className="mb-4">
      <label className="block mb-1 font-medium">Images</label>

      <div className="relative mb-3">
        <label
          htmlFor="imageUpload"
          className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Images
        </label>
        <input
          id="imageUpload"
          type="file"
          name="images"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="w-full h-32 object-cover rounded border"
            />
          ))}
        </div>
      )}
    </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
