import { useEffect, useRef, useState } from "react";
import MyLayout from "../../component/mylayout"
import { AuthData } from "../../store/models/authdata";
import axios from "axios";





export default function Toko() {
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [namaToko, setNamaToko] = useState('');
    const [changeData, setChangeData] = useState(false);

    const userData: AuthData = JSON.parse(localStorage.getItem('authdata') as string);

    const [namaTokoList, setNamaTokoList] = useState([]);


    useEffect(() => {

        axios.get(import.meta.env.VITE_API_URL + "/namatoko", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }).then((response) => {
            console.log(response.data);
            setNamaTokoList(response.data.data);
        })
    }, [changeData]);



    function addNamaToko(event: any) {
        event.preventDefault();
        const form = new FormData();
        form.append('namatoko', namaToko);
        axios.post(import.meta.env.VITE_API_URL + "/namatoko", form, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }).then((response) => {
            setShowModalAdd(!showModalAdd);
            setChangeData(!changeData);

        })

    }

    return (<>
        <MyLayout>
            <h1 className="font-bold text-2xl text-white">Toko</h1>
            <div className="h-5"></div>
            <div className="flex flex-col gap-4">
                <div className="">
                    <button onClick={() => setShowModalAdd(!showModalAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Data</button>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">no</th>
                                <th scope="col" className="px-6 py-3">Nama Toko</th>
                            </tr>
                        </thead>
                        <tbody>
                            {namaTokoList.map((item: any, index: number) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{item.namatoko}</td>
                                    </tr>);
                            })}


                        </tbody>
                    </table>
                </div>
            </div>
            <div id="authentication-modal" tabIndex={-1} style={{ backgroundColor: "rgb(75,85,99,0.8)" }} className={`${!showModalAdd ? "hidden " : " "} flex items-center justify-center fixed top-0 left-0 right-0 inset-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`} >
                <div className="absolute bg-white rounded-lg shadow dark:bg-gray-700 ">
                    <button onClick={() => { setShowModalAdd(!showModalAdd); }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Toko</h3>
                        <form className="space-y-6" onSubmit={addNamaToko}>
                            <div>
                                <label htmlFor="nama_toko" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Toko</label>
                                <input onChange={(e) => setNamaToko(e.target.value)} type="nama_toko" name="nama_toko" id="nama_toko" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Joder Ka Dhani" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>

                        </form>
                    </div>
                </div>
            </div>

        </MyLayout >
    </>);
}