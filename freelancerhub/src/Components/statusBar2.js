import React, { useState, useEffect } from 'react';
import './statusBar.css';
import { TiTick } from 'react-icons/ti';
import { db } from '../firebase';  // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';

const StatusBar = ({ projectId }) => {
    const steps = ['Applied', 'Assigned', 'In Progress', 'Completed'];
    const [currentStep, setCurrentStep] = useState(0); // Default to 0 or an appropriate initial value

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const projectDocRef = doc(db, 'projects', projectId);
                const projectDoc = await getDoc(projectDocRef);
                if (projectDoc.exists()) {
                    const data = projectDoc.data();
                    setCurrentStep(data.statusState);  // Assuming the status field is a number representing the current step
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching status: ", error);
            }
        };

        fetchStatus();
    }, [projectId]);

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

export default StatusBar;
