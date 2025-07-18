import React, { useState } from 'react';
import { useCoverLetter } from '../../context/CoverLetterContext';
import { generateContent } from '../../config/huggingface';
import CoverLetterForm from './CoverLetterForm';
import CoverLetterPreview from './preview/CoverLetterPreview';
import TemplateSelector from './TemplateSelector';

const CoverLetterBuilder = () => {
  const { coverLetterData, updateCoverLetter } = useCoverLetter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('form');

  const generateSection = async (section) => {
    if (!coverLetterData.jobTitle || !coverLetterData.companyName) {
      setError('Please fill in the job title and company name first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      let prompt = '';
      const baseContext = `
      Job Title: ${coverLetterData.jobTitle}
      Company: ${coverLetterData.companyName}
      Job Description: ${coverLetterData.jobDescription}
      Key Requirements: ${coverLetterData.keyRequirements.join(', ')}
      Recipient: ${coverLetterData.recipientName || 'Hiring Manager'}
      `;

      switch (section) {
        case 'introduction':
          prompt = `Write a compelling and professional introduction paragraph for a cover letter with the following context:
          ${baseContext}
          
          Guidelines:
          - Start with a professional greeting using the recipient's name if provided
          - Express genuine enthusiasm for the position and company
          - Mention how you learned about the position (if applicable)
          - Keep it concise (2-3 sentences)
          - Make it engaging and tailored to the role
          
          Write only the introduction paragraph, no greeting or salutation needed.`;
          break;

        case 'body':
          prompt = `Write the body paragraphs for a cover letter with the following context:
          ${baseContext}
          
          Guidelines:
          - Write 2-3 concise paragraphs
          - Focus on matching your experience with the job requirements
          - Use specific examples and achievements
          - Demonstrate knowledge of the company
          - Explain why you're a perfect fit for the role
          - Use active voice and professional tone
          - Keep each paragraph focused on one main point
          
          Write only the body paragraphs.`;
          break;

        case 'conclusion':
          prompt = `Write a strong concluding paragraph for a cover letter with the following context:
          ${baseContext}
          
          Guidelines:
          - Express confidence in your ability to contribute to the company
          - Reiterate your interest in the position
          - Include a clear call to action (e.g., looking forward to discussing)
          - Thank the reader for their time and consideration
          - Keep it concise and professional
          - End with a professional closing
          
          Write only the conclusion paragraph, no signature needed.`;
          break;

        default:
          throw new Error('Invalid section');
      }

      const content = await generateContent(prompt);
      if (!content) {
        throw new Error('No content generated. Please try again.');
      }
      updateCoverLetter(section, content.trim());
    } catch (error) {
      console.error('Error generating section:', error);
      setError('Failed to generate content. Please ensure you have provided your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateCoverLetter = async () => {
    if (!coverLetterData.jobTitle || !coverLetterData.companyName) {
      setError('Please fill in the job title and company name first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const prompt = `Write a professional cover letter for the following position:
      
      Job Title: ${coverLetterData.jobTitle}
      Company: ${coverLetterData.companyName}
      Job Description: ${coverLetterData.jobDescription}
      Key Requirements: ${coverLetterData.keyRequirements.join(', ')}
      Recipient: ${coverLetterData.recipientName || 'Hiring Manager'}

      Guidelines:
      1. Write a complete cover letter with three distinct sections:
         - A compelling introduction (expressing interest and how you found the position)
         - 2-3 body paragraphs (matching your experience with job requirements)
         - A strong conclusion (with call to action and thank you)
      2. Use a professional tone
      3. Keep paragraphs concise and focused
      4. Demonstrate knowledge of the company
      5. Use specific examples and achievements
      6. Make it engaging and tailored to the role

      Format the response in clear paragraphs separated by double line breaks.
      Do not include any greetings, salutations, or signatures.`;

      const response = await generateContent(prompt);
      if (!response) {
        throw new Error('No content generated. Please try again.');
      }

      const sections = parseCoverLetter(response);
      updateCoverLetter('introduction', sections.introduction);
      updateCoverLetter('body', sections.body);
      updateCoverLetter('conclusion', sections.conclusion);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setError('Failed to generate content. Please ensure you have provided your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const parseCoverLetter = (text) => {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    return {
      introduction: paragraphs[0] || '',
      body: paragraphs.slice(1, -1).join('\n\n') || '',
      conclusion: paragraphs[paragraphs.length - 1] || ''
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cover Letter Builder</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a professional cover letter with AI assistance
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('form')}
                className={`${
                  activeTab === 'form'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`${
                  activeTab === 'preview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Preview
              </button>
            </nav>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            {activeTab === 'form' ? (
              <div className="space-y-8">
                <TemplateSelector />
                <CoverLetterForm
                  loading={loading}
                  onGenerateComplete={generateCoverLetter}
                  onGenerateSection={generateSection}
                />
              </div>
            ) : (
              <CoverLetterPreview />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverLetterBuilder;
