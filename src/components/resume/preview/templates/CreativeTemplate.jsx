export default function CreativeTemplate({ data }) {
  const { personalInfo, workExperience, education, skills, projects, certifications, hobbies } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <header className="relative mb-12 pb-8">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-600 rounded-full opacity-10"></div>
        <div className="relative">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {personalInfo.fullName}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {personalInfo.location}
              </span>
            )}
          </div>
          {personalInfo.professionalSummary && (
            <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-3xl">
              {personalInfo.professionalSummary}
            </p>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-6">Experience</h2>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <div className="text-indigo-600 font-medium">{exp.company} • {exp.location}</div>
                    <div className="text-gray-500 text-sm">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-6">Projects</h2>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <div className="text-indigo-600 mt-1">{project.technologies}</div>
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-indigo-600 hover:text-indigo-800"
                      >
                        View Project
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white shadow-sm rounded-full text-indigo-600 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <div className="text-gray-600">{edu.school}</div>
                    <div className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </div>
                    {edu.description && (
                      <p className="mt-2 text-gray-700 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <div className="text-gray-600 text-sm">{cert.issuer}</div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 text-sm inline-flex items-center mt-1"
                      >
                        Verify →
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
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
