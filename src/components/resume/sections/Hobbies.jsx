import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { generateContent } from '../../../config/gemini';

export default function Hobbies() {
  const { resumeData, updateSection } = useResume();
  const [newHobby, setNewHobby] = useState('');
  const [loading, setLoading] = useState(false);

  const addHobby = () => {
    if (newHobby.trim() && !resumeData.hobbies.includes(newHobby.trim())) {
      updateSection('hobbies', [...resumeData.hobbies, newHobby.trim()]);
      setNewHobby('');
    }
  };

  const removeHobby = (hobbyToRemove) => {
    const filteredHobbies = resumeData.hobbies.filter(hobby => hobby !== hobbyToRemove);
    updateSection('hobbies', filteredHobbies);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHobby();
    }
  };

  const suggestHobbies = async () => {
    setLoading(true);
    try {
      const workExperience = resumeData.workExperience.map(exp => 
        `${exp.position} at ${exp.company}`
      ).join(', ');

      const prompt = `Suggest 5-6 professional and interesting hobbies/interests that would complement this person's profile:
        Work Experience: ${workExperience || 'Not specified'}
        Current Hobbies: ${resumeData.hobbies.join(', ') || 'None'}
        Suggest hobbies that show leadership, creativity, continuous learning, or relevant skills.
        Format the response as a comma-separated list.`;
      
      const suggestedHobbies = await generateContent(prompt);
      const hobbiesArray = suggestedHobbies
        .split(',')
        .map(hobby => hobby.trim())
        .filter(hobby => hobby && !resumeData.hobbies.includes(hobby));
      
      updateSection('hobbies', [...resumeData.hobbies, ...hobbiesArray]);
    } catch (error) {
      console.error('Error suggesting hobbies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Add Hobby/Interest</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter a hobby or interest"
          />
          <button
            type="button"
            onClick={addHobby}
            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <button
          onClick={suggestHobbies}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Suggesting...' : 'Get AI Suggestions'}
        </button>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Your Hobbies & Interests</h4>
        <div className="flex flex-wrap gap-2">
          {resumeData.hobbies.map((hobby, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {hobby}
              <button
                type="button"
                onClick={() => removeHobby(hobby)}
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
