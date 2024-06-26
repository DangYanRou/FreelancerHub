import React, { useState } from 'react';
import { ProjectContext } from './ProjectContext';

export const ProjectInfoProvider = ({ children }) => {
  const [project, setProject] = useState({
    title: '',
    minInput: '',
    maxInput: '',
    location: '',
    description: '',
    category: '',
    workPlace: '',
    currencyInput: 'MYR',
    date: null,
    workload: '',
    duration: '',
    durationUnit: 'day(s)',
    preferredQualification: '',
    jobResponsibilities: [],
    preferredSkills: [],
    keywords: [],
    statusState: 1,
    postedTime: new Date()

});



  return (
    <ProjectContext.Provider value={[project, setProject]}>
      {children}
    </ProjectContext.Provider>
  );
};
