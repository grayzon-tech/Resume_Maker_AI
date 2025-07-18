import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { generateContent } from '../../../config/gemini';

export default function Projects() {
  const { resumeData, updateSection } = useResume();
  const [loading, setLoading] = useState(false);

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      technologies: '',
      startDate: '',
      endDate: '',
      description: '',
      link: ''
    };
    updateSection('projects', [...resumeData.projects, newProject]);
  };

  const updateProject = (id, field, value) => {
    const updatedProjects = resumeData.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateSection('projects', updatedProjects);
  };

  const removeProject = (id) => {
    const filteredProjects = resumeData.projects.filter(proj => proj.id !== id);
    updateSection('projects', filteredProjects);
  };

  const generateDescription = async (id, title, technologies) => {
    setLoading(true);
    try {
      const prompt = `Generate 2-3 impactful bullet points describing a project titled "${title}" using ${technologies}. 
        Focus on the problem solved, technical implementation, and measurable outcomes. Use action verbs and quantify achievements where possible.`;
      
      const description = await generateContent(prompt);
      updateProject(id, 'description', description);
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {resumeData.projects.map((project) => (
        <div key={project.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Project Details</h3>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              onClick={() => generateDescription(project.id, project.title, project.technologies)}
              disabled={loading || !project.title || !project.technologies}
              className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate AI Description'}
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Project
      </button>
    </div>
  );
}
