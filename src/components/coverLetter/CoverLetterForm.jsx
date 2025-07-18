import { useCoverLetter } from '../../context/CoverLetterContext';
import { useState } from 'react';

export default function CoverLetterForm({ loading, onGenerateComplete, onGenerateSection }) {
  const { coverLetterData, updateCoverLetter } = useCoverLetter();
  const [newRequirement, setNewRequirement] = useState('');

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      const updatedRequirements = [...coverLetterData.keyRequirements, newRequirement.trim()];
      updateCoverLetter('keyRequirements', updatedRequirements);
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = coverLetterData.keyRequirements.filter((_, i) => i !== index);
    updateCoverLetter('keyRequirements', updatedRequirements);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddRequirement();
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient's Name</label>
            <input
              type="text"
              value={coverLetterData.recipientName}
              onChange={(e) => updateCoverLetter('recipientName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Mr. John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={coverLetterData.companyName}
              onChange={(e) => updateCoverLetter('companyName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Acme Corporation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              value={coverLetterData.jobTitle}
              onChange={(e) => updateCoverLetter('jobTitle', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Job Details</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            value={coverLetterData.jobDescription}
            onChange={(e) => updateCoverLetter('jobDescription', e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Paste the job description here..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Key Requirements</label>
          <div className="mt-1 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={handleKeyPress}
                className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Type a requirement and press Enter or Add"
              />
              <button
                onClick={handleAddRequirement}
                disabled={!newRequirement.trim()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Add
              </button>
            </div>
            
            {/* Requirements List */}
            <div className="flex flex-wrap gap-2">
              {coverLetterData.keyRequirements.map((req, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700"
                >
                  {req}
                  <button
                    onClick={() => handleRemoveRequirement(index)}
                    className="ml-2 text-indigo-500 hover:text-indigo-600 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Letter Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Cover Letter Content</h3>
        
        {/* Introduction */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Introduction</label>
            <button
              onClick={() => onGenerateSection('introduction')}
              disabled={loading || !coverLetterData.jobTitle || !coverLetterData.companyName}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Generate Introduction
            </button>
          </div>
          <textarea
            value={coverLetterData.introduction}
            onChange={(e) => updateCoverLetter('introduction', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Body */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Body</label>
            <button
              onClick={() => onGenerateSection('body')}
              disabled={loading || !coverLetterData.jobTitle || !coverLetterData.companyName || coverLetterData.keyRequirements.length === 0}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Generate Body
            </button>
          </div>
          <textarea
            value={coverLetterData.body}
            onChange={(e) => updateCoverLetter('body', e.target.value)}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Conclusion */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Conclusion</label>
            <button
              onClick={() => onGenerateSection('conclusion')}
              disabled={loading || !coverLetterData.jobTitle || !coverLetterData.companyName}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Generate Conclusion
            </button>
          </div>
          <textarea
            value={coverLetterData.conclusion}
            onChange={(e) => updateCoverLetter('conclusion', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Generate Complete Letter */}
      <div className="flex justify-center">
        <button
          onClick={onGenerateComplete}
          disabled={loading || !coverLetterData.jobTitle || !coverLetterData.companyName || coverLetterData.keyRequirements.length === 0}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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
            'Generate Complete Letter'
          )}
        </button>
      </div>
    </div>
  );
}
