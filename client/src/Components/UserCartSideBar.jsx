import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/auth";
import {useCart} from "../context/cart";
import DropIn from "braintree-web-drop-in-react";

const UserCartSideBar = () => {
    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    // state
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    // hooks
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.token) {
            getClientToken();
        }
    }, [auth?.token]);

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/braintree/token");
            // console.log(data)
            setClientToken(data.clientToken);
        } catch (err) {
            console.log(err);
        }
    };

    const cartTotal = () => {
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const handleBuy = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            //   console.log("nonce => ", nonce);
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                cart,
            });
            console.log("handle buy response => ", data);
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment successful");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{cartTotal()}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$0.00</p>
            </div>
            <hr className="my-4"/>
            <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">{cartTotal()}</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                </div>
            </div>
            {auth?.user?.address ? (
                <>
                    <div className="mb-3">
                        <hr />
                        <h4>Delivery address:</h4>
                        <h5>{auth?.user?.address}</h5>
                    </div>
                    <button
                        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                        onClick={() => navigate("/dashboard/user/profile")}
                    >
                        Update address
                    </button>
                </>
            ) : (
                <div className="mb-3">
                    {auth?.token ? (
                        <button
                            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                            onClick={() => navigate("/dashboard/user/profile")}
                        >
                            Add delivery address
                        </button>
                    ) : (
                        <button
                            className="mt-6 w-full rounded-md bg-yellow-500 py-1.5 font-medium text-blue-50 hover:bg-yellow-600"
                            onClick={() =>
                                navigate("/login", {
                                    state: "/cart",
                                })
                            }
                        >
                            Login to checkout
                        </button>
                    )}
                </div>
            )}
            <div className="mt-3">
                {!clientToken || !cart?.length ? (
                    ""
                ) : (
                    <>
                        <DropIn
                            options={{
                                authorization: clientToken,
                                paypal: {
                                    flow: "vault",
                                },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                        />
                        <button
                            onClick={handleBuy}
                            className="mt-6 w-full rounded-md bg-yellow-500 py-1.5 font-medium text-blue-50 hover:bg-yellow-600"
                            disabled={!auth?.user?.address || !instance || loading}
                        >
                            {loading ? "Processing..." : "Buy"}
                        </button>
                    </>
                )}
            </div>
        </div>
    )};

export default UserCartSideBar;


