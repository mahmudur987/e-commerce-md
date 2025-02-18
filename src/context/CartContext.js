// CartContext.js
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product, quantity) => {
    const { id, name, brand_name, category_name, image, description, price } =
      product || {};
    if (!product) {
      return; // Exit early if product is not provided
    }

    const existingProductIndex = cart.findIndex((item) => item.id === id);
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      toast.success("Quantity updated in cart");
    } else {
      // Product doesn't exist in the cart, add it
      const cartProduct = {
        id,
        brand_name,
        category_name,
        name,
        price,
        description,
        image,
        quantity: quantity ? quantity : 1,
      };
      setCart([...cart, cartProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, cartProduct]));
      toast.success("Added to cart");
    }
  };
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updateCart = cart.filter((item) => item.id !== productId);
    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
