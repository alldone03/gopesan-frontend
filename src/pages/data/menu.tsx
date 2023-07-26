import Swal from "sweetalert2";
import MyLayout from "../../component/mylayout";
import { AddMenu, dataToko, jenisMakananAll, menuAll } from "../api";
import { useEffect, useState } from "react";
import { AuthData } from "../../store/models/authdata";
import Layout2 from "../../component/layout2";
import qs from "qs";
import axios from "axios";


export default function Menu() {

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalUpdateId, setShowModalUpdateId] = useState(0);
    const [namaMenu, setNamaMenu] = useState('');
    const [changeData, setChangeData] = useState(false);
    const userData: AuthData = JSON.parse(sessionStorage.getItem('authdata') as string);
    const [namaMenuList, setNamaMenuList] = useState([]);
    const [namaTokoList, setNamaTokoList] = useState([]);
    const [jenisMakananList, setJenisMakananList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statedropdownaddtoko, setStatedropdownaddtoko] = useState(0);
    const [statedropdownaddjenismakanan, setStatedropdownaddjenismakanan] = useState(0);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });


    useEffect(() => {
        return () => {
            const mymenuAll = async () => {
                return await menuAll();
            }
            mymenuAll().then((mymenuAll) => {

                setNamaMenuList(mymenuAll.data);


                setIsLoading(false);
            });

        }
    }, [changeData]);

    const showAddMenu = async () => {

        const mydatatoko = await dataToko();
        const myjenismakanan = await jenisMakananAll();


        setJenisMakananList(myjenismakanan.data);
        setStatedropdownaddjenismakanan(myjenismakanan.data[0].id);
        setNamaTokoList(mydatatoko.data);
        setStatedropdownaddtoko(mydatatoko.data[0].id);
        setShowModalAdd(!showModalAdd);

    }
    const addMenu = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const data = new FormData;
        data.append('id_namatoko', statedropdownaddtoko.toString());
        data.append('namamenu', namaMenu);
        data.append('id_jenismakanan', statedropdownaddjenismakanan.toString());
        const mymenuAll = await AddMenu(data);
        if (mymenuAll != null) {
            Toast.fire({
                icon: 'success',
                title: 'Data Berhasil Ditambahkan'
            });
            setShowModalAdd(!showModalAdd);
            setNamaMenu('');
            setChangeData(!changeData);
        }


        //
    }

    const showUpdateMenu = async (id: number) => {
        const mymenu = await menuAll();
        const mydatatoko = await dataToko();
        const myjenismakanan = await jenisMakananAll();
        setJenisMakananList(myjenismakanan.data);
        setNamaTokoList(mydatatoko.data);



        const mymenuAll = mymenu.data.filter((element: { id: number; }) => {
            if (element.id == id)
                return element;
        })

        setShowModalUpdateId(id);




        setNamaMenu(mymenuAll[0].namamenu);
        setStatedropdownaddtoko(mymenuAll[0].id_namatoko);
        setStatedropdownaddjenismakanan(mymenuAll[0].id_jenismakanan);
        setShowModalUpdate(!showModalUpdate);

    }
    const updateMenu = async (event) => {
        event.preventDefault();

        // console.log(event.target[0].value);


        axios.put(import.meta.env.VITE_API_URL + `/menu/${showModalUpdateId}`, qs.stringify({ 'id_namatoko': event.target[0].value, 'id_jenismakanan': event.target[1].value, 'namamenu': event.target[2].value }), {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${userData.token}`
            }
        }).then(() => {
            setShowModalUpdate(!showModalUpdate);
            setChangeData(!changeData);
            Toast.fire({
                icon: 'success',
                title: 'Update in successfully'
            })
        }).catch((error) => {
            console.log(error.response.data);
        });


        //
    }

    const mapTokoOption = () => {
        return namaTokoList.map((data: any) => { return (<option key={data.id} className="text-white" value={data.id}>{data.namatoko}</option>) });
    }
    const mapJenisOption = () => {
        return jenisMakananList.map((data: any) => { return (<option key={data.id} className="text-white" value={data.id}>{data.jenismakanan}</option>) });
    }

    function deleteMenu(id: any) {

        console.log("hello:", id);
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',

        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(import.meta.env.VITE_API_URL + `/menu/${id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
                    }
                }).then(() => {
                    setChangeData(!changeData);
                    Toast.fire({
                        icon: 'success',
                        title: 'Delete in successfully'
                    })
                })
            }
        })


    }



    const mapDataTable = () => {

        return namaMenuList.map((item: any, index: number) => {
            return (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.namatoko}</td>
                    <td className="px-6 py-4">{item.namamenu}</td>
                    <td className="px-6 py-4">{item.jenismakanan}</td>
                    <td className="px-6 py-4">
                        <div className="flex justify-around">
                            <button onClick={() => {
                                showUpdateMenu(item.id);
                            }} className="bg-amber-500 rounded-sm w-7 h-7 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <button onClick={() => deleteMenu(item.id)} className="bg-red-600 rounded-sm w-7 h-7 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </svg>
                            </button>
                        </div>
                    </td>
                </tr>

            )
        });
    }
    function tokohandleChange(event: any) {
        //

        setStatedropdownaddtoko(event.target.value);

    }
    function jenismakananhandleChange(event: any) {
        //
        setStatedropdownaddjenismakanan(event.target.value);
    }


    return (
        <Layout2>
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
                                <select onChange={tokohandleChange} value={statedropdownaddtoko} id="countries" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {mapTokoOption()}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Jenis</label>
                                <select onChange={jenismakananhandleChange} value={statedropdownaddjenismakanan} id="countries" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {mapJenisOption()}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="namaMenu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Menu</label>
                                <input onChange={(e) => setNamaMenu(e.target.value)} type="namaMenu" name="namaMenu" id="namaMenu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Geprek" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>

                        </form>
                    </div>
                </div>
            </div>


            <div className="flex mt-5  ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">no</th>
                            <th scope="col" className="px-6 py-3">Nama Toko</th>
                            <th scope="col" className="px-6 py-3">Nama Menu</th>
                            <th scope="col" className="px-6 py-3">Jenis Makanan</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr><td colSpan={4} className="text-center">Loading...</td></tr> :
                            mapDataTable()}
                    </tbody>
                </table>
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
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                <select onChange={tokohandleChange} value={statedropdownaddtoko} id="countries" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {mapTokoOption()}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Jenis</label>
                                <select onChange={jenismakananhandleChange} value={statedropdownaddjenismakanan} id="countries" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {mapJenisOption()}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="namaMenu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Menu</label>
                                <input onChange={(e) => setNamaMenu(e.target.value)} value={namaMenu} type="namaMenu" name="namaMenu" id="namaMenu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Geprek" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>

                        </form>
                    </div>
                </div>
            </div>
        </Layout2>);
}