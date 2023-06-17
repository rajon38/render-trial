import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useCart} from "../context/cart";
import { Badge } from "antd";
import {useParams} from "react-router-dom";
import {FaCheck, FaRegClock, FaRocket, FaTimes, FaWarehouse} from "react-icons/fa";
import moment from "moment";
import toast from "react-hot-toast";
import ProductCard from "../Components/productCard";
import {BaseURL} from "../context/BaseURL";

const ProductView = () => {
    const [cart, setCart] = useCart();
    // state
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    // hooks
    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProduct();
    }, [params?.slug]);

    const loadProduct = async (req, res) => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id, data.category._id);
        } catch (err) {
            console.log(err);
        }
    };

    const loadRelated = async (productId, categoryId) => {
        try {
            const { data } = await axios.get(
                `/related-products/${productId}/${categoryId}`
            );
            setRelated(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <Badge.Ribbon text={`${product?.sold} sold`} color="red">
                        <Badge.Ribbon
                            text={`${product?.quantity >= 1
                                ? `${product?.quantity - product?.sold} in stock`
                                : "Out of stock"
                            }`}
                            placement="start"
                            color="green"
                        >
                    <img alt={product.name} className=" w-full lg:h-auto max-h-[600px] h-64 object-cover object-center rounded"
                         src={`${BaseURL}/product/photo/${product._id}`}/>
                        </Badge.Ribbon>
                    </Badge.Ribbon>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize">{product?.category?.name}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
                            <p className="leading-relaxed">{product?.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex space-x-6">
                                    <p className="capitalize">
                                        <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                                    </p>
                                    <p>
                                        {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                                        {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                                    </p>

                                    <p>
                                        <FaWarehouse /> Available {product?.quantity - product?.sold}
                                    </p>

                                    <p>
                                        <FaRocket /> Sold {product.sold}
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                                <button
                                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => {
                                    setCart([...cart, product]);
                                    localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                    toast.success("Added to cart");
                                }}>Add to Cart
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Related PRODUCTS</h1>
            </div>

            <div className="grid grid-cols-3">
                {related?.length < 1 && <p>Nothing found</p>}
                {related?.map((p) => (
                    <ProductCard p={p} key={p._id} />
                ))}
            </div>
        </section>
    );
};

export default ProductView;