// CheckoutPage.jsx
import React, { useState } from "react";
import { useCart } from "../Context/CartContext";

const CheckoutPage = () => {
    const { cart } = useCart();
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        address: "",
    });

    const show = () => {
        const stripeApiKey = process.env.REACT_APP_STRIPE_API_KEY;

        console.log('Stripe API Key:', stripeApiKey);

    }

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleCheckout = () => {
        if (userDetails.name && userDetails.email && userDetails.address) {
            setOrderPlaced(true);
        } else {
            alert("Please fill in all the required details!");
        }
    };

    const totalPrice = cart.reduce((total, product) => {
        const priceNumber = parseFloat(product.price.replace("$", "")); // Remove $ for calculation
        return total + priceNumber;
    }, 0);

    if (orderPlaced) {
        return (
            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold text-green-600">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-700 mt-4">
                    Thank you, {userDetails.name}. Your order will be delivered to:
                </p>
                <p className="font-semibold text-gray-800">{userDetails.address}</p>
                <p className="mt-2">You will receive a confirmation email at:</p>
                <p className="font-semibold text-gray-800">{userDetails.email}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <header className="bg-blue-500 text-white text-center py-4">
                <h1 className="text-3xl font-bold">Checkout</h1>
            </header>
            <main className="container mx-auto mt-6">
                {cart.length > 0 ? (
                    <>
                        <h2 className="text-xl font-semibold text-gray-700">Cart Summary</h2>
                        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                            {cart.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex justify-between items-center mb-4"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {product.name}
                                        </p>
                                        <p className="text-gray-600">{product.price}</p>
                                    </div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                </div>
                            ))}
                            <p className="font-bold text-gray-800 text-right">
                                Total: ${totalPrice.toFixed(2)}
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700 mt-8">
                            Shipping Details
                        </h2>
                        <button onClick={show}
                            className="bg-green-500 w-11 h-11">hello world </button>
                        <form className="bg-white shadow-md rounded-lg p-4 mt-4">
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userDetails.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="john.doe@example.com"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium">
                                    Shipping Address
                                </label>
                                <textarea
                                    name="address"
                                    value={userDetails.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="123 Main Street, City, Country"
                                    rows="3"
                                    required
                                />
                            </div>
                        </form>
                        <button
                            onClick={handleCheckout}
                            className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600 w-full"
                        >
                            Confirm Order
                        </button>
                    </>
                ) : (
                    <p className="text-gray-600 text-center">Your cart is empty.</p>
                )}
            </main>
        </div>
    );
};

export default CheckoutPage;
