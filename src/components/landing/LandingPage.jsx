import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  SparklesIcon, 
  PencilSquareIcon, 
  CloudArrowDownIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'AI-Powered Content Generation',
    description: 'Leverage advanced AI to create compelling resumes and cover letters tailored to your industry.',
    icon: SparklesIcon,
  },
  {
    title: 'Professional Templates',
    description: 'Choose from a variety of ATS-friendly templates designed by industry experts.',
    icon: DocumentTextIcon,
  },
  {
    title: 'Real-Time Editor',
    description: 'Edit and preview your documents in real-time with our intuitive interface.',
    icon: PencilSquareIcon,
  },
  {
    title: 'One-Click Export',
    description: 'Export your documents in multiple formats including PDF, Word, and plain text.',
    icon: CloudArrowDownIcon,
  },
];

const benefits = [
  'ATS-Optimized Templates',
  'AI Content Generation',
  'Professional Formatting',
  'Industry-Specific Keywords',
  'Multiple Export Options',
  'Real-Time Preview',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Create Professional Resumes & Cover Letters with{' '}
              <span className="text-indigo-600">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stand out from the crowd with professionally crafted resumes and cover letters. 
              Our AI-powered platform helps you create compelling documents in minutes.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/resume-builder"
                className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Success
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with professional design 
            to help you create standout resumes and cover letters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl"
            >
              <div className="absolute -top-4 left-6">
                <span className="inline-block p-3 bg-indigo-100 rounded-xl">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">
              Get everything you need to create professional, ATS-friendly documents 
              that help you land your dream job.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <CheckCircleIcon className="w-6 h-6 text-indigo-400" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative p-8 sm:p-12 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs 
            using our platform. Start creating your professional resume today!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/resume-builder"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
            >
              Start Building Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
