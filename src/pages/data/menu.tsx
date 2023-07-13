import Swal from "sweetalert2";
import MyLayout from "../../component/mylayout";
import { dataToko } from "../api";
import { useState } from "react";


export default function Menu() {

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalUpdateId, setShowModalUpdateId] = useState(0);
    const [namaMenu, setNamaMenu] = useState('');
    const [changeData, setChangeData] = useState(false);
    const userData: AuthData = JSON.parse(localStorage.getItem('authdata') as string);
    const [namaMenuList, setNamaMenuList] = useState([]);
    const [namaTokoList, setNamaTokoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    const showAddMenu = async () => {

        const mydatatoko = await dataToko();
        setNamaTokoList(mydatatoko.data);
        setShowModalAdd(!showModalAdd);

    }
    const addMenu = async () => {

        //
    }
    const showUpdateMenu = async () => {

        setShowModalUpdate(!showModalUpdate);

    }
    const updateMenu = async () => {

        //
    }

    const Option = () => {


        return namaTokoList.map((data: any) => { return (<option className="text-white" value={data.id}>{data.namatoko}</option>) });
    }

    return (<MyLayout>


        <h1 className="font-bold text-2xl text-white">Menu
        </h1>

        <div className="flex mt-4">
            <div>
                <button onClick={showAddMenu} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Menu</button>
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
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add </h3>
                    <form className="space-y-6" onSubmit={addMenu}>

                        <div>
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                {Option()}
                            </select> </div>
                        <div>
                            <label htmlFor="namaMenu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Menu</label>
                            <input onChange={(e) => setNamaMenu(e.target.value)} type="namaMenu" name="namaMenu" id="namaMenu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Geprek" required />
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
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Menu</h3>
                    <form className="space-y-6" onSubmit={updateMenu}>
                        <div>
                            <label htmlFor="nama_toko" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Toko</label>
                            <input onChange={(e) => setNamaMenu(e.target.value)} value={namaMenu} type="nama_toko" name="nama_toko" id="nama_toko" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Joder Ka Dhani" required />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>

                    </form>
                </div>
            </div>
        </div>
    </MyLayout>);
}