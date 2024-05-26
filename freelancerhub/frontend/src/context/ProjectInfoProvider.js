import React, { useState } from 'react';
import { ProjectContext } from './ProjectContext';

export const ProjectInfoProvider = ({ children }) => {
  const [project, setProject] = useState({
    subject: '',
    minInput: '',
    maxInput: '',
    location: '',
    description: '',
    category: '',
    workPlace: '',
    currencyInput: 'MYR',
    descriptionInput: '',
    startDate: new Date(),
    workload: '',
    duration: '',
    durationUnit: 'day',
    jobResponsibilities: [],
    preferredQualification: '',
    preferredSkills: [],
    keywords: [],
    subjectInput: '',
    contentInput: '',
});

  return (
    <ProjectContext.Provider value={[project, setProject]}>
      {children}
    </ProjectContext.Provider>
  );
};