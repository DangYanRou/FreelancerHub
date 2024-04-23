import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NavigationBar.css';

// const NavigationBar = () => {
//   const [showSubMenu, setShowSubMenu] = useState(false);

//   // Function to toggle the visibility of the sub-menu
//   const toggleSubMenu = () => {
//     setShowSubMenu(!showSubMenu);
//   };

//   return (
//     <nav className="navbar">
//       <ul className="nav-list">
//         {/* Use Link component from React Router for navigation */}
//         <li><Link to="/freelancers/Explore">Explore</Link></li>
//         <li>
//           <a href="#Projects" onClick={toggleSubMenu}>Projects</a>
//           {/* Conditionally render the sub-menu based on the state */}
//           {showSubMenu && (
//             <ul className="sub-menu">
//               <li><Link to="/freelancers/projects-applied">Projects Applied</Link></li>
//               <li><Link to="/freelancers/project-completed-page">Projects Completed</Link></li>
//             </ul>
//           )}
//         </li>
//         <li><Link to="/freelancers/saved">Saved</Link></li>
//         <li><Link to="/freelancers/notifications">Notification</Link></li>
//         <li><Link to="/freelancers/profile">Profile</Link></li>
//         <li><Link to="/">Log Out</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default NavigationBar;

const NavigationBarFreelancer = () => {

  const pathname = window.location.pathname; // Get current pathname
  
  return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
      <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 justify-between items-center">
          
      
               
      <span className=" text-2xl font-semibold whitespace-nowrap dark:text-white">Freelancer hub</span>
          <div className= 'items-center justify-between w-1500px md:flex md:order-1 md:justify-start `} id="navbar-user"'>
          
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                  <a href="/freelancers/Explore" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`} aria-current="page">
                      Explore
                  </a>
              </li>
              <li>
                  <a href="/freelancers/projects-applied" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/news/") || pathname == "/news")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`} >
                      Applied Projects
                  </a>
              </li>
              <li>
                  <a href="/freelancers/project-completed-page" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname === '/analyze' || pathname === '/report') ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                      Completed Project
                  </a>
              </li>
              <li>
                  <a href="/freelancers/saved" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/learn/") || pathname == "/learn")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                      Favourite
                  </a>
              </li>
              <li>
                  <a href="/freelancers/notifications" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/learn/") || pathname == "/learn")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                      Notifications
                  </a>
              </li>
              <li>
                  <a href="/freelancers/profile" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/learn/") || pathname == "/learn")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                      Profile
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

export default NavigationBarFreelancer;