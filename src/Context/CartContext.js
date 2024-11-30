import React, { createContext, useState, useContext, useEffect } from "react";

// Create CartContext
const CartContext = createContext();

// Custom hook to access cart data
export const useCart = () => {
    return useContext(CartContext);
};

// CartProvider component to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Initialize cart from localStorage if available
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Update localStorage whenever the cart state changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Function to add an item to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if the item is already in the cart
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                // If it exists, update the quantity
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // If it's new, add it to the cart
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};