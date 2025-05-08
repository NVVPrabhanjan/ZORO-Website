const API_BASE_URL = "http://localhost:4000";

// --- AUTH API ---
export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/user/registerUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/user/loginUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Login failed");

  localStorage.setItem("token", result.token); // Set token here after login
  localStorage.setItem("userId", result.user.id); // store userId if needed

  return result;
}

// --- PRODUCT API ---
export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/product/allproducts`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    console.log(data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/product/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// --- CART API ---
const getToken = () => localStorage.getItem("token");

export const getCart = async () => {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/api/v1/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch cart");
  }

  return res.json();
};

export async function addToCart(productId: string, quantity = 1) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/v1/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add to cart");
  }

  return res.json();
}

export async function removeFromCart(productId: string) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/v1/cart/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to remove item");
  }

  return res.json();
}

export async function clearCart() {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/v1/cart/clear`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to clear cart");
  }

  return res.json();
}
