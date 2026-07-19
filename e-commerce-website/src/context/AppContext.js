"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext(null);

const fallbackProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-yxa1lL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
    price: 695.0,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_.jpg",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168.0,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and manufactured in New York, USA.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_.jpg",
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description: "Classic Created Wedding Engagement Ring. Gift to someone you love.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_.jpg",
    rating: { rate: 3.0, count: 400 }
  },
  {
    id: 8,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64.0,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBJVJIGmL._AC_SL1500_.jpg",
    rating: { rate: 3.3, count: 203 }
  }
];

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`localStorage.setItem failed for key "${key}":`, e);
    }
  };

  const safeRemoveItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`localStorage.removeItem failed for key "${key}":`, e);
    }
  };

  // User auth and profile state
  const [user, setUser] = useState({
    name: "Alex Mercer",
    email: "alex.mercer@luxemart.com",
    phone: "+91 98765 43210",
    address: "123 Premium Lane, Mumbai, Maharashtra, 400001"
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Load products, cart, orders, and user on mount
  const fetchCatalog = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    fetch("https://fakestoreapi.com/products", { signal: controller.signal })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error("Failed to fetch products from API");
        }
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: Number(item.price),
          description: item.description,
          category: item.category,
          image: item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
          rating: item.rating || { rate: 4.5, count: 120 }
        }));
        setProducts(formatted);
        safeSetItem("e_commerce_products", JSON.stringify(formatted));
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.warn("API Fetch failed or timed out. Falling back to local static catalog data.", err);
        setProducts(fallbackProducts);
        safeSetItem("e_commerce_products", JSON.stringify(fallbackProducts));
        setLoading(false);
      });
  };

  // Load products, cart, orders, and user on mount
  useEffect(() => {
    try {
      const localProducts = localStorage.getItem("e_commerce_products");
      const localCart = localStorage.getItem("e_commerce_cart");
      const localOrders = localStorage.getItem("e_commerce_orders");
      const localUser = localStorage.getItem("e_commerce_user");
      const localIsLoggedIn = localStorage.getItem("e_commerce_logged_in");

      if (localCart) {
        try {
          setCart(JSON.parse(localCart) || []);
        } catch (e) {
          console.error("Error parsing local cart:", e);
          setCart([]);
        }
      }

      if (localOrders) {
        try {
          setOrders(JSON.parse(localOrders) || []);
        } catch (e) {
          console.error("Error parsing local orders:", e);
        }
      } else {
        const defaultOrder = {
          id: "ORD-123456",
          date: new Date().toLocaleDateString(),
          status: "Processing",
          total: 109.95,
          shippingInfo: {
            name: "Alex Mercer",
            email: "alex.mercer@luxemart.com",
            address: "123 Premium Lane",
            city: "Mumbai",
            zipCode: "400001",
            paymentId: "pay_mock_default"
          },
          items: [
            {
              id: 1,
              title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
              price: 109.95,
              quantity: 1,
              category: "men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              selectedSize: "M"
            }
          ]
        };
        setOrders([defaultOrder]);
        safeSetItem("e_commerce_orders", JSON.stringify([defaultOrder]));
      }

      if (localUser) {
        try {
          setUser(JSON.parse(localUser));
        } catch (e) {
          console.error("Error parsing local user:", e);
        }
      }

      if (localIsLoggedIn !== null) {
        try {
          setIsLoggedIn(JSON.parse(localIsLoggedIn));
        } catch (e) {
          console.error("Error parsing login state:", e);
        }
      }

      if (localProducts) {
        try {
          const parsed = JSON.parse(localProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
            setLoading(false);
          } else {
            throw new Error("Local products list empty");
          }
        } catch (e) {
          console.error("Error parsing local products:", e);
          fetchCatalog();
        }
      } else {
        fetchCatalog();
      }
    } catch (err) {
      console.error("Initialization error in AppContext hook:", err);
      setProducts(fallbackProducts);
      setLoading(false);
    }
  }, []);

  // Save Cart to local storage when changed
  useEffect(() => {
    if (cart.length > 0 || localStorage.getItem("e_commerce_cart")) {
      safeSetItem("e_commerce_cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Save Orders to local storage when changed
  useEffect(() => {
    if (orders.length > 0 || localStorage.getItem("e_commerce_orders")) {
      safeSetItem("e_commerce_orders", JSON.stringify(orders));
    }
  }, [orders]);

  // Save user profile to local storage when changed
  useEffect(() => {
    safeSetItem("e_commerce_user", JSON.stringify(user));
  }, [user]);

  // Save isLoggedIn to local storage when changed
  useEffect(() => {
    safeSetItem("e_commerce_logged_in", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Add Product (Admin mock feature requested by user: "product should be additable")
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      rating: { rate: 5.0, count: 1 }
    };
    const updatedProducts = [productWithId, ...products];
    setProducts(updatedProducts);
    safeSetItem("e_commerce_products", JSON.stringify(updatedProducts));
  };

  // Edit Product
  const editProduct = (id, updatedFields) => {
    const updatedProducts = products.map((prod) =>
      prod.id === Number(id) ? { ...prod, ...updatedFields } : prod
    );
    setProducts(updatedProducts);
    safeSetItem("e_commerce_products", JSON.stringify(updatedProducts));

    // Update in Cart if present
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === Number(id)
          ? { ...item, ...updatedFields, price: Number(updatedFields.price) || item.price }
          : item
      )
    );
  };

  // Delete Product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((prod) => prod.id !== Number(id));
    setProducts(updatedProducts);
    safeSetItem("e_commerce_products", JSON.stringify(updatedProducts));

    // Remove from Cart as well
    setCart((prevCart) => prevCart.filter((item) => item.id !== Number(id)));
  };

  // Add to Cart
  const addToCart = (product, qty = 1, selectedSize = null) => {
    const cartId = `${product.id}-${selectedSize || "default"}`;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartId === cartId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { ...product, cartId, quantity: qty, selectedSize }];
    });
    setCartDrawerOpen(true);
  };

  // Update Cart Quantity
  const updateCartQuantity = (cartId, qty) => {
    if (qty <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartId === cartId ? { ...item, quantity: qty } : item))
    );
  };

  // Remove from Cart
  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    safeRemoveItem("e_commerce_cart");
  };

  // Place Order
  const placeOrder = (shippingInfo) => {
    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      shippingInfo,
      status: "Processing"
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    clearCart();
    return newOrder;
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        orders,
        loading,
        error,
        user,
        isLoggedIn,
        addProduct,
        editProduct,
        deleteProduct,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateUserProfile,
        login,
        logout,
        cartDrawerOpen,
        setCartDrawerOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
