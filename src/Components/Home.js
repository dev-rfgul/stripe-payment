import { useCart } from "../Context/CartContext";
// App.jsx
import React from "react";

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: "$120",
        description: "High-quality wireless headphones with noise cancellation.",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    },
    {
        id: 2,
        name: "Smartwatch",
        price: "$80",
        description: "Stylish smartwatch with multiple good fitness features.",
        image: "https://images.unsplash.com/photo-1722153768985-9286321b8769?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Gaming Laptop",
        price: "$1500",
        description: "Powerful gaming laptop with high-performance graphics.",
        image: "https://images.unsplash.com/photo-1641623410264-948701015656?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: "$50",
        description: "Compact Bluetooth speaker with rich sound quality.",
        image: "https://plus.unsplash.com/premium_photo-1682125804795-b09be6ee57a5?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        name: "Smartphone",
        price: "$699",
        description: "Latest smartphone with an advanced camera and features.",
        image: "https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];



const HomePage = () => {
    const { addToCart } = useCart();

    return (
        <div className="bg-gradient-to-t from-blue-50 to-white min-h-screen p-6">
            <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-extrabold tracking-tight">Welcome to ShopSmart</h1>
                <p className="mt-2 text-lg">Your favorite online shopping destination</p>
            </header>
            <main className="container mx-auto mt-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-60 object-cover rounded-t-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                            />
                            <div className="p-4">
                                <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                                <p className="text-xl font-semibold text-blue-600 mt-4">{product.price}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-blue-600 text-white w-full py-2 rounded mt-6 hover:bg-blue-700 transition-all duration-200 ease-in-out"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="text-center text-gray-500 mt-10">
                <p>&copy; 2024 ShopSmart - All rights reserved</p>
            </footer>
        </div>
    );
    
};

export default HomePage;
