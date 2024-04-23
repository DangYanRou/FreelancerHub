import React, { useState } from 'react';
import NavigationBar from './NavigationBarFreelancer';
import"../../styles/Freelancers/FreelancerProfile.css";
import profilePic from "../../Gallery/Elon_Musk.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineModeEdit,MdSchool, MdVerified } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import Rating from "../../pages/Freelancer/FreelancerAverageReviewBox";
import StarRating from "../../components/Rating";

const FreelancerProfile = () => {
  const [showAbout, setShowAbout] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const handleProfileNavClick = (section) => {
    if(section==='about') {
        setShowAbout(true);
        setShowProjects(false);
        setShowReviews(false);
    }
    else if(section==='projects'){
        setShowAbout(false);
        setShowProjects(true);
        setShowReviews(false);
    }
    else if(section==='reviews'){
        setShowAbout(false);
        setShowProjects(false);
        setShowReviews(true);
    }
    else
    return;
  };

  return (
    <div className="FreelancerProfile">
      <NavigationBar></NavigationBar>
      <h1>My Profile</h1>
      <div className="content">
        <div className='leftProfile'>
        <div className='profile'>
            <div className='pic_container'>
              <img src={profilePic} alt="profile picture"></img>
            </div>
            <div className='text'>
              <div className="name-location">
                <h2 className='name'>Elon Musk</h2>
                <div className='location'>
                <FaMapMarkerAlt className='markerIcon' /><span>Kuala Lumpur, Malaysia</span>
                </div>
              </div>
              <p className="job">Software Engineer</p>
            </div>
            <button className='edit' ><MdOutlineModeEdit /> Edit Profile</button> 
        </div>
        <div className='rating'>
              <div className="rate"><Rating></Rating></div>
              </div>
              </div>
        <div className='lowerProfile'>
          <nav className='profileNav'>
              <div className="navigation">
                  <ul className="nav-links">
                    <li><a href="#about" onClick={() => handleProfileNavClick('about')}>About Me</a></li>
                    <li><a href="#projects" onClick={() => handleProfileNavClick('projects')}>Projects</a></li>
                    <li><a href="#reviews" onClick={() => handleProfileNavClick('reviews')}>Reviews</a></li>
                  </ul>
              </div>
          </nav>
          <div className='Card2'>
            <div id="about"style={{ display: showAbout ? 'block' : 'none' }}>
              <p className='about_text'>Get To Know More</p>
              <h2 className='title'>About Me</h2>
              <p>Innovative and visionary entrepreneur with a passion for revolutionizing industries and solving some of the world's most pressing challenges. 
                Known for my relentless pursuit of bold ideas and disruptive technologies, I thrive in dynamic environments where creativity and ambition intersect. 
                As the founder of multiple groundbreaking companies including SpaceX, Tesla, Neuralink, and The Boring Company, 
                I have demonstrated a track record of turning ambitious visions into reality. 
                My mission-driven approach is fueled by a deep commitment to advancing humanity's future, 
                whether it's through sustainable transportation, space exploration, or the integration of artificial intelligence with the human brain. 
                With a relentless focus on innovation and a willingness to take risks, I strive to push the boundaries of what's possible and inspire others to join me in shaping a better tomorrow.</p>
              <div className='about_container'>
              <div className='about_details'>
                  <MdSchool className='aboutIcon' /><h3>Education</h3>
                  <p className='experience_text'>
                    B.Sc. Bachelors Degree<br/>
                    M.Sc. Masters Degree
                  </p>
                </div>
                <div className='about_details'>
                  <GrAchievement className='aboutIcon' /><h3>Experience</h3>
                  <p className='experience_text'>
                    2+ years<br/>
                    Frontend Development
                  </p>
                  <div className='projects_container'>
                <div className='about_details'>
                  <h2 className='experience_name'>Frontend Development</h2>
                  <div className='experience_content'>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      CSS
                      <p className='experience_detail'>Experienced</p>
                      </div>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      HTML
                      <p className='experience_detail'>Experienced</p>
                    </div>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      TypeScript
                      <p className='experience_detail'>Basic</p>
                    </div>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      JavaScript
                      <p className='experience_detail'>Basic</p>
                    </div>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      Material UI
                      <p className='experience_detail'>Intermediate</p>
                    </div>
                  </div>
                </div>
                <div className='about_details'>
                  <h2 className='experience_name'>Backend Development</h2>
                  <div className='experience_content'>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      Node JS
                      <p className='experience_detail'>Intermediate</p>
                      </div>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      Git
                      <p className='experience_detail'>Intermediate</p>
                    </div>
                    <div className='experience_description'>
                      <MdVerified className='verifiedIcon'></MdVerified>
                      MySQL
                      <p className='experience_detail'>Intermediate</p>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
            <div id="projects" style={{ display: showProjects ? 'block' : 'none' }}>
              <p className='projects_text'>Browse My Recents</p>
              <h2 className='title'>Projects</h2>
              <div className='projects_container'>
                <div className='about_details'>
                  <h2 className='project_name'>E-Commerce Platform</h2>
                  <p>An online marketplace where vendors can sell products and consumers can shop conveniently.</p>
                  <div className='btn_container'>
                    <button className='btn_project' onClick={() => window.location.href = 'https://github.com/tamagoyaki03/board'}>Github</button>
                  </div>
                </div>
                <div className='about_details'>
                  <h2 className='project_name'>Social Networking Platform</h2>
                  <p>A platform that connects people, allowing them to create profiles, interact through real-time messaging, and share updates.</p>
                  <div className='btn_container'>
                    <button className='btn_project' onClick="#">Github</button>
                  </div>
                </div>
                <div className='about_details'>
                  <h2 className='project_name'>Travel and Tourism Website</h2>
                  <p>A website that assists travelers in planning trips, generating itineraries, and providing reviews and recommendations.</p>
                  <div className='btn_container'>
                    <button className='btn_project' onClick="#">Github</button>
                  </div>
                </div>
              </div>
            </div> 
            <div id="reviews" style={{ display: showReviews ? 'block' : 'none' }}>
              <p className='projects_text'>Let Us Listen To Others</p>
              <h2 className='title'>Reviews</h2>
              <div className='reviews_container'>
                <div className='review_details'>
                  <h3 className='review_name'>Agnes</h3><StarRating className='review_rating'></StarRating>
                  <p>Nice Work! Keep it up</p>
                </div>
                <div className='review_details'>
                  <h3 className='review_name'>Bill Gates</h3><StarRating className='review_rating'></StarRating>
                  <p>Very responsive and work is completed on time. Definitely will work with you again soon!</p>
                </div>
                <div className='review_details'>
                  <h3 className='review_name'>Zus Coffee Sdn. Bhd.</h3><StarRating className='review_rating'></StarRating>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FreelancerProfile;
