import React, {useEffect, useState} from 'react';
import AdminMenu from "../../Components/AdminMenu";
import ProductCardHorizontal from "../../Components/ProductHorizantal"

import { Select } from "antd";
import {useAuth} from "../../context/auth";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const AdminOrders = () => {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ]);
    const [changedStatus, setChangedStatus] = useState("");

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/all-orders");
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = async (orderId, value) => {
        setChangedStatus(value);
        try {
            const { data } = await axios.put(`/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='container m-10 flex flex-inline space-x-8'>
            <div className="w-1/6">
                <AdminMenu/>
            </div>
            <div className="w-5/6">
                <div className="flex flex-col max-w-lg text-center w-full mb-5 ml-10 ">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">All Orders</h1>
                </div>

                {orders?.map((o, i) => {
                    return (
                        <div
                            key={o._id}
                            className="border bg-base-200 rounded mb-5"
                        >
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Buyer</th>
                                    <th scope="col">Ordered</th>
                                    <th scope="col">Payment</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                        <Select
                                            bordered={false}
                                            onChange={(value) => handleChange(o._id, value)}
                                            defaultValue={o?.status}
                                        >
                                            {status.map((s, i) => (
                                                <Option key={i} value={s}>
                                                    {s}
                                                </Option>
                                            ))}
                                        </Select>
                                    </td>
                                    <td>{o?.buyer?.name}</td>
                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                    <td>{o?.products?.length} products</td>
                                </tr>
                                </tbody>
                            </table>

                            <div className="container">
                                <div className="row m-2">
                                    {o?.products?.map((p, i) => (
                                        <ProductCardHorizontal key={i} p={p} remove={false} />
                                    ))}
                                </div>
                            </div>

                        </div>
                        )})}
            </div>
        </div>
    );
};

export default AdminOrders;