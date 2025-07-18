export default function ModernTemplate({ data }) {
  const { personalInfo, workExperience, education, skills, projects, certifications, hobbies } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b-2 border-indigo-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {personalInfo.location}
            </span>
          )}
        </div>
        {personalInfo.professionalSummary && (
          <p className="mt-4 text-gray-700">{personalInfo.professionalSummary}</p>
        )}
      </header>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-indigo-200 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{exp.position}</h3>
                <div className="text-gray-600">
                  {exp.company} • {exp.location}
                </div>
                <div className="text-gray-500 text-sm">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-indigo-200 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{edu.degree} in {edu.field}</h3>
                <div className="text-gray-600">{edu.school} • {edu.location}</div>
                <div className="text-gray-500 text-sm">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </div>
                {edu.description && (
                  <p className="mt-2 text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border-l-2 border-indigo-200 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
                <div className="text-gray-600">{project.technologies}</div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    View Project →
                  </a>
                )}
                <p className="mt-2 text-gray-700 whitespace-pre-line">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border-l-2 border-indigo-200 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{cert.name}</h3>
                <div className="text-gray-600">{cert.issuer}</div>
                <div className="text-gray-500 text-sm">
                  Issued: {cert.issueDate}
                  {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    Verify Credential →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {hobby}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
