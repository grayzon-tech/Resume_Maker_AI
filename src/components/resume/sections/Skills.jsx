import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { generateContent } from '../../../config/gemini';

export default function Skills() {
  const { resumeData, updateSection } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      updateSection('skills', [...resumeData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    const filteredSkills = resumeData.skills.filter(skill => skill !== skillToRemove);
    updateSection('skills', filteredSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestSkills = async () => {
    setLoading(true);
    try {
      const workExperience = resumeData.workExperience.map(exp => 
        `${exp.position} at ${exp.company}`
      ).join(', ');

      const prompt = `Based on the following work experience: ${workExperience || 'Not specified'}, 
        suggest 5-8 relevant technical and soft skills that would be valuable to include in a resume. 
        Format the response as a comma-separated list.`;
      
      const suggestedSkills = await generateContent(prompt);
      const skillsArray = suggestedSkills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill && !resumeData.skills.includes(skill));
      
      updateSection('skills', [...resumeData.skills, ...skillsArray]);
    } catch (error) {
      console.error('Error suggesting skills:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Add Skills</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter a skill"
          />
          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <button
          onClick={suggestSkills}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Suggesting...' : 'Suggest Skills with AI'}
        </button>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Your Skills</h4>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 inline-flex items-center p-0.5 rounded-full text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
