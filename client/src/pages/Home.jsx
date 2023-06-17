import React, {useEffect, useState} from 'react';
import axios from "axios";
import Hero from "../Components/Hero";
import ProductCard from "../Components/productCard";
import Service from "../Components/service";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
        getTotal();
    }, []);

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const getTotal = async () => {
        try {
            const { data } = await axios.get("/products-count");
            setTotal(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadProducts = async () => {
        try {
            const { data } = await axios.get(`/list-products/${page}`);
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/list-products/${page}`);
            setProducts([...products, ...data]);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const arr = [...products];
    const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

    return (
        <div>
            <Hero/>
            <div className="flex flex-col text-center w-full mb-20">
                <h2 className="text-xs text-yellow-500 tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">MOST POPULAR PRODUCTS</h1>
            </div>
            <div className="m-2">
            <div className="grid grid-cols-3">
                {products?.map((p) => (
                    <div className="lg:w-1/4 md:w-1/2 m-3 p-5 w-full" key={p._id}>
                        <ProductCard p={p} />
                    </div>
                ))}
            </div>

            <div className="container text-center p-5">
                {products && products.length < total && (
                    <button
                        className="btn btn-warning btn-lg col-md-6"
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                        }}
                    >
                        {loading ? "Loading..." : "Load more"}
                    </button>
                )}

                <Service />
            </div>
            </div>
        </div>
    );
};

export default Home;