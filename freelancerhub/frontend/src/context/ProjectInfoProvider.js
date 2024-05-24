import React, { useState } from 'react';
import { ProjectContext } from './ProjectContext';

export const ProjectInfoProvider = ({ children }) => {
  const [project, setProject] = useState({
    projectName: '',
    minInput: '',
    maxInput: '',
    locationInput: '',
    descriptionInput: '',
    jobCateInput: '',
    workPlaceSelect: '',
    currencyInput: '',
    descriptionInput: '',
    startDate: new Date(),
    workloadOptions: '',
    duration: '',
    durationUnit: '',
    responsibilitiesInput: '',
    qualificationInput: '',
    skills: [],
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