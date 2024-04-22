import React from 'react';
import workImage from '../../Gallery/work.png';
import noteImage from '../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import NavigationBarClients from './NavigationBarClient';



// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
        <div key={index} className={`stage-container w-1/4 ${index !== stages.length - 1 ? 'border-r' : ''}`}>
        <div className="stage flex flex-col items-center px-4">
            <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Preview' ? '#213E60' : '#E9EBFD' }}>
              <img src={stage.title === 'Preview' ? workImage : noteImage} alt="Stage icon" />
            </div>
            <div className="title font-bold">{stage.title}</div>
            <div>{stage.step}</div>
          </div>
        </div>
      ))}
    </div>
  );
};



const CreateProjectPreview = () => {

  const navigate = useNavigate();

  const handleNextButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project");
  };

  //edit here to navigate to posted part
  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project-invite");
  };

  // Define the stages of project creation
  const stages = [
    { title: 'Job Details', step: 'Step 1/5' },
    { title: 'Job Description', step: 'Step 2/5' },
    { title: 'Preferred', step: 'Step 3/5' },
    { title: 'Invite', step: 'Step 4/5' },
    { title: 'Preview', step: 'Step 5/5' },
  ];


  return (
    <div className="flex flex-col items-start justify-center">
                        <NavigationBarClients/>

      <h1 className="text-4xl mb-5 mt-10 font-bold pl-16">Create Project</h1>
      <div className="w-11/12 h-px bg-black mb-5 mx-auto"></div>
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
<div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Job Description: </label>
              <p className="w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal"
 id="duration">
    We're looking for someone who can create stunning websites and communications. Sounds like you? Good! Keep reading...
<br></br>
- Design aesthetically pleasing websites with good usability - from scratch (Figma) or from pre-designed themes

- Eye for detail a must - able to spot an alignment that is off by 1 pixel!

- Well-versed in Wordpress and Elementor

- Able to multi-task and manage your tasks in a timely manner
<br></br>
- Collaborate with the web development team
<br></br>
- Good communication skills in English
<br></br>
- Keen to skill up and learn new things
<br></br>
- Meticulous, self-motivated and team-orientated
<br></br>
Benefits:
<br></br>
- Competitive salary
<br></br>
- Dental and medical claims
<br></br>
- Annual leave
<br></br>
- Sick leave
<br></br>
- Frequent team bonding activities
<br></br>
- Educational workshops
<br></br>
- Work from Home
<br></br>

Why Us:
<br></br>
- Get access to the Heroes of Digital University, where you'll get to learn how we consistently beat professional benchmarks by 100-300% and save marketing costs of up to 50% for our clients.
<br></br>
- You'll be part of a passionate and talented group of digital marketers who are constantly learning and improving their skills.
<br></br>
- Solid career prospects with upward mobility. We have a results-driven culture.
<br></br>
- Awesome team culture and positive environment.
<br></br>
- Our office inspires you to do your best work, as well as being close to public transport systems and amenities.
<br></br>
- Learn, grow, and help - Get to do all 3 together.
<br></br>
- Frequent team bonding activities
<br></br>
- Work-from-home days
<br></br>
- We believe in investing in good people! Heroes of Digital is a fast-growing company. There are endless opportunities to learn and advance your skillset.
 </p>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Job Responsibilities: </label>
              <p className="w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal"
 id="duration">bra bra bra bra bra bra bra bra 
 bra bra bra bra bra bra bra bra bra bra bra bra bra bra bra bra bra bra bra 
 bra bra bra bra <br></br>bra bra bra brabra bra bra bra
 </p>
            </div>
          </div>

          <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Preferred Qualification: </label>
<p className="w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal"
 id="duration">
- Minimum 2 years of agency experience
<br></br>
- Diploma or Degree in design-related fields
<br></br>
- Experienced in Figma, Adobe Photoshop/Illustrator, Wordpress and Elementor
<br></br>
- Some experience in other platforms such as Duda and Wix a plus
<br></br>
- Experience working with project management tools such as Monday.com, Asana etc
<br></br>
- Knowledge of HTML/CSS, UI/UX will be a big plus
<br></br>
- Experience in managing projects and interfacing with clients will be a huge bonus.
<br></br>
- Must be able to write, read, and speak English fluently.
</p>
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