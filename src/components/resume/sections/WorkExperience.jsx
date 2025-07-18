import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { generateContent } from '../../../config/huggingface';

export default function WorkExperience() {
  const { resumeData, updateSection } = useResume();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateSection('workExperience', [...resumeData.workExperience, newExperience]);
  };

  const updateExperience = (id, field, value) => {
    const updatedExperiences = resumeData.workExperience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateSection('workExperience', updatedExperiences);
  };

  const removeExperience = (id) => {
    const filteredExperiences = resumeData.workExperience.filter(exp => exp.id !== id);
    updateSection('workExperience', filteredExperiences);
  };

  const generateDescription = async (id, position, company) => {
    setLoading(true);
    setError('');
    try {
      const prompt = `You are a professional resume writer. Write 3-4 specific bullet points for ${position} position at ${company}. Each bullet point must start with an action verb and include specific achievements, skills, or responsibilities.

Example format:
• Led cross-functional team of 5 members to deliver project ahead of schedule
• Developed and implemented new process that reduced workflow time by 25%

Your response:`;
      
      const description = await generateContent(prompt);
      if (description) {
        // Clean up the response and ensure proper bullet point format
        const cleanedDescription = description
          .split(/\n|•/)  // Split by newlines or bullet points
          .map(point => point.trim())  // Trim whitespace
          .filter(point => point.length > 0)  // Remove empty lines
          .map(point => `• ${point.replace(/^[-•]?\s*/, '')}`)  // Ensure consistent bullet points
          .join('\n');  // Join with newlines
        
        updateExperience(id, 'description', cleanedDescription);
      } else {
        setError('Failed to generate description. Please try again.');
      }
    } catch (error) {
      console.error('Error generating description:', error);
      setError(error.message || 'Failed to generate description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {resumeData.workExperience.map((experience) => (
        <div key={experience.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Work Experience</h3>
            <button
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your position"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <div className="flex items-center space-x-4">
                <input
                  type="month"
                  value={experience.endDate}
                  disabled={experience.current}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => {
                      updateExperience(experience.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(experience.id, 'endDate', '');
                      }
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Current</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Describe your responsibilities and achievements..."
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            <div className="mt-2 flex items-center space-x-2">
              <button
                onClick={() => generateDescription(experience.id, experience.position, experience.company)}
                disabled={loading || !experience.position || !experience.company}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate AI Description'
                )}
              </button>
              {(!experience.position || !experience.company) && (
                <span className="text-sm text-gray-500">
                  Enter position and company to generate
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Work Experience
      </button>
    </div>
  );
}
