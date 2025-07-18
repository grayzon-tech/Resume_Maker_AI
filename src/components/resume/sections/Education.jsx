import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { generateContent } from '../../../config/gemini';

export default function Education() {
  const { resumeData, updateSection } = useResume();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startYear: '',
      startMonth: '',
      endYear: '',
      endMonth: '',
      current: false,
      description: ''
    };
    updateSection('education', [...resumeData.education, newEducation]);
  };

  const updateEducation = (id, field, value) => {
    const updatedEducation = resumeData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateSection('education', updatedEducation);
  };

  const removeEducation = (id) => {
    const filteredEducation = resumeData.education.filter(edu => edu.id !== id);
    updateSection('education', filteredEducation);
  };

  const generateDescription = async (id, degree, field, school) => {
    setLoading(true);
    setError('');
    try {
      const prompt = `Generate 2-3 bullet points highlighting key achievements and relevant coursework for a ${degree} in ${field} from ${school}. Focus on academic achievements, projects, and relevant skills gained.`;
      
      const description = await generateContent(prompt);
      if (description) {
        updateEducation(id, 'description', description);
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

  // Generate array of years from 1950 to current year + 10
  const years = Array.from({ length: 85 }, (_, i) => new Date().getFullYear() + 10 - i);
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  return (
    <div className="space-y-6">
      {resumeData.education.map((education) => (
        <div key={education.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Education</h3>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School/University</label>
              <input
                type="text"
                value={education.school}
                onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter school or university name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Bachelor's, Master's"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={education.location}
                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={education.startMonth}
                  onChange={(e) => updateEducation(education.id, 'startMonth', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <select
                  value={education.startYear}
                  onChange={(e) => updateEducation(education.id, 'startYear', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={education.endMonth}
                    onChange={(e) => updateEducation(education.id, 'endMonth', e.target.value)}
                    disabled={education.current}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Month</option>
                    {months.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={education.endYear}
                    onChange={(e) => updateEducation(education.id, 'endYear', e.target.value)}
                    disabled={education.current}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={education.current}
                    onChange={(e) => {
                      updateEducation(education.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateEducation(education.id, 'endMonth', '');
                        updateEducation(education.id, 'endYear', '');
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
              value={education.description}
              onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Describe your academic achievements, relevant coursework, and projects..."
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            <div className="mt-2 flex items-center space-x-2">
              <button
                onClick={() => generateDescription(education.id, education.degree, education.field, education.school)}
                disabled={loading || !education.degree || !education.field || !education.school}
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
              {(!education.degree || !education.field || !education.school) && (
                <span className="text-sm text-gray-500">
                  Fill in degree, field, and school to generate
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Education
      </button>
    </div>
  );
}
