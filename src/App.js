import React from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router and routing components
import { CartProvider, useCart } from "./Context/CartContext";
import HomePage from "./Components/Home";
import CartPage from "./Components/CartPage";
import CheckoutPage from "./Components/Checkout";

const Navbar = () => {
    const { cart } = useCart();
    const navigate=useNavigate()

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <a href="/" className="hover:underline font-semibold">Home</a>
            <a href="/cart" className="hover:underline font-semibold relative">
                Cart
                {cart.length > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                        {cart.length}
                    </span>
                )}
            </a>
            <a href="/checkout" className="hover:underline font-semibold">Checkout</a>
        </nav>
    );
};

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Navbar /> {/* The Navbar will be available across all pages */}
                <Routes>
                    {/* Define routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
