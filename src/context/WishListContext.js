// WishlistContext.js
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext({});

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        const { id, name, brand_name, category_name, image, description, price } = product || {};
        if (!product) {
            return; // Exit early if product is not provided
        }
        const existingProductIndex = wishlist.findIndex(item => item.id === id);
        if (existingProductIndex !== -1) {

            const updatedWishlist = [...wishlist];
            updatedWishlist[existingProductIndex].quantity += 1;
            setWishlist(updatedWishlist);
            toast.success("Quantity updated in wish list");
        } else {
            const wishListProduct = {
                id, brand_name, category_name, name, price, description, image, quantity: 1
            };
            setWishlist([...wishlist, wishListProduct]);
            toast.success("Added to favorite");
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter(item => item.id !== productId));
    };

    const clearWishlist = () => {
        setWishlist([]);
    };
    const increaseWishListQuantity = (productId) => {
        const updatedWishlist = wishlist.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setWishlist(updatedWishlist);
    };

    const decreaseWishListQuantity = (productId) => {
        const updatedWishlist = wishlist.map(item => {
            if (item.id === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setWishlist(updatedWishlist);
    };
    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist, increaseWishListQuantity, decreaseWishListQuantity }}>
            {children}
        </WishlistContext.Provider>
    );
};

export { WishlistContext, WishlistProvider };

