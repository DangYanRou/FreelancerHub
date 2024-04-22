
import { Link } from 'react-router-dom';
import '../../styles/NavigationBar.css';

const NavigationBarClient = () => {

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {/* Use Link component from React Router for navigation */}
        <li><Link to="/clients/post-project">Post Project</Link></li>
        <li><Link to="/clients/project-posted">Project Posted</Link></li>
        <li><Link to="/clients/project-completed">Project Completed</Link></li>
        <li><Link to="/clients/favourite-freelancer">Favourite Freelancer</Link></li>
        <li><Link to="/clients/notification">Notification</Link></li>
        <li><Link to="/clients/profile">Profile</Link></li>
        <li><Link to="/login">Log Out</Link></li>
        
      </ul>
    </nav>
  );
};

export default NavigationBarClient;