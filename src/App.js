// App.jsx
import React from "react";
import { CartProvider } from "./Context/CartContext"
import HomePage from "./Components/Home";
import CartPage from "./Components/CartPage";

const App = () => {
    const [page, setPage] = React.useState("home");

    return (
        <CartProvider>
            <div>
                <nav className="bg-gray-800 text-white p-4 flex justify-between">
                    <button onClick={() => setPage("home")} className="hover:underline">
                        Home
                    </button>
                    <button onClick={() => setPage("cart")} className="hover:underline">
                        Cart
                    </button>
                </nav>
                {page === "home" ? <HomePage /> : <CartPage />}
            </div>
        </CartProvider>
    );
};

export default App;
