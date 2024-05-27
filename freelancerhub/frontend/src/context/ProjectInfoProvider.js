import React, { useState } from 'react';
import { ProjectContext } from './ProjectContext';

export const ProjectInfoProvider = ({ children }) => {
  const [project, setProject] = useState({
    title: '',
    minInput: 0,
    maxInput: 0,
    location: '',
    description: '',
    category: '',
    workPlace: '',
    currencyInput: 'MYR',
    date: new Date(),
    workload: '',
    duration: 0,
    durationUnit: 'days',
    preferredQualification: '',
    jobResponsibilities: [],
    preferredSkills: [],
    keywords: [],
    statusState: 1
});

  return (
    <ProjectContext.Provider value={[project, setProject]}>
      {children}
    </ProjectContext.Provider>
  );
};