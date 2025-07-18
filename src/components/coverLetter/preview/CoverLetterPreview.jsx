import { useCoverLetter } from '../../../context/CoverLetterContext';

const fontClasses = {
  inter: 'font-inter',
  roboto: 'font-roboto',
  poppins: 'font-poppins',
  opensans: 'font-opensans'
};

const fontSizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg'
};

const spacingClasses = {
  compact: 'space-y-4',
  normal: 'space-y-6',
  relaxed: 'space-y-8'
};

const colorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  gray: 'text-gray-600'
};

const templates = {
  modern: {
    containerClass: 'max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg',
    headerClass: 'mb-8',
    contentClass: 'prose max-w-none'
  },
  classic: {
    containerClass: 'max-w-2xl mx-auto p-8 bg-white border-2 border-gray-200',
    headerClass: 'mb-8 text-center',
    contentClass: 'prose max-w-none'
  },
  creative: {
    containerClass: 'max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl',
    headerClass: 'mb-8 border-b-2',
    contentClass: 'prose max-w-none'
  },
  minimal: {
    containerClass: 'max-w-2xl mx-auto p-8 bg-white',
    headerClass: 'mb-8',
    contentClass: 'prose max-w-none'
  }
};

export default function CoverLetterPreview() {
  const { coverLetterData } = useCoverLetter();
  const { customizations, selectedTemplate } = coverLetterData;
  const template = templates[selectedTemplate];

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gray-50 p-8">
      <div className={`${template.containerClass} ${fontClasses[customizations.font]} ${fontSizeClasses[customizations.fontSize]}`}>
        <div className={template.headerClass}>
          <div className="mb-8">
            <p>{today}</p>
          </div>
          
          <div className="mb-4">
            <p>{coverLetterData.recipientName}</p>
            <p>{coverLetterData.companyName}</p>
          </div>
        </div>

        <div className={`${template.contentClass} ${spacingClasses[customizations.spacing]}`}>
          <div className={colorClasses[customizations.color]}>
            <p>Dear {coverLetterData.recipientName || '[Recipient Name]'},</p>
          </div>

          <div>
            <p>{coverLetterData.introduction || '[Your introduction will appear here]'}</p>
          </div>

          <div className="whitespace-pre-wrap">
            {coverLetterData.body || '[Your body paragraphs will appear here]'}
          </div>

          <div>
            <p>{coverLetterData.conclusion || '[Your conclusion will appear here]'}</p>
          </div>

          <div className="mt-8">
            <p>Sincerely,</p>
            <p>[Your Name]</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
