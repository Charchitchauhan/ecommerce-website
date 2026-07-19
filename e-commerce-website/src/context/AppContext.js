"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // User auth and profile state
  const [user, setUser] = useState({
    name: "Alex Mercer",
    email: "alex.mercer@luxemart.com",
    phone: "+91 98765 43210",
    address: "123 Premium Lane, Mumbai, Maharashtra, 400001"
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Load products, cart, orders, and user on mount
  useEffect(() => {
    const localProducts = localStorage.getItem("e_commerce_products");
    const localCart = localStorage.getItem("e_commerce_cart");
    const localOrders = localStorage.getItem("e_commerce_orders");
    const localUser = localStorage.getItem("e_commerce_user");
    const localIsLoggedIn = localStorage.getItem("e_commerce_logged_in");

    if (localCart) {
      setCart(JSON.parse(localCart));
    }
    if (localOrders) {
      setOrders(JSON.parse(localOrders));
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
      localStorage.setItem("e_commerce_orders", JSON.stringify([defaultOrder]));
    }
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    if (localIsLoggedIn !== null) {
      setIsLoggedIn(JSON.parse(localIsLoggedIn));
    }

    if (localProducts) {
      setProducts(JSON.parse(localProducts));
      setLoading(false);
    } else {
      // Fetch from API
      fetch("https://fakestoreapi.com/products")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch products from API");
          }
          return res.json();
        })
        .then((data) => {
          // Add a default category field if not present, normalize structure
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
          localStorage.setItem("e_commerce_products", JSON.stringify(formatted));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, []);

  // Save Cart to local storage when changed
  useEffect(() => {
    if (cart.length > 0 || localStorage.getItem("e_commerce_cart")) {
      localStorage.setItem("e_commerce_cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Save Orders to local storage when changed
  useEffect(() => {
    if (orders.length > 0 || localStorage.getItem("e_commerce_orders")) {
      localStorage.setItem("e_commerce_orders", JSON.stringify(orders));
    }
  }, [orders]);

  // Save user profile to local storage when changed
  useEffect(() => {
    localStorage.setItem("e_commerce_user", JSON.stringify(user));
  }, [user]);

  // Save isLoggedIn to local storage when changed
  useEffect(() => {
    localStorage.setItem("e_commerce_logged_in", JSON.stringify(isLoggedIn));
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
    localStorage.setItem("e_commerce_products", JSON.stringify(updatedProducts));
  };

  // Edit Product
  const editProduct = (id, updatedFields) => {
    const updatedProducts = products.map((prod) =>
      prod.id === Number(id) ? { ...prod, ...updatedFields } : prod
    );
    setProducts(updatedProducts);
    localStorage.setItem("e_commerce_products", JSON.stringify(updatedProducts));

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
    localStorage.setItem("e_commerce_products", JSON.stringify(updatedProducts));

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
    localStorage.removeItem("e_commerce_cart");
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
