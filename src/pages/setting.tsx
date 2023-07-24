import { useState } from "react";

import { AuthData } from "../store/models/authdata";
import { Upload } from "./api";

import Layout2 from "../component/layout2";


export default function Setting() {



    const userData: AuthData = JSON.parse(sessionStorage.getItem('authdata') as string);
    if (userData == null) {
        window.location.href = "/login";
    }
    const [name, setName] = useState(userData.user.name);
    const [password, setPassword] = useState(userData.user.name);
    const [confirmPassword, setConfirmPassword] = useState(userData.user.name);
    const [file, setFile] = useState('');
    const [images, setImages] = useState(null);


    function handleChangePicture(e: any) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImages(e.target.files[0]);
    }

    const submitHandler = async (event: any) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        const form = new FormData();
        form.append('name', name);
        form.append('password', password);
        form.append('file', images);

        const response = await Upload(form);
        console.log(response.data);

        // const userdata = JSON.parse(sessionStorage.getItem('authdata') as string);

        // userdata.user.pathuserpicture = response.data;
        // console.log(userData.user.pathuserpicture);

        sessionStorage.setItem('authdata', JSON.stringify({ token: userData.token, user: { id: userData.user.id, email: userData.user.email, name: userData.user.name, roleid: userData.user.roleid, pathuserpicture: response.data } } as AuthData));
        const myuserdata = JSON.parse(sessionStorage.getItem('authdata') as string);
        console.log(myuserdata.user);


    }



    return (
        <Layout2>
            <div>
                <h1 className="font-bold text-2xl text-white ">Setting</h1>
            </div>
            <div className="flex flex-col md:flex-row">

                <div className="rounded overflow-hidden shadow-lg bg-slate-400 p-3">
                    <div className="flex">

                        <div className="">
                            <form onSubmit={submitHandler}>
                                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                        <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div
                                        className="mt-5">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div
                                        className="mt-5">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                        <input type="password" name="password" id="password" onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div
                                        className="mt-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                        <input onChange={handleChangePicture} className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" aria-describedby="file_input_help" id="file_input" name="photo " type="file" />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end pr-5 mb-3">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <img src={file} className="w-96 h-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout2>
    );
}