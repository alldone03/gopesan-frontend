import { useEffect, useState } from "react";



import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AuthData } from "../store/models/authdata";
import Alert from "../component/alert";





export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState([]);

    const navigate = useNavigate();


    const userData: AuthData = JSON.parse(sessionStorage.getItem('authdata') as string);
    useEffect(() => {
        // console.log(sessionStorage.getItem('authdata'));

        if (sessionStorage.getItem('authdata') === null) {
            sessionStorage.removeItem('authdata');
        } else {
            navigate('/dashboard');
        }


    });

    function submitData(event: any) {
        event.preventDefault();
        const form = new FormData();
        form.append('email', email);
        form.append('password', password);


        axios.post(import.meta.env.VITE_API_URL + "/auth/login", form, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {

            sessionStorage.setItem('authdata', JSON.stringify({ token: response.data.token, user: { id: response.data.user.id, email: response.data.user.email, name: response.data.user.name, roleid: response.data.user.roleid, pathuserpicture: response.data.user.pathuserpicture } } as AuthData));

            navigate('/dashboard');
        }).catch((error) => {

            setMessage([error.response.status as never, error.response.data.message as never]);
        });
    }


    return (<>

        <section className="bg-gray-50 dark:bg-gray-900 h-screen">

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="d-flex flex-column items-center  p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login


                        </h1>
                        <Alert message={message} />
                        <form className="space-y-4 md:space-y-6 " onSubmit={submitData}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div >

        </section >


    </>);
}