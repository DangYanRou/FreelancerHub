import React, { useState, useEffect } from 'react';
import './styles/statusBarClient.css';
import { TiTick } from 'react-icons/ti';


const StatusBarClient = ({ statusState }) => {
    const steps = ['Posted', 'Assigned', 'In Progress', 'Completed'];
    const [currentStep, setCurrentStep] = useState(0); // Default to 0 or an appropriate initial value

   
    useEffect(() => {
        setCurrentStep(statusState);
    }, [statusState]);// Only re-run the effect if stateStatus changes


    return (
        <div className="statusBar-container">
            {
                steps.map((step, i) => (
                    <div key={i} className={`step-item ${currentStep === i + 1 && "active"} ${i + 1 < currentStep && "complete"}`}>
                        <div className="step">
                            {i + 1 < currentStep ? <TiTick size={22} /> : i + 1}
                        </div>
                        <p className="text-gray-500">{step}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default StatusBarClient;
