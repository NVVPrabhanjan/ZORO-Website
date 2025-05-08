"use client";
import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../lib/api";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      setAddingToCart(productId);
      await addToCart(productId, 1);

      // Show subtle notification instead of alert
      const productName = products.find((p) => p._id === productId)?.name;
      const notification = document.createElement("div");
      notification.className =
        "fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50";
      notification.textContent = `${productName} added to cart`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert(error);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-700"
            >
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-gray-100 mb-2 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-2xl font-bold text-indigo-400">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={addingToCart === product._id}
                    className={`
                      px-4 py-2 rounded-full font-medium text-white 
                      ${
                        addingToCart === product._id
                          ? "bg-indigo-700 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
                      } 
                      transition-colors duration-200 flex items-center space-x-1
                    `}
                  >
                    {addingToCart === product._id ? (
                      <>
                        <span className="block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        <span className="ml-2">Adding...</span>
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}