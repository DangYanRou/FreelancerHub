
import { Link } from 'react-router-dom';
// import '../../styles/NavigationBar.css';

// const NavigationBarClient = () => {

//   return (
//     <nav className="navbar">
//       <ul className="nav-list">
//         {/* Use Link component from React Router for navigation */}
//         <li><Link to="/clients/post-project">Post Project</Link></li>
//         <li><Link to="/clients/project-posted">Project Posted</Link></li>
//         <li><Link to="/clients/project-completed">Project Completed</Link></li>
//         <li><Link to="/clients/saved">Favourite Freelancer</Link></li>
//         <li><Link to="/clients/notifications">Notification</Link></li>
//         <li><Link to="/clients/profile">Profile</Link></li>
//         <li><Link to="/">Log Out</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default NavigationBarClient;

import React from 'react'
// import Logo from '../assets/Logo.png'
// import ProfilePhoto from '../assets/profilePhoto.png'
import { useState } from 'react';

const NavigationBarClient = () => {

    const pathname = window.location.pathname; // Get current pathname
    
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
        <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 justify-between items-center">
            
        
                 
        <span className=" text-2xl font-semibold whitespace-nowrap dark:text-white">Freelancer hub</span>
            <div className= 'items-center justify-between w-1500px md:flex md:order-1 md:justify-start `} id="navbar-user"'>
            
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="/clients/profile" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`} aria-current="page">
                        Profile
                    </a>
                </li>
                <li>
                            <a href="/clients/post-project" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/news/") || pathname == "/news")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`} >
                        Create Project
                    </a>
                </li>
                <li>
                    <a href="/clients/project-posted" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/portfolio' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Posted Project
                    </a>
                </li>
                <li>
                    <a href="/clients/project-completed" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname === '/analyze' || pathname === '/report') ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Completed Project
                    </a>
                </li>
                <li>
                    <a href="/clients/saved" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/learn/") || pathname == "/learn")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Favourite
                    </a>
                </li>
                <li>
                    <a href="/clients/notifications" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/learn/") || pathname == "/learn")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Notifications
                    </a>
                </li>
                <li>
                    <a href="/" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/learn/") || pathname == "/learn")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Sign Out
                    </a>
                </li>
                </ul>
            </div>    
            
        </div>
        </nav>
    )
}

export default NavigationBarClient;