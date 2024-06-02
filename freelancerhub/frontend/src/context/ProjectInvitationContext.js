import React, { createContext, useState } from 'react';

// Create the context
const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
  const [emailSubject, setEmailSubject] = useState('do this job!');
  const [emailContent, setEmailContent] = useState('please lah accept eh');
  const [emailClient, setEmailClient] = useState('22004796@siswa.um.edu.my');
  const [selectedUsers, setSelectedUsers] = useState(['KKGcrVGUyAOBDJ1rXMCffElkK5u2', undefined, 'blacksheep', 'snowmanchin03@gmail.com', false]);

  return (
    <EmailContext.Provider value={{
      emailSubject, setEmailSubject,
      emailContent, setEmailContent,
      emailClient, setEmailClient,
      selectedUsers, setSelectedUsers
    }}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailContext;