import {useState,useEffect} from 'react';
import {useAuth} from "../../context/auth";
import axios from 'axios';
import toast from 'react-hot-toast'
import UserMenu from "../../Components/UserMenu";

const UserProfile = () => {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (auth?.user) {
            const { name, email, address } = auth.user;
            setName(name);
            setEmail(email);
            setAddress(address);
        }
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/profile", {
                name,
                password,
                address,
            });

            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data });
                // local storage update
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='container m-10 flex flex-inline space-x-8'>
            <div className="w-2/6">
                <UserMenu/>
            </div>
            <div className=' w-4/6'>
                <div className="flex flex-col max-w-lg text-center w-full mb-20 ml-20 ">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Profile</h1>
                </div>
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-first-name">
                                User Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name" type="text" placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus={true}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                email
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name" type="email" placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={true}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Password
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-password" type="password" placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd
                                    like</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-city">
                                Address
                            </label>
                            <textarea
                                id="message" rows="4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                 type="text" placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                    </div>
                    <button className="btn btn-primary m-2 p-2">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;