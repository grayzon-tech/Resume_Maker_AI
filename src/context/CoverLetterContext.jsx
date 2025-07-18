import { createContext, useContext, useState } from 'react';

const CoverLetterContext = createContext();

export const useCoverLetter = () => {
  const context = useContext(CoverLetterContext);
  if (!context) {
    throw new Error('useCoverLetter must be used within a CoverLetterProvider');
  }
  return context;
};

export function CoverLetterProvider({ children }) {
  const [coverLetterData, setCoverLetterData] = useState({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    keyRequirements: [],
    introduction: '',
    body: '',
    conclusion: '',
    selectedTemplate: 'modern',
    customizations: {
      font: 'inter',
      fontSize: 'medium',
      spacing: 'normal',
      color: 'blue'
    }
  });

  const updateCoverLetter = (field, value) => {
    setCoverLetterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateCustomization = (field, value) => {
    setCoverLetterData(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [field]: value
      }
    }));
  };

  return (
    <CoverLetterContext.Provider value={{
      coverLetterData,
      updateCoverLetter,
      updateCustomization
    }}>
      {children}
    </CoverLetterContext.Provider>
  );
}
