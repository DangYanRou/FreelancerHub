import React, { useState } from 'react';
import NavigationBarClient from './NavigationBarClient';
import logo from "../../Gallery/google-logo.jpeg";
import googleImage from "../../Gallery/google-fulllogo.jpg";
import"../../styles/Clients/ClientProfile.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineModeEdit,MdSchool } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { RiSpeakLine } from "react-icons/ri";
import youtube from "../../Gallery/youtube-logo.jpeg";
import nest from "../../Gallery/nest-logo.png";

const ClientProfile = () => {
    const [showAbout, setShowAbout] = useState(true);
    const [showProjects, setShowProjects] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
  
    const handleProfileNavClick = (section) => {
      switch (section) {
        case 'about':
          setShowAbout(true);
          setShowProjects(false);
          setShowReviews(false);
          break;
        case 'affiliatedCompanies':
          setShowAbout(false);
          setShowProjects(true);
          setShowReviews(false);
          break;
        case 'interest':
          setShowAbout(false);
          setShowProjects(false);
          setShowReviews(true);
          break;
        default:
          break;
      }
    };

  return (
    <div className="ClientProfile">
      <NavigationBarClient></NavigationBarClient>
      <div className="client_content">
      <div className='profileCard'>
        <div className='pic_container'>
          <img src={logo} alt="profile picture"></img>
        </div>
        <div className='profile_text'>
                <div className="name-location">
                  <h2 className='name'>Google Inc.</h2>
                  <div className='location'>
                  <p><FaMapMarkerAlt className='markerIcon' />Kuala Lumpur, Malaysia</p>
                  </div>
                </div>
                <p className="job">Company Size </p>
                <p className="address">
                  Faculty of Computer Science and Information technology<br/>
                  Universiti Malaya</p>
                <p className='phone'>Phone: +60 034042-1072 </p>
        </div>
              <button className='edit' ><MdOutlineModeEdit /> Edit Profile</button> 
              </div>
        <div className='lowerProfile'>
          <nav className='profileNav'>
              <div className="navigation">
                  <ul className="nav-links">
                    <li><a href="#about" onClick={() => handleProfileNavClick('about')}>About Me</a></li>
                    <li><a href="#affiliatedCompanies" onClick={() => handleProfileNavClick('affiliatedCompanies')}>Affiliated Companies</a></li>
                    <li><a href="#interest" onClick={() => handleProfileNavClick('interest')}>Interest</a></li>
                  </ul>
              </div>
          </nav>
          <div className='Card2'>
            <div id="about" style={{ display: showAbout ? 'block' : 'none' }}>
              <p className='about_text'>Get To Know More</p>
              <h2 className='title'>About Me</h2>
              <p>
                Google's mission is to organize the world's information and make it universally accessible and useful.<br/><br/>
                Since our founding in 1998, Google has grown by leaps and bounds. 
                From oftering search in a single language we now offer dozens of products and services-including various forms of advertising and web applications for all kinds of tasks-in scores of languages. 
                And starting from tno computer saence students in a univorsity dant 10cm, fre now hare thoutaods of employees and cffices around the weld. 
                A lot has changed since the first Google search engine appeared. But some things haven't changed: our dedication to our users and our belief in the possibilties of the Interset itself.
              </p>
              {/* <div className='about_container'>
                <div className='clientAbout_details'>
                  <RiSpeakLine /><h3>Language We Speak</h3>
                  <div className='language_details'>
                  <div className='btn_container'>
                    <img src={googleImage}></img>
                  </div>
                  <h4 className='project_name'>Google, Social Marketing Tools</h4>
                </div>
                <div className='language_details'>
                  <div className='btn_container'>
                    <img src={googleImage}></img>
                  </div>
                  <h4 className='project_name'>Google, Social Marketing Tools</h4>
                </div>
                </div>
                <div className='clientAbout_details'>
                  <MdSchool/><h3>Education</h3>
                  <p>xvjsbjbvjazjvbsjzbvjbsjzbvjnsjzbhcbzbvuibubdjxzbvju</p>
                </div>
              </div> */}
            </div>
            <div id="affiliatedCompanies" style={{ display: showProjects ? 'block' : 'none' }}>
              <h2 className='title'>Affiliated Companies</h2>
              <div className='projects_container'>
                <div className='about_details'>
                  <div className='btn_container'>
                    <img src={googleImage}></img>
                  </div>
                  <h4 className='project_name'>Google, Social Marketing Tools</h4>
                </div>
                <div className='about_details'>
                  <div className='btn_container'>
                    <img src={youtube}></img>
                  </div>
                  <h4 className='project_name'>Youtube</h4>
                </div>
                <div className='about_details'>
                  <div className='btn_container'>
                    <img src={nest}></img>
                  </div>
                  <h4 className='project_name'>Nest</h4>
                </div>
              </div>
            </div>
            <div id="interest" style={{ display: showReviews? 'block' : 'none' }}>
              <p className='reviews_text'>We Care About</p>
              <h2 className='title'>Interest</h2>
              <div className='interest_container'>
                <div className='interest_details'>
                  <h3 className='interest_name'>Education</h3>
                </div>
                <div className='interest_details'>
                <h3 className='interest_name'>Science & Technology</h3>
                </div>
                <div className='interest_details'>
                  <h3 className='interest_name'>Children</h3>
                </div>
                <div className='interest_details'>
                  <h3 className='interest_name'>Human Rights</h3>
                </div>
                <div className='interest_details'>
                  <h3 className='interest_name'>Environment</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default ClientProfile;
