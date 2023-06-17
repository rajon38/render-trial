import {useState,useEffect} from 'react';
import {useAuth} from "../../context/auth";
import axios from "axios"
import UserMenu from "../../Components/UserMenu";
import moment from "moment"
import ProductCardHorizontal from "../../Components/ProductHorizantal"
const UserOrders = () => {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/orders");
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container m-10 flex flex-inline space-x-10">
            <div className="w-1/6">
                <UserMenu/>
            </div>
            <div className=" w-5/6">
                <div className="flex flex-col max-w-lg text-center w-full mb-20 ">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Orders</h1>
                </div>
                {orders?.map((o, i) => {
                    return (
                        <div
                            key={o._id} className="border shadow-lg bg-base-200 rounded w-full">
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
                                    <td>{o?.status}</td>
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
                    );
                })}
            </div>
        </div>
    );
};

export default UserOrders;