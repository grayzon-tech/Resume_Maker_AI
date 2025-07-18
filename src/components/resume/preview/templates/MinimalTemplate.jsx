export default function MinimalTemplate({ data }) {
  const { personalInfo, workExperience, education, skills, projects, certifications, hobbies } = data;

  return (
    <div className="p-8 max-w-3xl mx-auto font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {personalInfo.fullName}
        </h1>
        <div className="mt-2 text-sm text-gray-600 space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {personalInfo.professionalSummary && (
          <p className="mt-4 text-gray-700">{personalInfo.professionalSummary}</p>
        )}
      </header>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <div className="text-gray-600 text-sm">{exp.company} • {exp.location}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                    <div className="text-gray-600 text-sm">{edu.school} • {edu.location}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-1 text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm text-gray-700"
              >
                {index > 0 ? ' • ' : ''}{skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.title}</h3>
                  <div className="text-gray-500 text-sm">
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </div>
                </div>
                <div className="text-gray-600 text-sm">{project.technologies}</div>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 text-sm"
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
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-medium">{cert.name}</h3>
                <div className="text-gray-600 text-sm">
                  {cert.issuer} • {cert.issueDate}
                  {cert.expiryDate && ` - ${cert.expiryDate}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Interests
          </h2>
          <p className="text-sm text-gray-700">
            {hobbies.join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}
