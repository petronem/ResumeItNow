import { Fragment } from 'react';
import { Input } from '@/components/ui/input';
import type { TemplateProps } from './types';

export function MinimalTemplate({ resumeData, isEditing, updateField }: TemplateProps) {
  const EditableText = ({ 
    value, 
    onChange, 
    multiline = false,
    className = "",
    link = false,
  }: { 
    value: string, 
    onChange: (value: string) => void,
    multiline?: boolean,
    className?: string,
    link?: boolean,
  }) => {
    if (!isEditing) return link ? 
      <a href={value} target='_blank' className={className}>{value}</a> : 
      <span className={className}>{value}</span>;
    
    if (multiline) {
      return (
        <textarea
          className={`flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      );
    }
    
    return (
      <Input
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className={className}
      />
    );
  };

  const renderPersonalDetails = () => {
    const { personalDetails } = resumeData;
    const details = [];
    
    if (personalDetails.email) details.push(
      <EditableText
        key="email"
        value={personalDetails.email}
        onChange={(value) => updateField('personalDetails', null, 'email', value)}
        className="inline-block mx-2"
      />
    );

    if (personalDetails.phone) details.push(
      <EditableText
        key="phone"
        value={personalDetails.phone}
        onChange={(value) => updateField('personalDetails', null, 'phone', value)}
        className="inline-block mx-2"
      />
    );

    if (personalDetails.location) details.push(
      <EditableText
        key="location"
        value={personalDetails.location}
        onChange={(value) => updateField('personalDetails', null, 'location', value)}
        className="inline-block mx-2"
      />
    );

    return details.map((detail, index) => (
      <Fragment key={index}>
        {detail}
        {index < details.length - 1 && <span className="text-gray-400">•</span>}
      </Fragment>
    ));
  };

  const renderLinks = () => {
    const { personalDetails } = resumeData;
    const links = [];

    if (personalDetails.linkedin) links.push(
      <EditableText
        key="linkedin"
        value={personalDetails.linkedin}
        onChange={(value) => updateField('personalDetails', null, 'linkedin', value)}
        className="text-blue-600 hover:underline inline-block mx-2 text-sm"
        link={true}
      />
    );

    if (personalDetails.github) links.push(
      <EditableText
        key="github"
        value={personalDetails.github}
        onChange={(value) => updateField('personalDetails', null, 'github', value)}
        className="text-blue-600 hover:underline inline-block mx-2 text-sm"
        link={true}
      />
    );

    return links.map((link, index) => (
      <Fragment key={index}>
        {link}
        {index < links.length - 1 && <span className="text-gray-400">•</span>}
      </Fragment>
    ));
  };

  const hasContent = (section: unknown): boolean => {
    if (!section) return false;
    if (Array.isArray(section)) return section.length > 0;
    if (typeof section === 'object' && section !== null) {
      return Object.values(section).some(value => 
        typeof value === 'string' ? value.trim() !== '' : Boolean(value)
      );
    }
    return typeof section === 'string' ? section.trim() !== '' : Boolean(section);
  };

  return (
    <div className="max-w-[21cm] mx-auto bg-white shadow-lg p-8">
      {/* Personal Details Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-800 text-center mb-3">
          <EditableText
            value={resumeData.personalDetails.fullName}
            onChange={(value) => updateField('personalDetails', null, 'fullName', value)}
          />
        </h1>
        <div className="text-center text-gray-600 text-sm">
          {renderPersonalDetails()}
        </div>
        <div className="text-center mt-2">
          {renderLinks()}
        </div>
      </div>

      {/* Professional Summary */}
      {hasContent(resumeData.objective) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 border-b-2 border-gray-800 pb-1">Professional Summary</h2>
          <EditableText
            value={resumeData.objective}
            onChange={(value) => updateField('objective', null, 'objective', value)}
            multiline
            className="text-gray-700 text-sm leading-relaxed"
          />
        </div>
      )}

      {/* Work Experience Section */}
      {hasContent(resumeData.workExperience) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 border-b-2 border-gray-800 pb-1">Work Experience</h2>
          {resumeData.workExperience.map((experience, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <EditableText
                  value={experience.jobTitle}
                  onChange={(value) => updateField('workExperience', index, 'jobTitle', value)}
                  className="font-semibold text-gray-800"
                />
                <div className="text-gray-600 text-sm">
                  <EditableText
                    value={experience.startDate}
                    onChange={(value) => updateField('workExperience', index, 'startDate', value)}
                    className="inline"
                  />
                  <span> - </span>
                  <EditableText
                    value={experience.endDate}
                    onChange={(value) => updateField('workExperience', index, 'endDate', value)}
                    className="inline"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <EditableText
                  value={experience.companyName}
                  onChange={(value) => updateField('workExperience', index, 'companyName', value)}
                  className="text-gray-700 font-medium text-sm mb-1"
                />
                <EditableText
                  value={experience.description}
                  onChange={(value) => updateField('workExperience', index, 'description', value)}
                  multiline
                  className="text-gray-600 text-sm ml-4"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {hasContent(resumeData.projects) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 border-b-2 border-gray-800 pb-1">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex flex-col items-start mb-1">
                <EditableText
                  value={project.projectName}
                  onChange={(value) => updateField('projects', index, 'projectName', value)}
                  className="font-semibold text-gray-800"
                />
                {project.link && (
                  <EditableText
                    value={project.link}
                    onChange={(value) => updateField('projects', index, 'link', value)}
                    className="text-blue-600 hover:underline text-sm italic"
                    link={true}
                  />
                )}
              </div>
              <EditableText
                value={project.description}
                onChange={(value) => updateField('projects', index, 'description', value)}
                multiline
                className="text-gray-600 text-sm ml-4"
              />
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {hasContent(resumeData.education) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 border-b-2 border-gray-800 pb-1">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <EditableText
                  value={edu.degree}
                  onChange={(value) => updateField('education', index, 'degree', value)}
                  className="font-semibold text-gray-800"
                />
                <div className="text-gray-600 text-sm">
                  <EditableText
                    value={edu.startDate}
                    onChange={(value) => updateField('education', index, 'startDate', value)}
                    className="inline"
                  />
                  <span> - </span>
                  <EditableText
                    value={edu.endDate}
                    onChange={(value) => updateField('education', index, 'endDate', value)}
                    className="inline"
                  />
                </div>
              </div>
              <EditableText
                value={edu.institution}
                onChange={(value) => updateField('education', index, 'institution', value)}
                className="text-gray-500 text-md font-bold"
              />
              {edu.grade && (
                <p className="text-gray-600 text-sm">
                  GPA: {edu.grade}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {hasContent(resumeData.skills) && (
        <div className="mb-6">
          <h2 className="text-lg text-black font-semibold mb-2 border-b-2 border-black pb-1">Technical Skills</h2>
          <div className="space-y-2">
            {resumeData.skills.map((categoryGroup, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-start">
                  <EditableText
                    value={categoryGroup.category}
                    onChange={(value) => updateField('skills', index, 'category', value)}
                    className="text-gray-800 text-sm font-semibold mr-2"
                  />
                  <span className="text-gray-800 text-sm font-semibold mr-1">:</span>
                  <EditableText
                    value={categoryGroup.skills}
                    onChange={(value) => updateField('skills', index, 'skills', value)}
                    className="text-gray-700 text-sm flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {hasContent(resumeData.certifications) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 border-b-2 border-gray-800 pb-1">Certifications</h2>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <EditableText
                  value={cert.certificationName}
                  onChange={(value) => updateField('certifications', index, 'certificationName', value)}
                  className="font-medium text-gray-800 text-sm"
                />
                <EditableText
                  value={cert.issueDate}
                  onChange={(value) => updateField('certifications', index, 'issueDate', value)}
                  className="text-gray-600 text-sm"
                />
              </div>
              <EditableText
                value={cert.issuingOrganization}
                onChange={(value) => updateField('certifications', index, 'issuingOrganization', value)}
                className="text-gray-600 text-sm"
              />
            </div>
          ))}
        </div>
      )}

      {/* Languages Section */}
      {hasContent(resumeData.languages) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 border-b-2 border-gray-800 pb-1">Languages</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {resumeData.languages.map((language, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-gray-800">{language.language}</span>
                <span className="text-gray-600"> - {language.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}