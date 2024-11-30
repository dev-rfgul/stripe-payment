// CartPage.jsx
import React, { useState } from "react";
import {useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { useCart } from "../Context/CartContext"
const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    const navigate=useNavigate();

    return (
        <div className="bg-gradient-to-t from-blue-50 to-white min-h-screen p-6">
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold tracking-tight">Your Cart</h1>
                <p className="mt-2 text-lg">Review and manage the items in your cart</p>
            </header>
            <main className="container mx-auto mt-10">
                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {cart.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-60 object-cover rounded-t-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                                />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                                    <p className="text-lg text-gray-600 mt-2">{product.description}</p>
                                    <p className="text-xl font-semibold text-blue-600 mt-4">{product.price}</p>
                                    <div className="flex items-center justify-between mt-6">
                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-200 ease-in-out"
                                        >
                                            Remove
                                        </button>
                                        <button
                                        onClick={() => navigate("/checkout")}
                                            className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition-all duration-200 ease-in-out"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-200 ease-in-out"
                        >
                            Go to Shop
                        </button>
                    </div>
                )}
            </main>
            <footer className="text-center text-gray-500 mt-10">
                <p>&copy; 2024 ShopSmart - All rights reserved</p>
            </footer>
        </div>
    );

};

export default CartPage;
