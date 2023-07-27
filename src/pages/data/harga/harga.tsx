import { useDispatch, useSelector } from "react-redux";
import Layout2 from "../../../component/layout2";
import { toggleAddModalShow } from "../../../redux/slice/hargaSlice";



export default function Harga() {
    const dispatch = useDispatch();

    return (
        <Layout2>
            <h1 className="font-bold text-2xl text-white">Harga
            </h1>
            <div className="flex mt-4">
                <div>
                    <button onClick={() => { dispatch(toggleAddModalShow()); dispatch(changeId(0)); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Harga</button>
                </div>
            </div>
        </Layout2>)
}
const Table = () => {
    const isLoading = useSelector(state => state.harga.isLoading);
    return (<>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">no</th>
                        <th scope="col" className="px-6 py-3">Nama Toko</th>
                        <th scope="col" className="px-6 py-3">Nama Menu</th>
                        <th scope="col" className="px-6 py-3">Nama Varian</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-white">
                    {isLoading ? <tr><td colSpan={3} className="text-center">Loading...</td></tr> :
                        null}
                </tbody>
            </table>
        </div>
    </>)
}