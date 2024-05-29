import "./styles/CompletedProjectList.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";

const CompletedProjectListClient = ({ projects }) => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState({});
  const [hover, setHover] = useState({});

  const toggleFavourite = (projectId) => {
    setFavourites((prev) => ({
      ...prev,
      [projectId]: !prev[projectId], // Toggle true/false upon click
    }));
  };

  return (
    <div className="jl-centered-container ">
      {projects.map((project) => (
        <div className="card" key={project.id}>
          <h2>{project.title}</h2>
          <a href="#" className="hover-profileLink">
            {project.client}
          </a>
          <p id="category">{project.category}</p>
          <p>
            <FaLocationDot className="icon-style" />
            {project.location}
          </p>
          <p>
            <MdOutlineAttachMoney size={20} className="icon-style2" />
            {project.minInput}-{project.maxInput} {project.currencyInput}
            /project
          </p>
          <p className="apply-status">{project.status}</p>
          <div className="bottom-row">
            <p style={{ flexGrow: 1 }}>
              Completed on:{" "}
              <span className="complete-date">{project.completeDate}</span>
            </p>
            <div className="buttonContainer">
              <button
                className="favouriteBtn"
                onClick={() => toggleFavourite(project.id)}
                onMouseEnter={() =>
                  setHover((prev) => ({ ...prev, [project.id]: true }))
                }
                onMouseLeave={() =>
                  setHover((prev) => ({ ...prev, [project.id]: false }))
                }
                style={{
                  backgroundColor: favourites[project.id]
                    ? "#4CAF50"
                    : "#69acc2",
                  color: hover[project.id] ? "#213e60" : "#fff",
                  transition: "color 0.3s ease",
                }}
              >
                {favourites[project.id] ? (
                  <div className="favourite-collaborator">
                    <span className="icon-text">
                      <AiOutlineCheckCircle /> Favourite Collaborator
                    </span>
                  </div>
                ) : (
                  "+ Favourite Collaborator"
                )}
              </button>

              <button
                className="feedbackBtn"
                onClick={() =>
                  navigate("../freelancer-feedback-page", {
                    state: { clientID: project.clientID },
                  })
                }
              >
                Submit feedback
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedProjectListClient;
