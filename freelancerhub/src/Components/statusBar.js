import React from 'react';
import './statusBar.css'
import { useState } from 'react';
import { TiTick } from 'react-icons/ti';

const StatusBar = () => {
    const steps =['Applied','Assigned','In Progress','Completed'];
    const[currentStep,setCurrentStep]=useState(2);
    return(
  <>
    <div className="statusBar-container">
       {
        steps?.map((step,i)=>(
         <div key={i} className={`step-item ${currentStep===i+1 &&"active" } ${i+1<currentStep && "complete"}`}>
            <div className="step">{(i+1<currentStep)? <TiTick size={22} /> : i+1}
            </div> 
            <p className="text-gray-500">{step}</p>
             </div>  
        ))
       } 
    </div>
    </>
    );
};
  



export default StatusBar;