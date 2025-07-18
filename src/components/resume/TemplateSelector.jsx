import { useResume } from '../../context/ResumeContext';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch',
    thumbnail: '🎨' // Replace with actual thumbnail image
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume layout that works for all industries',
    thumbnail: '📄'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with a unique and creative design',
    thumbnail: '✨'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    thumbnail: '⚡'
  }
];

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => setSelectedTemplate(template.id)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTemplate === template.id
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-200'
          }`}
        >
          <div className="text-4xl mb-2">{template.thumbnail}</div>
          <h3 className="font-medium text-gray-900">{template.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
        </button>
      ))}
    </div>
  );
}
