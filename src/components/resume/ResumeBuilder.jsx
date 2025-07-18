import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import PersonalInfo from './sections/PersonalInfo';
import WorkExperience from './sections/WorkExperience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Hobbies from './sections/Hobbies';
import TemplateSelector from './TemplateSelector';
import ResumePreview from './preview/ResumePreview';

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const { selectedTemplate } = useResume();

  const sections = [
    { id: 'personalInfo', label: 'Personal Information', component: PersonalInfo },
    { id: 'workExperience', label: 'Work Experience', component: WorkExperience },
    { id: 'education', label: 'Education', component: Education },
    { id: 'skills', label: 'Skills', component: Skills },
    { id: 'projects', label: 'Projects', component: Projects },
    { id: 'certifications', label: 'Certifications', component: Certifications },
    { id: 'hobbies', label: 'Hobbies', component: Hobbies },
  ];

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Form */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Build Your Resume</h2>
            
            {/* Template Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
              <TemplateSelector />
            </div>

            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Active Section Form */}
            <div className="mt-6">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            <div className="border rounded-lg p-4 bg-white">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
