import React from 'react';
import workImage from '../../Gallery/work.png';
import noteImage from '../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import NavigationBarClients from './NavigationBarClient';
import Heading from '../../Components/Heading';
import '../../styles/Clients/CreateProjectPreview.css';


// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
        <div key={index} className={`stage-container w-1/4 flex flex-col justify-between ${index !== stages.length - 1 ? 'border-r' : ''}`}>
        <div className="stage flex flex-col items-center px-4">
            <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Preview' ? '#213E60' : '#E9EBFD' }}>
              <img src={stage.title === 'Preview' ? workImage : noteImage} alt="Stage icon" />
            </div>
            <div className="title font-bold">{stage.title}</div>
            </div>

            <div className="flex items-center justify-center">{stage.step}</div>
          </div>
      ))}
    </div>
  );
};



const CreateProjectPreview = () => {

  const navigate = useNavigate();

  const handleNextButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/project-posted");
  };

  //edit here to navigate to posted part
  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project-invite");
  };

  // Define the stages of project creation
  const stages = [
    { title: 'Project Details', step: 'Step 1/5' },
    { title: 'Project Description', step: 'Step 2/5' },
    { title: 'Preferred', step: 'Step 3/5' },
    { title: 'Invite', step: 'Step 4/5' },
    { title: 'Preview', step: 'Step 5/5' },
  ];



  return (
    <div className="flex flex-col items-start justify-center">
                        <NavigationBarClients/>

                        <Heading as="h1" className="ml-[25px] tracking-[-0.90px] md:p-5 mt-5">
                      Create Project
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[93%] mx-auto" />
      <ProgressBar stages={stages} />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">
        <form className="flex flex-col space-y-4 p-4">

          <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject: </label>
              <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">UI/UX Designer</p>
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Contract Type: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">Freelance</p>
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Workplace: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">Remote</p>
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Category: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">IT</p>
  </div>
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">Kuala Lumpur, Malaysia</p>
  </div>
</div>
<div className="m-4 w-8/10">
  <div className="w-full">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Project Description: </label>
    <div className="w-full rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal" id="projectDescriptionSHow">
      <p>We're looking for someone who can create stunning websites and communications. Sounds like you? Good! Keep reading...</p>

      <ul className="preview myList">
    <li>Design aesthetically pleasing websites with good usability - from scratch (Figma) or from pre-designed themes</li>
    <li>Eye for detail a must - able to spot an alignment that is off by 1 pixel!</li>
    <li>Well-versed in Wordpress and Elementor</li>
    <li>Able to multi-task and manage your tasks in a timely manner</li>
    <li>Collaborate with the web development team</li>
    <li>Good communication skills in English</li>
    <li>Keen to skill up and learn new things</li>
    <li>Meticulous, self-motivated and team-orientated</li>
  </ul>

  <p>Benefits:</p>

  <ul className="preview myList">
    <li>Competitive salary</li>
    <li>Dental and medical claims</li>
    <li>Annual leave</li>
    <li>Sick leave</li>
    <li>Frequent team bonding activities</li>
    <li>Educational workshops</li>
    <li>Work from Home</li>
  </ul>

  <p>Why Us:</p>

  <ul className="preview myList">
    <li>Get access to the Heroes of Digital University, where you'll get to learn how we consistently beat professional benchmarks by 100-300% and save marketing costs of up to 50% for our clients.</li>
    <li>You'll be part of a passionate and talented group of digital marketers who are constantly learning and improving their skills.</li>
    <li>Solid career prospects with upward mobility. We have a results-driven culture.</li>
    <li>Awesome team culture and positive environment.</li>
    <li>Our office inspires you to do your best work, as well as being close to public transport systems and amenities.</li>
    <li>Learn, grow, and help - Get to do all 3 together.</li>
    <li>Frequent team bonding activities</li>
    <li>Work-from-home days</li>
    <li>We believe in investing in good people! Heroes of Digital is a fast-growing company. There are endless opportunities to learn and advance your skillset.</li>
  </ul>
</div>
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Project Start Time: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">14/05/2024</p>
    <label className="block /text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Duration: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">2 week</p>
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Budget: </label>
 <div className="flex justify-between h-[40px] w-full items-center rounded-[10px] bg-white-A700 px-5 sm:w-full" id="duration">
  <div>
    <label className="font-bold mr-2">Min:</label>
    <span>100%</span>
  </div>
  <div>
    <label className="font-bold mr-2">Max:</label>
    <span>5 days per week</span>
  </div>
  <div>
    <label className="font-bold mr-2">MYR</label>
  </div>
</div>
  </div>
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Duration: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2"
 id="duration">2 week</p>
  </div>
</div>

<div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Project Responsibilities: </label>
              <div className="w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal"
 id="responsibilityShow">
 <p>1. User Research and Analysis:</p>
 <ul className="preview myList">
    <li>Conduct user research to understand user behaviors, needs, and motivations.</li>
    <li>Analyze data from user studies, interviews, and surveys to derive insights.</li>
    <li>Create user personas and user journey maps based on research findings.</li>
  </ul>

  <p>2. UI Design:</p>
  <ul className="preview myList">
    <li>Design user interfaces for digital products such as websites, mobile apps, and software applications.</li>
    <li>Develop wireframes, prototypes, and mockups to visualize design concepts.</li>
    <li>Ensure UI designs are visually appealing, user-friendly, and consistent with brand guidelines.</li>
  </ul>

  <p>3. UX Design:</p>
  <ul className="preview myList">
    <li>Define and refine user flows, interactions, and information architecture.</li>
    <li>Collaborate with stakeholders to define product requirements and features.</li>
    <li>Conduct usability testing and gather feedback for iterative design improvements.</li>
  </ul>

  <p>4. Prototyping and Testing:</p>
  <ul className="preview myList">
    <li>Create interactive prototypes using tools like Figma, Sketch, Adobe XD, or InVision.</li>
    <li>Conduct usability tests and iterate designs based on user feedback and usability findings.</li>
    <li>Optimize designs for responsiveness, accessibility, and cross-platform compatibility.</li>
  </ul>
 </div>
            </div>
          </div>

          <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Preferred Qualification: </label>
            <div className="w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal" id="qualificationShow">
  <ul className="preview myList">
    <li>Minimum 2 years of agency experience</li>
    <li>Diploma or Degree in design-related fields</li>
    <li>Experienced in Figma, Adobe Photoshop/Illustrator, Wordpress and Elementor</li>
    <li>Some experience in other platforms such as Duda and Wix a plus</li>
    <li>Experience working with project management tools such as Monday.com, Asana etc</li>
    <li>Knowledge of HTML/CSS, UI/UX will be a big plus</li>
    <li>Experience in managing projects and interfacing with clients will be a huge bonus.</li>
    <li>Must be able to write, read, and speak English fluently.</li>
  </ul>
</div>
</div>
          </div>

          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Preferred Skill: </label>
    <div className="flex">
  <div className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
    <span>#IT</span>
  </div>
  <div className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
    <span>#Front-end</span>
  </div>
</div>
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Keyword: </label>
<div className="flex">
  <div className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
    <span>#IT</span>
  </div>
  <div className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
    <span>#Front-end</span>
  </div>
</div>
 
  </div>
  <div className="w-1/2">
    
  </div>
</div>

<div className="pt-5">
<div className="flex justify-between w-8/10 m-4" >
  <div className="w-1/4">
    <button onClick={handlePreviousButtonClick} type="button" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Previous
    </button>
  </div>
  <div className="w-1/4">
    <button onClick={handleNextButtonClick} type="next2" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Post
    </button>
  </div>
</div>
</div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPreview;