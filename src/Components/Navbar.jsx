import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/slices/SearchSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const [input, setInput] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // This should come from your auth logic
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function searchHandler(e) {
        e.preventDefault();
        if (input.length === 0) {
            toast.error('⚠️ Please enter a search term!!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }
        dispatch(setSearchTerm(input.toLowerCase()));
        setInput('');
        navigate('/search');
    }

    function changeHandler(event) {
        setInput(event.target.value);
    }

    function handleSignOut() {
        // Sign out logic here
        setIsAuthenticated(false);
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className=" border-gray-200 bg-orange-600 sticky top-0 z-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between gap-x-2 mx-auto p-2">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PokeNavigator</span>
                </Link>
                <div className="flex flex-1 md:hidden items-center justify-end">
                    <form className="max-w-[200px] w-full" onSubmit={searchHandler}>
                        <div className="relative">
                            <input
                                type="text"
                                name="q"
                                className="w-full border h-10 shadow p-2 rounded text-gray-900 placeholder-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white"
                                placeholder="Search"
                                value={input}
                                onChange={changeHandler}
                            />
                        </div>
                    </form>
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm"
                        aria-controls="navbar-search"
                        aria-expanded={menuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 justify-center hidden md:flex">
                    <form className="max-w-[480px] w-full" onSubmit={searchHandler}>
                        <div className="relative">
                            <input
                                type="text"
                                name="q"
                                className="w-full border h-12 shadow p-4 rounded text-gray-900 placeholder-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white"
                                placeholder="Search"
                                value={input}
                                onChange={changeHandler}
                            />
                            <button type="submit" className="absolute top-3.5 right-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 56.966 56.966"
                                    className="text-teal-400 h-5 w-5 fill-current dark:text-teal-300"
                                >
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className={`items-center justify-between ${menuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto`} id="navbar-search">
                    <ul className="flex flex-col rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/favorites" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        Favorites
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleSignOut}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/registration" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </nav>
    );
}

export default Navbar;
