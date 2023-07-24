import { useNavigate } from "react-router-dom";

import logo from "../assets/images/CypiralLogo.png"
import { useEffect } from "react";


export default function MyRedirect(props: any) {
    const navigate = useNavigate();


    useEffect(() => { setTimeout(() => { navigate('/login') }, 2000); }, []);



    return (<>
        <div className="flex flex-col items-center justify-center h-screen bg-white">

            <div className="flex flex-col items-center">
                <img src={logo} alt="" className="h-auto w-56" />
                <br />
                <div className="flex gap-5">
                    <div className="h-5 w-5 opacity-20 bg-black rounded-full animate-pulse"></div>
                    <div className="h-5 w-5 opacity-20 bg-black rounded-full animate-pulse"></div>
                    <div className="h-5 w-5 opacity-20 bg-black rounded-full animate-pulse"></div>
                </div>

            </div>
        </div>
        <footer className="bg-white rounded-lg shadow m-4 dark:outline-gray-800 absolute bottom-0 justify-center ">
            <div className="w-full mx-auto justify-center max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://Alldone03.vercel.app/" target="_blank" className="hover:underline">Alldone</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    </>);
}