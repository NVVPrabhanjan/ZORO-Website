"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// Define TypeScript interfaces for better type safety
interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductFormData {
  productId: string;
  name: string;
  description: string;
  price: string;
  image?: FileList;
}

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    formState: { errors }
  } = useForm<ProductFormData>();

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<Product[]>("http://localhost:4000/api/v1/product/allproducts");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("productId", data.productId);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await axios.post("http://localhost:4000/api/v1/product/create", formData);
      toast.success("Product created successfully");
      reset();
      fetchProducts();
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/v1/product/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.productId);
    setValue("productId", product.productId);
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("price", product.price.toString());
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      await axios.put(`http://localhost:4000/api/v1/product/${editingId}`, {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
      });
      toast.success("Product updated successfully");
      reset();
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Admin Product Management</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            {editingId ? "Edit Product" : "Create New Product"}
          </h2>
          
          <form
            onSubmit={handleSubmit(editingId ? handleUpdate : onSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-300 mb-1">Product ID</label>
              <input
                placeholder="Enter product ID"
                {...register("productId", { 
                  required: "Product ID is required",
                  pattern: {
                    value: /^[a-zA-Z0-9-_]+$/,
                    message: "Product ID can only contain letters, numbers, hyphens and underscores"
                  }
                })}
                className="bg-gray-700 border border-gray-600 text-white rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!!editingId}
              />
              {errors.productId && (
                <p className="text-red-400 text-sm mt-1">{errors.productId.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Product Name</label>
              <input 
                placeholder="Enter product name" 
                {...register("name", { required: "Product name is required" })} 
                className="bg-gray-700 border border-gray-600 text-white rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                placeholder="Enter product description"
                {...register("description", { required: "Description is required" })}
                className="bg-gray-700 border border-gray-600 text-white rounded p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter price"
                {...register("price", { 
                  required: "Price is required",
                  min: {
                    value: 0.01,
                    message: "Price must be greater than 0"
                  }
                })}
                className="bg-gray-700 border border-gray-600 text-white rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.price && (
                <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
            
            {!editingId && (
              <div>
                <label className="block text-gray-300 mb-1">Product Image</label>
                <input
                  type="file"
                  {...register("image", { required: "Product image is required" })}
                  accept="image/*"
                  className="bg-gray-700 border border-gray-600 text-white rounded p-2 w-full file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
                {errors.image && (
                  <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
                )}
              </div>
            )}
            
            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center justify-center min-w-24"
              >
                {isSubmitting ? (
                  <span>Loading...</span>
                ) : editingId ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Products List</h2>
        
        {isLoading && !products.length ? (
          <div className="text-center py-8 text-gray-300">Loading products...</div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <p className="text-gray-400">No products found. Create your first product above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.productId} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                      <p className="text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                      <p className="text-lg font-semibold text-blue-400 mb-3">₹{product.price.toFixed(2)}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded flex-1 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product.productId)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex-1 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;