import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import SideBar from "./sidebar";
import axios from "axios";
import { AuthData } from "../store/models/authdata";
import { redirect, useNavigate } from "react-router-dom";

// import classes from './header.module.css';


export default function MyLayout(props: { children: any }) {
    const [showAccount, setShowAccount] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);


    const userData: AuthData = JSON.parse(sessionStorage.getItem('authdata') as string);
    const navigate = useNavigate();
    if (userData == null) {
        redirect('/login');
    }

    useEffect(() => {
        console.log(sessionStorage.getItem('authdata'));


        //token check
        axios.post(import.meta.env.VITE_API_URL + "/getuserdata", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }).catch((response) => {
            if (response.response.status === 401) {
                sessionStorage.removeItem('authdata');
                navigate('/login');
            }

        })
    })

    function signOut() {
        const token = userData.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            key: "value"
        };

        axios.post(
            import.meta.env.VITE_API_URL + "/auth/logout",
            bodyParameters,
            config
        ).then(() => {
            // sessionStorage.setItem('authdata', JSON.stringify({ token: '', user: { id: '', email: '', name: '', roleid: '' } }));
            sessionStorage.removeItem('authdata');
            navigate('/login');
        }).catch(console.log);
    }

    return (<>


        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button onClick={() => setShowSideBar(!showSideBar)} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user" onClick={() => { setShowAccount(!showAccount) }}>
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src={userData.user.pathuserpicture ? import.meta.env.VITE_SERVER_URL + "/" + userData.user.pathuserpicture : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} alt="user photo" />
                            </button>
                            <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 block" id="dropdown-user" style={{ position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: showAccount ? "translate(calc(100vw - 210px), 60px)" : "translate(calc(8000px), 60px)", }} data-popper-placement="bottom">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                        {userData.user.name}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                        {userData.user.email}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <button onClick={() => { navigate('/setting') }} className="w-full block  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</button>
                                    </li>
                                    <li>
                                        <button onClick={() => signOut()} className=" w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
        <SideBar sidebarstate={showSideBar} />

        <div className="dark:bg-gray-900 " style={{ height: "calc(100vh )" }}>
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-12    rounded-lg ">
                    {props.children}
                </div>
            </div>
        </div>



    </>
    );
}