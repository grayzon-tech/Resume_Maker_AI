import { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  return useContext(ResumeContext);
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    hobbies: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const updateSection = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const value = {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    updateSection,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}
