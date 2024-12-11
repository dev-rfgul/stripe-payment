

import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
    const { cart } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        address: "",
    });

    const [googlePayClient, setGooglePayClient] = useState(null);

    useEffect(() => {
        const client = new window.google.payments.api.PaymentsClient({
            environment: "TEST", // Use "PRODUCTION" in production
        });
        setGooglePayClient(client);
    }, []);

    const makePayment = async () => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
        const body = { products: cart };
        const headers = { "Content-Type": "application/json" };
        const response = await fetch(`${apiUrl}/create-checkout-session`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        const session = await response.json();
        const result = stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
            console.log(result.error);
        }
    };

    const createGooglePayButton = () => {
        if (googlePayClient) {
            const button = googlePayClient.createButton({
                onClick: handleGooglePay,
            });
            const googlePayButtonContainer = document.getElementById("google-pay-button-container");
            googlePayButtonContainer.appendChild(button);
        }
    };

    const handleGooglePay = async () => {
        const paymentDataRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
                {
                    type: "CARD",
                    parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                            gateway: "example", // Replace with your payment gateway
                            gatewayMerchantId: "exampleMerchantId",
                        },
                    },
                },
            ],
            merchantInfo: {
                merchantName: "Example Merchant",
            },
            transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: totalPrice.toFixed(2),
                currencyCode: "USD",
            },
        };

        const paymentData = await googlePayClient.loadPaymentData(paymentDataRequest);
        console.log("Payment Data:", paymentData);
        // Process payment data on the server here
    };

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

    useEffect(() => {
        createGooglePayButton();
    }, [googlePayClient]);

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
                        <div id="google-pay-button-container" className="mt-4"></div>
                    </>
                ) : (
                    <p className="text-gray-600 text-center">Your cart is empty.</p>
                )}
            </main>
        </div>
    );
};

export default CheckoutPage;
