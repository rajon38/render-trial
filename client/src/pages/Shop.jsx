import React, {useEffect, useState} from 'react';
import axios from "axios";
import { prices } from "../prices";
import {Radio} from "antd"
import ProductCard from "../Components/productCard";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [radio, setRadio] = useState([]); // radio

    useEffect(() => {
        if (!checked.length || !radio.length) loadProducts();
    }, []);

    useEffect(() => {
        if (checked.length || radio.length) loadFilteredProducts();
    }, [checked, radio]);

    const loadFilteredProducts = async () => {
        try {
            const { data } = await axios.post("/filtered-products", {
                checked,
                radio,
            });
            console.log("filtered products => ", data);
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadCatgories();
    }, []);

    const loadCatgories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheck = (value, id) => {
        console.log(value, id);
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    return (
        < div className="container mx-auto m-15 ">
            <div className="flex flex-col text-center w-full mb-20 mt-5">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Happy Shopping</h1>
            </div>

            <div className="flex flex-inline justify-between">
                <div className="form-control w-1/6">
                    <h2 className="p-3 mt-2 mb-2 h4 text-center capitalize space-x-2">
                        Filter by Price
                    </h2>
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                        {prices?.map((p) => (
                            <div key={p._id} className="ml-2">
                                <Radio value={p.array}>{p.name}</Radio>
                            </div>
                        ))}
                    </Radio.Group>

                    <div className="p-5 pt-0">
                        <button
                            className="btn btn-outline-secondary pr-8 pl-8 mt-8"
                            onClick={() => window.location.reload()}
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="body-font form-control w-5/6">
                    <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                        {products?.length} Products
                    </h2>
                    <div
                        className=" overflow-scroll flex"
                    >
                        {products?.map((p) => (
                            <div className=" lg:w-1/2 md:w-1/2 m-3 p-5 w-full" key={p._id}>
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
            </div>


            </div>


        </div>
    );
};

export default Shop;