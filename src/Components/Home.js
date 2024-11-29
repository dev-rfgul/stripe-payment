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
        description: "Stylish smartwatch with multiple fitness features.",
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
        <div className="bg-gray-100 min-h-screen p-6">
            <header className="bg-blue-500 text-white text-center py-4">
                <h1 className="text-3xl font-bold">Welcome to ShopSmart</h1>
            </header>
            <main className="container mx-auto mt-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h3 className="text-xl font-semibold mt-2 text-gray-800">
                                {product.name}
                            </h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-lg font-bold text-blue-500">{product.price}</p>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomePage;
