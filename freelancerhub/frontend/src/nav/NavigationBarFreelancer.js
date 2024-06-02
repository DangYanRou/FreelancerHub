import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/NavigationBar.css';
import { UserProvider } from '../context/UserContext';

const NavigationBarFreelancer = () => {
  const { pathname } = useLocation(); 

  return (
    
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b fixed top-0 w-full z-50">
        <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 justify-between items-center">
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Freelancer hub</span>
          <div className="items-center justify-between w-1500px md:flex md:order-1 md:justify-start" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/freelancers/explore" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/freelancers/explore' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`} aria-current="page">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/freelancers/projects-applied" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/freelancers/projects-applied' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                  Applied Projects
                </Link>
              </li>
              <li>
                <Link to="/freelancers/project-completed-page" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/freelancers/project-completed-page' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link to="/freelancers/saved" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/freelancers/saved' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                  Favourite
                </Link>
              </li>
              <li>
                <Link to="/freelancers/notifications" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/freelancers/notifications' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                  Notifications
                </Link>
              </li>
              <li>
                <Link to="/freelancers/profile" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/freelancers/profile' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

  );
}

export default NavigationBarFreelancer;