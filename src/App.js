// App.jsx
import React from "react";
import { CartProvider, useCart } from "./Context/CartContext";
import HomePage from "./Components/Home";
import CartPage from "./Components/CartPage";
import CheckoutPage from "./Components/Checkout";


const Navbar = ({ setPage }) => {
    const { cart } = useCart();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <button
                onClick={() => setPage("home")}
                className="hover:underline font-semibold"
            >
                Home
            </button>
            <button
                onClick={() => setPage("cart")}
                className="hover:underline font-semibold relative"
            >
                Cart
                {cart.length > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                        {cart.length}
                    </span>
                )}
            </button>
            <button
                onClick={() => setPage("checkout")}
                className="hover:underline font-semibold"
            >
                Checkout
            </button>
        </nav>
    );
};

const App = () => {
    const [page, setPage] = React.useState("home");

    return (
        <CartProvider>
            <div>
                <Navbar setPage={setPage} />
                {page === "home" && <HomePage />}
                {page === "cart" && <CartPage />}
                {page === "checkout" && <CheckoutPage />}
            </div>
        </CartProvider>
    );
};

export default App;
