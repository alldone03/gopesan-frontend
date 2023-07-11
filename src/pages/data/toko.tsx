import { useEffect, useRef, useState } from "react";
import MyLayout from "../../component/mylayout"
import { AuthData } from "../../store/models/authdata";
import axios from "axios";
import Alert from "../../component/alert";
import qs from "qs";





export default function Toko() {
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalUpdateId, setShowModalUpdateId] = useState(0);
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
        }).then(() => {
            setShowModalAdd(!showModalAdd);
            setChangeData(!changeData);

        })
    }

    function updateNamaToko(event: any) {
        event.preventDefault();
        axios.put(import.meta.env.VITE_API_URL + `/namatoko/${showModalUpdateId}`, qs.stringify({ 'namatoko': namaToko }), {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${userData.token}`
            }
        }).then(() => {
            setShowModalUpdate(!showModalUpdate);
            setChangeData(!changeData);
        }).catch((error) => {
            console.log(error.response.data);
        });

    }
    function showUpdateNamaToko(id: number) {
        setShowModalUpdateId(id);
        axios.get(import.meta.env.VITE_API_URL + `/namatoko/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }).then((response) => {
            setNamaToko(response.data.data.namatoko);
            setShowModalUpdate(!showModalUpdate);
        })





    }
    function deleteNamaToko(id: number) {
        const isConfirm = confirm("Are You Sure Delete This data?");
        if (isConfirm) {
            axios.delete(import.meta.env.VITE_API_URL + `/namatoko/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                }
            }).then(() => {
                setChangeData(!changeData);

            })
        }
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
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {namaTokoList.map((item: any, index: number) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{item.namatoko}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-around">
                                                <button onClick={() => showUpdateNamaToko(item.id)} className="bg-amber-500 rounded-sm w-7 h-7 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                </button>
                                                <button onClick={() => deleteNamaToko(item.id)} className="bg-red-600 rounded-sm w-7 h-7 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>

                                                </svg>
                                                </button>
                                            </div></td>
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

            <div id="authentication-modal" tabIndex={-1} style={{ backgroundColor: "rgb(75,85,99,0.8)" }} className={`${!showModalUpdate ? "hidden " : " "} flex items-center justify-center fixed top-0 left-0 right-0 inset-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`} >
                <div className="absolute bg-white rounded-lg shadow dark:bg-gray-700 ">
                    <button onClick={() => { setShowModalUpdate(!showModalUpdate); }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Toko</h3>
                        <form className="space-y-6" onSubmit={updateNamaToko}>
                            <div>
                                <label htmlFor="nama_toko" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Toko</label>
                                <input onChange={(e) => setNamaToko(e.target.value)} value={namaToko} type="nama_toko" name="nama_toko" id="nama_toko" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Joder Ka Dhani" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>

                        </form>
                    </div>
                </div>
            </div>

        </MyLayout >
    </>);
}