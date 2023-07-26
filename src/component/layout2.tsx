import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { toggleNavbar, toggleNavbarLogout, toggleProfileNavbar } from "../redux/slice/navbarSlice";
import { Link, useNavigate } from "react-router-dom";





const Navbar = () => {
    const authData = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toggleProfileNavbarData = useSelector((state: any) => {
        return state.navbarSlice.istoggleProfileNavbar;
    });



    return (<>
        <nav className="fixed w-screen z-40  bg-white border-gray-200 dark:bg-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <button onClick={() => dispatch(toggleNavbar())
                }
                    data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <a href={location.origin} className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GPReact</span>
                </a>
                <div className="flex items-center md:order-2">
                    <button onClick={() => dispatch(toggleProfileNavbar())} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={authData?.user.pathuserpicture != null ? import.meta.env.VITE_SERVER_URL + "/" + authData?.user.pathuserpicture : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} alt="user photo" />
                    </button>

                    <div className={`absolute z-50 top-14 ${(!toggleProfileNavbarData) ? 'hidden' : ''} right-3 lg:right-80  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{authData?.user.name}</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{authData?.user.email}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">

                            <li>
                                <button onClick={() => navigate('/settings')} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</button>
                            </li>

                            <li>
                                <button onClick={() => dispatch(toggleNavbarLogout())} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </nav >
    </>)
}

const SideBar = () => {
    const toggleNavbar = useSelector((state: any) => {
        return state.navbarSlice.isNavbarOpen;
    });




    return (<>
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-10 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 ${(toggleNavbar) ? 'translate-x-0' : 'sm:translate-x-0'} dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to={'/dashboard'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/toko'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>

                            <span className="flex-1 ml-3 whitespace-nowrap">toko</span>

                        </Link>
                    </li>
                    <li>
                        <Link to={'/menu'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Menu</span>

                        </Link>
                    </li>
                    <li>
                        <Link to={'/varian'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Varian</span>

                        </Link>
                    </li>

                </ul>
            </div>
        </aside>
    </>);
}


const Layout2 = ({ children }: any) => (
    <>
        <Navbar />



        <SideBar />
        <main className="  bg-transparent pt-20 md:pt-24 p-4 md:pl-72  md:overflow-auto whitespace-pre-line">
            <div className="flex flex-col">
                <div className="flex flex-col justify-between items-stretch gap-4">
                    {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
                        return (
                            <div className="px-4 md:px-0 flex justify-between gap-1">
                                <div className="bg-green-500 w-20 h-20">{item * 1}</div>
                                <div className="bg-green-500 w-20 h-20">{item * 2}</div>
                                <div className="bg-green-500 w-20 h-20">{item * 3}</div>
                                <div className="bg-green-500 w-20 h-20">{item * 4}</div>
                                <div className="bg-green-500 w-20 h-20">{item * 5}</div>
                                <div className="bg-green-500 w-20 h-20">{item * 6}</div>
                            </div>);
                    })} */}
                </div>
                <div >
                    {children}
                </div>

            </div>
        </main>




    </>)
export default Layout2;