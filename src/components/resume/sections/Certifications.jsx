import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { generateContent } from '../../../config/gemini';

export default function Certifications() {
  const { resumeData, updateSection } = useResume();
  const [loading, setLoading] = useState(false);

  const addCertification = () => {
    const newCertification = {
      id: Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      description: ''
    };
    updateSection('certifications', [...resumeData.certifications, newCertification]);
  };

  const updateCertification = (id, field, value) => {
    const updatedCertifications = resumeData.certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    updateSection('certifications', updatedCertifications);
  };

  const removeCertification = (id) => {
    const filteredCertifications = resumeData.certifications.filter(cert => cert.id !== id);
    updateSection('certifications', filteredCertifications);
  };

  const generateDescription = async (id, name, issuer) => {
    setLoading(true);
    try {
      const prompt = `Generate a brief, impactful description of the "${name}" certification from ${issuer}. 
        Focus on the skills validated and the value this certification adds to a professional profile.`;
      
      const description = await generateContent(prompt);
      updateCertification(id, 'description', description);
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {resumeData.certifications.map((certification) => (
        <div key={certification.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Certification Details</h3>
            <button
              onClick={() => removeCertification(certification.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certification Name</label>
              <input
                type="text"
                value={certification.name}
                onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
              <input
                type="text"
                value={certification.issuer}
                onChange={(e) => updateCertification(certification.id, 'issuer', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Date</label>
              <input
                type="month"
                value={certification.issueDate}
                onChange={(e) => updateCertification(certification.id, 'issueDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="month"
                value={certification.expiryDate}
                onChange={(e) => updateCertification(certification.id, 'expiryDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Credential ID</label>
              <input
                type="text"
                value={certification.credentialId}
                onChange={(e) => updateCertification(certification.id, 'credentialId', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Credential URL</label>
              <input
                type="url"
                value={certification.credentialUrl}
                onChange={(e) => updateCertification(certification.id, 'credentialUrl', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={certification.description}
              onChange={(e) => updateCertification(certification.id, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              onClick={() => generateDescription(certification.id, certification.name, certification.issuer)}
              disabled={loading || !certification.name || !certification.issuer}
              className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate AI Description'}
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Certification
      </button>
    </div>
  );
}
