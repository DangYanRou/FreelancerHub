import React, { useState } from "react";
import logo from "../../../Gallery/google-logo.jpeg";
import googleImage from "../../../Gallery/google-fulllogo.jpg";
import "../../../styles/Clients/ClientProfile.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineModeEdit, MdSchool } from "react-icons/md";
import ProjectListClient from "../../../components/ProjectListClient";
import youtube from "../../../Gallery/youtube-logo.jpeg";
import nest from "../../../Gallery/nest-logo.png";
import StarRating from "../../../components/Rating";
import Rating from "./ClientAverageReviewBox";

const ClientProfile = () => {
  const [showAbout, setShowAbout] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const handleProfileNavClick = (section) => {
    switch (section) {
      case "about":
        setShowAbout(true);
        setShowCompanies(false);
        setShowProjects(false);
        setShowReviews(false);
        break;
      case "affiliatedCompanies":
        setShowAbout(false);
        setShowCompanies(true);
        setShowProjects(false);
        setShowReviews(false);
        break;
      case "projectPosted":
        setShowAbout(false);
        setShowCompanies(false);
        setShowProjects(true);
        setShowReviews(false);
        break;
      case "reviews":
        setShowAbout(false);
        setShowCompanies(false);
        setShowProjects(false);
        setShowReviews(true);
        break;
      default:
        break;
    }
  };

  const projects = [
    {
      title: "Online Shopping App Design",
      client: "Hana Florist",
      category: "Information & Communication Technology",
      budget: "RM 1500-RM 2000",
      location: "Subang Jaya, Selangor",
      id: 1,
      description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
      items: [
        "User-Friendly Design",
        "Aesthetic Appeal",
        "Mobile Responsiveness",
        "Integration of E-Commerce Features",
      ],
    },
    {
      title: "Florist Assistant",
      client: "Hana Florist",
      category: "Services ",
      budget: "RM 300",
      location: "Petaling Jaya, Selangor",
      id: 2,
      description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
      items: [
        "User-Friendly Design",
        "Aesthetic Appeal",
        "Mobile Responsiveness",
        "Integration of E-Commerce Features",
      ],
    },
  ];
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="ClientProfile">
      <div className="client_content">
        <div className="upperProfile">
          <div className="profileCard">
            <div className="pic_container">
              <img src={logo} alt="profile picture"></img>
            </div>
            <div className="profile_text">
              <div className="name-location">
                <h2 className="name">Google Inc.</h2>
                <div className="location">
                  <FaMapMarkerAlt className="markerIcon" />
                  <span>Kuala Lumpur, Malaysia</span>
                </div>
              </div>
              <p className="job">Company Size </p>
              <p className="address" style={{ fontSize: 14 }}>
                Faculty of Computer Science and Information Technology
                <br />
                Universiti Malaya
              </p>
              <p className="phone" style={{ fontSize: 14 }}>
                Phone: +60 034042-1072{" "}
              </p>
            </div>
            <button className="edit">
              <MdOutlineModeEdit /> Edit Profile
            </button>
          </div>
          <div className="rate">
            <Rating></Rating>
          </div>
        </div>
        <div className="lowerProfile">
          <nav className="profileNav">
            <div className="navigation">
              <ul className="nav-links">
                <li>
                  <a
                    href="#about"
                    onClick={() => handleProfileNavClick("about")}
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="#affiliatedCompanies"
                    onClick={() => handleProfileNavClick("affiliatedCompanies")}
                  >
                    Affiliated Companies
                  </a>
                </li>
                <li>
                  <a
                    href="#projectPosted"
                    onClick={() => handleProfileNavClick("projectPosted")}
                  >
                    Project Posted
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    onClick={() => handleProfileNavClick("reviews")}
                  >
                    Reviews
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="Card2">
            <div id="about" style={{ display: showAbout ? "block" : "none" }}>
              <p className="about_text">Get To Know More</p>
              <h2 className="title">About Me</h2>
              <p>
                Google's mission is to organize the world's information and make
                it universally accessible and useful.
                <br />
                <br />
                Since our founding in 1998, Google has grown by leaps and
                bounds. From oftering search in a single language we now offer
                dozens of products and services-including various forms of
                advertising and web applications for all kinds of tasks-in
                scores of languages. And starting from tno computer saence
                students in a univorsity dant 10cm, fre now hare thoutaods of
                employees and cffices around the weld. A lot has changed since
                the first Google search engine appeared. But some things haven't
                changed: our dedication to our users and our belief in the
                possibilties of the Interset itself.
              </p>
              <div className="about_container">
                <div className="clientAbout_details">
                  <h3 style={{ fontSize: 20, fontWeight: 500 }}>Interest</h3>
                  <div className="interest_container">
                    <div className="interest_details">
                      <h3 className="interest_name">Education</h3>
                    </div>
                    <div className="interest_details">
                      <h3 className="interest_name">Science & Technology</h3>
                    </div>
                    <div className="interest_details">
                      <h3 className="interest_name">Children</h3>
                    </div>
                    <div className="interest_details">
                      <h3 className="interest_name">Human Rights</h3>
                    </div>
                    <div className="interest_details">
                      <h3 className="interest_name">Environment</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="affiliatedCompanies"
              style={{ display: showCompanies ? "block" : "none" }}
            >
              <h2 className="title">Affiliated Companies</h2>
              <div className="projects_container">
                <div className="about_details">
                  <div className="btn_container">
                    <img src={googleImage}></img>
                  </div>
                  <h4 className="company_name" style={{ fontWeight: 500 }}>
                    Google, Social Marketing Tools
                  </h4>
                </div>
                <div className="about_details">
                  <div className="btn_container">
                    <img src={youtube}></img>
                  </div>
                  <h4 className="company_name" style={{ fontWeight: 500 }}>
                    Youtube
                  </h4>
                </div>
                <div className="about_details">
                  <div className="btn_container">
                    <img src={nest}></img>
                  </div>
                  <h4 className="company_name" style={{ fontWeight: 500 }}>
                    Nest
                  </h4>
                </div>
              </div>
            </div>
            <div
              id="projectPosted"
              style={{ display: showProjects ? "block" : "none" }}
            >
              <h2 className="title">Project Posted</h2>
              <ProjectListClient
                projects={projects}
                onProjectClick={handleProjectClick}
              />
            </div>
            <div
              id="reviews"
              style={{ display: showReviews ? "block" : "none" }}
            >
              <p className="projects_text" style={{ paddingLeft: 20 }}>
                Let Us Listen To Others
              </p>
              <h2 className="title">Reviews</h2>
              <div className="reviews_container">
                <div className="review_details">
                  <h3 className="review_name">Agnes</h3>
                  <StarRating className="review_rating"></StarRating>
                  <p>Nice Work! Keep it up</p>
                </div>
                <div className="review_details">
                  <h3 className="review_name">Bill Gates</h3>
                  <StarRating className="review_rating"></StarRating>
                  <p>
                    Very responsive and work is completed on time. Definitely
                    will work with you again soon!
                  </p>
                </div>
                <div className="review_details">
                  <h3 className="review_name">Zus Coffee Sdn. Bhd.</h3>
                  <StarRating className="review_rating"></StarRating>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
