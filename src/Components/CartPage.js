// CartPage.jsx
import React from "react";
import { useCart } from "../Context/CartContext"

const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    return (

        <div className="bg-gray-100 min-h-screen p-6">
            <header className="bg-blue-500 text-white text-center py-4">
                <h1 className="text-3xl font-bold">Your Cart</h1>
            </header>
            <main className="container mx-auto mt-6">
                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cart.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-lg p-4"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h3 className="text-xl font-semibold mt-2 text-gray-800">
                                    {product.name}
                                </h3>
                                <p className="text-lg font-bold text-blue-500">
                                    {product.price}
                                </p>
                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
                                >
                                    Remove
                                </button>
                                <button
                                    
                                    className="bg-green-700 text-white px-4 ml-6 py-2 rounded mt-4 hover:bg-green-900"
                                >
                                    Checkout
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">Your cart is empty.</p>
                )}
            </main>
        </div>
    );
};

export default CartPage;
