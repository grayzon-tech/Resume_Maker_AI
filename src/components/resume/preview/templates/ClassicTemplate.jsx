export default function ClassicTemplate({ data }) {
  const { personalInfo, workExperience, education, skills, projects, certifications, hobbies } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto font-serif">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">
          {personalInfo.fullName}
        </h1>
        <div className="mt-3 text-gray-600 space-x-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {personalInfo.professionalSummary && (
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{personalInfo.professionalSummary}</p>
        )}
      </header>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-gray-700 italic">{exp.company} • {exp.location}</div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="text-gray-700 italic">{edu.school} • {edu.location}</div>
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
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-gray-700">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{project.title}</h3>
                  <span className="text-gray-600">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <div className="text-gray-700 italic">{project.technologies}</div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-bold">{cert.name}</h3>
                <div className="text-gray-700">
                  {cert.issuer} • Issued: {cert.issueDate}
                  {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Verify
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Interests
          </h2>
          <div className="text-gray-700">
            {hobbies.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
}
