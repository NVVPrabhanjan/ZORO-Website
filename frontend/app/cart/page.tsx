"use client";
import { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "@/lib/api";

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

export default function Cart() {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId: string) => {
    setRemoving(productId);
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setRemoving(null);
    }
  };

  const handleClear = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart();
        fetchCart();
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const handleWhatsAppOrder = () => {
    // Format the cart items as a message
    const storePhone = "9113548185"; // Replace with your store's WhatsApp number

    let message = "*New Order*\n\n";
    message += "*Order Details:*\n";

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.productId.name} - ₹${
        item.productId.price
      } x ${item.quantity} = ₹${(item.productId.price * item.quantity).toFixed(
        2
      )}\n`;
    });

    message += `\n*Total: ₹${calculateTotal().toFixed(2)}*\n\n`;
    message += "Please confirm my order. Thanks!";

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL and open it
    const whatsappUrl = `https://wa.me/${storePhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          <div className="p-6 sm:p-8 border-b border-gray-700">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
              Shopping Cart
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
          ) : cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-gray-700 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-200 mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-400 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <a
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div>
              <ul className="divide-y divide-gray-700">
                {cart.items.map((item) => (
                  <li
                    key={item.productId._id}
                    className="p-4 sm:p-6 transition-all hover:bg-gray-750"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="aspect-square w-24 sm:w-20 flex-shrink-0 bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-100">
                          {item.productId.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium text-gray-400">
                            Quantity: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between h-full">
                        <div className="text-lg font-bold text-gray-100">
                          ₹
                          {(
                            item.productId.price * item.quantity
                          ).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          })}
                        </div>

                        <button
                          onClick={() => handleRemove(item.productId._id)}
                          disabled={removing === item.productId._id}
                          className={`mt-2 text-sm font-medium ${
                            removing === item.productId._id
                              ? "text-gray-500"
                              : "text-red-400 hover:text-red-300"
                          } transition-colors duration-200 flex items-center`}
                        >
                          {removing === item.productId._id ? (
                            <>
                              <span className="w-3 h-3 mr-1 rounded-full border border-current border-t-transparent animate-spin"></span>
                              Removing...
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Remove
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-700 p-6">
                <div className="mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-300">
                      ₹
                      {calculateTotal().toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-dashed border-gray-700">
                    <span className="text-lg font-bold text-gray-200">
                      Total
                    </span>
                    <span className="text-lg font-bold text-blue-400">
                      ₹
                      {calculateTotal().toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 flex-grow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order via WhatsApp
                  </button>
                  <button
                    onClick={handleClear}
                    className="py-3 px-6 rounded-lg font-medium border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}