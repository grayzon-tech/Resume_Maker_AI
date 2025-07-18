import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { generateContent } from '../../../config/huggingface';

export default function PersonalInfo() {
  const { resumeData, updateSection } = useResume();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('personalInfo', {
      ...resumeData.personalInfo,
      [name]: value
    });
  };

  const generateSummary = async () => {
    try {
      setLoading(true);
      const { fullName, currentPosition, yearsOfExperience, skills } = resumeData.personalInfo;
      
      const prompt = `As a professional resume writer, create a concise and impactful professional summary in exactly two sentences that highlights my expertise as a ${currentPosition}. Include my ${yearsOfExperience} years of experience and key skills in ${skills}. The summary should be written in first person and focus on professional achievements and strengths. Do not include any instructions or metadata in the response.`;

      const summary = await generateContent(prompt);
      
      updateSection('personalInfo', {
        ...resumeData.personalInfo,
        professionalSummary: summary
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={resumeData.personalInfo.fullName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Position</label>
          <input
            type="text"
            name="currentPosition"
            value={resumeData.personalInfo.currentPosition || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={resumeData.personalInfo.email || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={resumeData.personalInfo.phone || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={resumeData.personalInfo.location || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="City, Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years of Experience</label>
          <input
            type="text"
            name="yearsOfExperience"
            value={resumeData.personalInfo.yearsOfExperience || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="5+ years"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Key Skills</label>
          <input
            type="text"
            name="skills"
            value={resumeData.personalInfo.skills || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="JavaScript, React, Node.js, etc."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Professional Summary
            <button
              onClick={generateSummary}
              disabled={loading}
              className="ml-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Generating...' : 'Generate AI Summary'}
            </button>
          </label>
          <textarea
            name="professionalSummary"
            value={resumeData.personalInfo.professionalSummary || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            placeholder="Write a brief professional summary..."
          />
        </div>
      </div>
    </div>
  );
}
