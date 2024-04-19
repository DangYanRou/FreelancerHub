
import { Link } from 'react-router-dom';
import '../../styles/NavigationBarClient.css';

const NavigationBarClient = () => {

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {/* Use Link component from React Router for navigation */}
        <li><Link to="/freelancers/post-project">Post Project</Link></li>
        <li><Link to="/freelancers/project-posted">Project Posted</Link></li>
        <li><Link to="/freelancers/project-completed">Project Completed</Link></li>
        <li><Link to="/freelancers/favourite-freelancer">Favourite Freelancer</Link></li>
        <li><Link to="/freelancers/notification">Notification</Link></li>
        <li><Link to="/freelancers/profile">Profile</Link></li>
        <li><Link to="/login">Log Out</Link></li>
        
      </ul>
    </nav>
  );
};

export default NavigationBarClient;