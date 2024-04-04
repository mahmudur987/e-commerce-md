// CartContext.js
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart from local storage on component mount
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart to local storage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const { id, name, brand_name, category_name, image, description, price, } = product || {}
        if (product) {
            toast.success("Add to cart")
        }
        const cartProduct = {
            id, brand_name, category_name, name, price, description, image, quantity: 1
        }
        setCart([...cart, cartProduct]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // const clearCart = () => {
    //     setCart([]);
    // };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

