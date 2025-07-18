import { useCoverLetter } from '../../context/CoverLetterContext';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch',
    preview: '🎨' // Replace with actual preview image
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format suitable for conservative industries',
    preview: '📄'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative industries',
    preview: '🎯'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    preview: '✨'
  }
];

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'roboto', name: 'Roboto' },
  { id: 'poppins', name: 'Poppins' },
  { id: 'opensans', name: 'Open Sans' }
];

const colors = [
  { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
  { id: 'green', name: 'Green', class: 'bg-green-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
  { id: 'gray', name: 'Gray', class: 'bg-gray-500' }
];

export default function TemplateSelector() {
  const { coverLetterData, updateCoverLetter, updateCustomization } = useCoverLetter();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Select Template</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => updateCoverLetter('selectedTemplate', template.id)}
              className={`relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 ${
                coverLetterData.selectedTemplate === template.id
                  ? 'border-indigo-500 ring-2 ring-indigo-500'
                  : 'border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{template.preview}</div>
                <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                <p className="mt-1 text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Font Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Font</label>
          <select
            value={coverLetterData.customizations.font}
            onChange={(e) => updateCustomization('font', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {fonts.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Font Size</label>
          <select
            value={coverLetterData.customizations.fontSize}
            onChange={(e) => updateCustomization('fontSize', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Spacing */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Spacing</label>
          <select
            value={coverLetterData.customizations.spacing}
            onChange={(e) => updateCustomization('spacing', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="compact">Compact</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Relaxed</option>
          </select>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
        <div className="grid grid-cols-4 gap-4">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => updateCustomization('color', color.id)}
              className={`h-8 w-full rounded-md ${color.class} ${
                coverLetterData.customizations.color === color.id
                  ? 'ring-2 ring-offset-2 ring-indigo-500'
                  : ''
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
