import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBarClient = () => {
    const location = useLocation(); // Get current location
    const pathname = location.pathname;

    const handleLogout = async () => {
        localStorage.removeItem("user");
        window.location.replace('/');
      };
  
      
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b fixed top-0 w-full z-50">
            <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 justify-between items-center">
                <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Freelancer hub</span>
                <div className="items-center justify-between w-1500px md:flex md:order-1 md:justify-start" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link 
                                to="/clients/profile" 
                                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/clients/profile' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/clients/post-project" 
                                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/clients/post-project' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}
                            >
                                Create Project
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/clients/project-posted" 
                                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/clients/project-posted' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}
                            >
                                Posted Project
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/clients/project-completed" 
                                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/clients/project-completed' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}
                            >
                                Completed Project
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/clients/saved" 
                                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/clients/saved' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}
                            >
                                Favourite
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/clients/notifications" 
                                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/clients/notifications' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}
                            >
                                Notifications
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}
                                onClick={handleLogout}>
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>    
            </div>
        </nav>
    );
}

export default NavigationBarClient;