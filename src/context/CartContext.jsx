import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../components/Api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const res = await api.get("cart", { headers: { Token: `Bearer ${token}` } });
      const data = res.data?.data;
      if (Array.isArray(data?.cart_items)) {
        setCartItems(data.cart_items);
      }
    } catch (err) {
      console.log("Cart fetch failed:", err);
    }
  };

  // Check if product is in cart
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.product.id === productId);
  };

  // Add item to cart
  const addToCart = async (productId, variantId = null, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to add items to cart");
      }

      await api.post('cart/add_item', {
        product_id: productId,
        variant_id: variantId,
        qty: quantity,
      }, { headers: { Token: `Bearer ${token}` } });

      // Refresh cart after adding
      await fetchCart();
      return true;
    } catch (err) {
      throw err;
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await api.delete(`cart/remove_item/${cartItemId}`, {
        headers: { Token: `Bearer ${token}` }
      });

      // Refresh cart after removing
      await fetchCart();
    } catch (err) {
      console.log("Remove from cart failed:", err);
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (cartItemId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await api.patch(`cart/update_item/${cartItemId}`, {
        qty: quantity
      }, { headers: { Token: `Bearer ${token}` } });

      // Refresh cart after updating
      await fetchCart();
    } catch (err) {
      console.log("Update cart item failed:", err);
    }
  };

  // Initialize cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cartItems,
    fetchCart,
    isProductInCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
