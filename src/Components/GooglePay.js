import React, { useEffect } from "react";

const GooglePayButton = () => {
    const GPAY_BUTTON_CONTAINER_ID = "gpay-container";

    const merchantInfo = {
        merchantId: "12345678901234567890",
        merchantName: "Example Merchant",
    };

    const baseGooglePayRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: "CARD",
                parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                },
            },
        ],
        merchantInfo,
    };

    let paymentsClient = null;

    const getGooglePaymentsClient = () => {
        if (!paymentsClient) {
            paymentsClient = new window.google.payments.api.PaymentsClient({
                environment: "TEST",
                merchantInfo,
            });
        }
        return paymentsClient;
    };

    const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

    const renderGooglePayButton = () => {
        const button = getGooglePaymentsClient().createButton({
            onClick: onGooglePaymentButtonClicked,
        });
        document.getElementById(GPAY_BUTTON_CONTAINER_ID).appendChild(button);
    };

    const onGooglePayLoaded = () => {
        const req = deepCopy(baseGooglePayRequest);

        getGooglePaymentsClient()
            .isReadyToPay(req)
            .then((res) => {
                if (res.result) {
                    renderGooglePayButton();
                } else {
                    console.error("Google Pay is not ready for this user.");
                }
            })
            .catch(console.error);
    };

    const onGooglePaymentButtonClicked = () => {
        const req = {
            ...deepCopy(baseGooglePayRequest),
            transactionInfo: {
                countryCode: "US",
                currencyCode: "USD",
                totalPriceStatus: "FINAL",
                totalPrice: (Math.random() * 999 + 1).toFixed(2),
            },
        };

        console.log("Request:", req);

        getGooglePaymentsClient()
            .loadPaymentData(req)
            .then((res) => {
                console.log("Response:", res);
                const paymentToken = res.paymentMethodData.tokenizationData.token;
                console.log("Payment Token:", paymentToken);
            })
            .catch(console.error);
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://pay.google.com/gp/p/js/pay.js";
        script.async = true;
        script.onload = onGooglePayLoaded;
        document.body.appendChild(script);

        return () => {
            const gpayScript = document.querySelector("script[src='https://pay.google.com/gp/p/js/pay.js']");
            if (gpayScript) gpayScript.remove();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div id={GPAY_BUTTON_CONTAINER_ID} className="my-4"></div>
            <p className="text-gray-700 text-center">Transaction info and errors will be logged to the console.</p>
        </div>
    );
};

export default GooglePayButton;
