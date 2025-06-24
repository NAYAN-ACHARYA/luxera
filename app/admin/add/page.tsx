"use client";

import { useState } from "react";
import { db } from "@/lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function AddProduct() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Clothing");
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const getSizeOptions = () => {
    if (category === "Men" && subcategory === "Footwear") {
      return ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];
    }
    return ["S", "M", "L", "XL", "XXL"];
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    setImageFiles((prev) => [...prev, ...selectedFiles]);

    const localPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews((prev) => [...prev, ...localPreviews]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    const cloudinaryUrls: string[] = [];

    for (const file of imageFiles) {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageFormData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        cloudinaryUrls.push(data.secure_url);
      }
    }

    // Extract sizes and their quantities
    const sizesWithQuantities: { size: string; quantity: number }[] = [];
    getSizeOptions().forEach((size) => {
      const qty = Number(form.get(`size_qty_${size}`));
      if (!isNaN(qty) && qty >= 0) {
        sizesWithQuantities.push({ size, quantity: qty });
      }
    });

    const productData = {
      name: form.get("name"),
      description: {
      about: form.get("description_about"),
      role: form.get("description_role"),
      impact: form.get("description_impact"),
       },

      category,
      subcategory,
      sizes: sizesWithQuantities,
      cost: form.get("cost"),
      tags: (form.get("tags") as string)?.split(",").map((tag) => tag.trim()),
      images: cloudinaryUrls,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "products"), productData);
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product(for images add at least 5 images inc role after that and an impact image at end)</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Product Name</label>
          <input type="text" name="name" className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <div>
  <label className="block mb-1">About Product</label>
  <textarea name="description_about" className="w-full border p-2 rounded" rows={2} />
</div>

<div>
  <label className="block mb-1">Role</label>
  <textarea name="description_role" className="w-full border p-2 rounded" rows={2} />
</div>

<div>
  <label className="block mb-1">Impact</label>
  <textarea name="description_impact" className="w-full border p-2 rounded" rows={2} />
</div>

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
          <label className="block mb-1">Size & Quantity</label>
          <div className="space-y-2">
            {getSizeOptions().map((size) => (
              <div key={size} className="flex items-center gap-2">
                <label className="w-16">{size}</label>
                <input
                  type="number"
                  name={`size_qty_${size}`}
                  min="0"
                  placeholder="Qty"
                  className="border p-2 rounded w-32"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1">Cost (in ₹)</label>
          <input
            type="number"
            name="cost"
            step="0.01"
            min="0"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            placeholder="e.g., summer, casual"
            className="w-full border p-2 rounded"
          />
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

          {loading && <p className="text-sm text-gray-500">Uploading...</p>}

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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading Images..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
