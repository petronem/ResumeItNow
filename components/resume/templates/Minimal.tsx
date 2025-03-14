"use client";
import { useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import type { TemplateProps } from './types';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Linkedin, Github, Link2, Building2, School, Building } from 'lucide-react';
import { lightenColor } from '@/lib/utils';


export function MinimalTemplate({
  resumeData,
  isEditing,
  updateField,
  accentColor = '#000000',
  fontFamily = 'DM Sans',
  sectionOrder = [
    'objective',
    'workExperience',
    'projects',
    'education',
    'skills',
    'certifications',
    'languages',
    'customSections',
  ],
}: TemplateProps & {
  accentColor?: string;
  fontFamily?: string;
  sectionOrder?: string[];
}) {
  // Memoize derived colors to avoid recalculation
  const colors = useMemo(() => ({
    sectionTitle: accentColor,
    subheading: lightenColor(accentColor, 20),
    tertiary: lightenColor(accentColor, 40),
  }), [accentColor]);

  const renderMarkdown = (text: string): string => {
    if (!text) return '';
    return text
      .split('\n')
      .map((line, index) => {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (line.trim().startsWith('- ') && index === 0) {
          line = `• ${line.substring(2)}`;
        } else if (line.trim().startsWith('- ') && index > 0) {
          line = `<br/>• ${line.substring(2)}`;
        }
        return line;
      })
      .join('\n');
  };

  const renderInput = useCallback(
    ({
      value,
      onChange,
      multiline = false,
      className = '',
      type = '',
      ariaLabel = '',
      textColor = 'text-gray-600',
    }: {
      value: string;
      onChange: (value: string) => void;
      multiline?: boolean;
      className?: string;
      type?: string;
      ariaLabel?: string;
      textColor?: string;
    }) => {
      if (!isEditing) {
        if (type === 'link') {
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${textColor} ${className}`}
              aria-label={ariaLabel}
            >
              {value}
            </a>
          );
        }
        if (type === 'mail') {
          return (
            <a
              href={`mailto:${value}`}
              className={`hover:underline ${textColor} ${className}`}
              aria-label={ariaLabel}
            >
              {value}
            </a>
          );
        }
        if (type === 'phone') {
          return (
            <a
              href={`tel:${value}`}
              className={`hover:underline ${textColor} ${className}`}
              aria-label={ariaLabel}
            >
              {value}
            </a>
          );
        }
        return (
          <div
            className={`${textColor} ${className}`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        );
      }

      if (multiline) {
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full min-h-[60px] ${textColor} ${className}`}
            aria-label={ariaLabel}
          />
        );
      }

      return (
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`focus-visible:ring-2 ${textColor} ${className}`}
          aria-label={ariaLabel}
        />
      );
    },
    [isEditing]
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div
      className="text-lg font-semibold mb-3 pb-1 border-b-2"
      style={{ borderColor: colors.sectionTitle, color: colors.sectionTitle }}
    >
      <h2>{title}</h2>
    </div>
  );

  const hasContent = (section: unknown): boolean => {
    if (!section) return false;
    if (Array.isArray(section)) return section.length > 0;
    if (typeof section === 'object' && section !== null) {
      return Object.values(section).some((value) =>
        typeof value === 'string' ? value.trim() !== '' : Boolean(value)
      );
    }
    return typeof section === 'string' ? section.trim() !== '' : Boolean(section);
  };

  return (
    <div className={`w-full mx-auto bg-white px-8`} style={{ fontFamily }}>
      {/* Personal Details Section */}
      <div className="mb-8 break-inside-avoid">
        <div className="text-3xl font-bold text-center">
          {renderInput({
            value: resumeData.personalDetails.fullName,
            onChange: (value) => updateField('personalDetails', null, 'fullName', value),
            className: 'text-center',
            textColor: `text-[${colors.sectionTitle}]`,
            ariaLabel: 'Full name',
          })}
        </div>
        <div className="mb-3">
          {renderInput({
            value: resumeData.jobTitle,
            onChange: (value) => updateField('jobTitle', null, 'jobTitle', value),
            className: 'text-center',
            textColor: `text-[${colors.subheading}]`,
            ariaLabel: 'Job Title',
          })}
        </div>
        <div className="text-center text-sm space-x-4" style={{ color: colors.tertiary }}>
          {resumeData.personalDetails.email && (
            <span className="inline-flex items-center gap-1">
              <Mail className="w-4 h-4" style={{ color: colors.tertiary }} />
              {renderInput({
                value: resumeData.personalDetails.email,
                onChange: (value) => updateField('personalDetails', null, 'email', value),
                className: 'inline-block',
                type: 'mail',
                textColor: `text-[${colors.tertiary}]`,
                ariaLabel: 'Email address',
              })}
            </span>
          )}
          {resumeData.personalDetails.phone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="w-4 h-4" style={{ color: colors.tertiary }} />
              {renderInput({
                value: resumeData.personalDetails.phone,
                onChange: (value) => updateField('personalDetails', null, 'phone', value),
                className: 'inline-block',
                type: 'phone',
                textColor: `text-[${colors.tertiary}]`,
                ariaLabel: 'Phone number',
              })}
            </span>
          )}
          {resumeData.personalDetails.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4" style={{ color: colors.tertiary }} />
              {renderInput({
                value: resumeData.personalDetails.location,
                onChange: (value) => updateField('personalDetails', null, 'location', value),
                className: 'inline-block',
                textColor: `text-[${colors.tertiary}]`,
                ariaLabel: 'Location',
              })}
            </span>
          )}
        </div>
        <div className="text-center mt-2 space-x-4">
          {resumeData.personalDetails.linkedin && (
            <span className="inline-flex items-center gap-1">
              <Linkedin className="w-4 h-4" style={{ color: colors.tertiary }} />
              {renderInput({
                value: resumeData.personalDetails.linkedin,
                onChange: (value) => updateField('personalDetails', null, 'linkedin', value),
                className: 'inline-block text-sm',
                type: 'link',
                textColor: `text-[${colors.tertiary}]`,
                ariaLabel: 'LinkedIn profile',
              })}
            </span>
          )}
          {resumeData.personalDetails.github && (
            <span className="inline-flex items-center gap-1">
              <Github className="w-4 h-4" style={{ color: colors.tertiary }} />
              {renderInput({
                value: resumeData.personalDetails.github,
                onChange: (value) => updateField('personalDetails', null, 'github', value),
                className: 'inline-block text-sm',
                type: 'link',
                textColor: `text-[${colors.tertiary}]`,
                ariaLabel: 'GitHub profile',
              })}
            </span>
          )}
        </div>
      </div>

      {/* Render sections based on sectionOrder */}
      {sectionOrder.map((section) => (
        <div key={section}>
          {section === 'objective' && hasContent(resumeData.objective) && (
            <div className="mb-6 break-inside-avoid text-black">
              <SectionHeader title="Professional Summary" />
              {renderInput({
                value: resumeData.objective,
                onChange: (value) => updateField('objective', null, 'objective', value),
                multiline: true,
                className: 'text-sm leading-relaxed text-justify',
                textColor: 'text-gray-700',
                ariaLabel: 'Professional summary',
              })}
            </div>
          )}

          {section === 'workExperience' && hasContent(resumeData.workExperience) && (
            <div className="mb-6 text-black">
              <SectionHeader title="Work Experience" />
              {resumeData.workExperience.map((experience, idx) => (
                <div
                  key={idx}
                  className={`pb-4 break-inside-avoid ${
                    idx !== resumeData.workExperience.length - 1 ? 'mb-4' : ''
                  }`}
                  style={{
                    borderBottom:
                      idx !== resumeData.workExperience.length - 1
                        ? `2px dashed ${colors.sectionTitle}`
                        : 'none',
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      {renderInput({
                        value: experience.jobTitle,
                        onChange: (value) =>
                          updateField('workExperience', idx, 'jobTitle', value),
                        className: 'font-semibold',
                        textColor: `text-[${colors.subheading}]`,
                        ariaLabel: 'Job title',
                      })}
                    </div>
                    <div
                      className="text-sm flex items-center gap-1"
                      style={{ color: colors.tertiary }}
                    >
                      {renderInput({
                        value: experience.startDate,
                        onChange: (value) =>
                          updateField('workExperience', idx, 'startDate', value),
                        textColor: `text-[${colors.tertiary}]`,
                        ariaLabel: 'Start date',
                      })}
                      <span>-</span>
                      {renderInput({
                        value: experience.endDate,
                        onChange: (value) =>
                          updateField('workExperience', idx, 'endDate', value),
                        textColor: `text-[${colors.tertiary}]`,
                        ariaLabel: 'End date',
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {experience.location ? (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" style={{ color: colors.tertiary }} />
                        <div className="flex items-center gap-1">
                          {renderInput({
                            value: experience.companyName,
                            onChange: (value) =>
                              updateField('workExperience', idx, 'companyName', value),
                            className: 'font-medium text-sm',
                            textColor: `text-[${colors.subheading}]`,
                            ariaLabel: 'Company name',
                          })}
                          <span className="">-</span>
                          {renderInput({
                            value: experience.location,
                            onChange: (value) =>
                              updateField('workExperience', idx, 'location', value),
                            className: 'text-xs',
                            textColor: `text-[${colors.tertiary}]`,
                            ariaLabel: 'Location',
                          })}
                        </div>
                      </div>
                    ) : (
                     <div className="flex items-center gap-1">
                       <Building2 className="w-4 h-4" style={{ color: colors.tertiary }} />
                       {renderInput({
                        value: experience.companyName,
                        onChange: (value) =>
                          updateField('workExperience', idx, 'companyName', value),
                        className: 'font-medium text-sm',
                        textColor: `text-[${colors.subheading}]`,
                        ariaLabel: 'Company name',
                        })}
                     </div>
                    )
                    }
                    {renderInput({
                      value: experience.description,
                      onChange: (value) =>
                        updateField('workExperience', idx, 'description', value),
                      multiline: true,
                      className: 'text-sm ml-4 text-justify',
                      textColor: 'text-gray-600',
                      ariaLabel: 'Job description',
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'projects' && hasContent(resumeData.projects) && (
            <div className="mb-6 text-black">
              <SectionHeader title="Projects" />
              {resumeData.projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`pb-4 break-inside-avoid ${
                    idx !== resumeData.projects.length - 1 ? 'mb-4' : ''
                  }`}
                  style={{
                    borderBottom:
                      idx !== resumeData.projects.length - 1
                        ? `2px dashed ${colors.sectionTitle}`
                        : 'none',
                  }}
                >
                  <div className="flex flex-col items-start mb-1">
                    {renderInput({
                      value: project.projectName,
                      onChange: (value) =>
                        updateField('projects', idx, 'projectName', value),
                      className: 'font-semibold',
                      textColor: `text-[${colors.subheading}]`,
                      ariaLabel: 'Project name',
                    })}
                    {project.link && (
                      <div className="flex items-center gap-1">
                        <Link2 className="w-4 h-4" style={{ color: colors.tertiary }} />
                        {renderInput({
                          value: project.link,
                          onChange: (value) => updateField('projects', idx, 'link', value),
                          className: 'text-sm',
                          type: 'link',
                          textColor: `text-[${colors.tertiary}]`,
                          ariaLabel: 'Project link',
                        })}
                      </div>
                    )}
                  </div>
                  {renderInput({
                    value: project.description,
                    onChange: (value) =>
                      updateField('projects', idx, 'description', value),
                    multiline: true,
                    className: 'text-sm ml-4 text-justify',
                    textColor: 'text-gray-600',
                    ariaLabel: 'Project description',
                  })}
                </div>
              ))}
            </div>
          )}

          {section === 'education' && hasContent(resumeData.education) && (
            <div className="mb-6 break-inside-avoid text-black">
              <SectionHeader title="Education" />
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    {renderInput({
                      value: edu.degree,
                      onChange: (value) => updateField('education', idx, 'degree', value),
                      className: 'font-semibold',
                      textColor: `text-[${colors.subheading}]`,
                      ariaLabel: 'Degree',
                    })}
                    <div
                      className="text-sm flex items-center gap-1"
                      style={{ color: colors.tertiary }}
                    >
                      {renderInput({
                        value: edu.startDate,
                        onChange: (value) =>
                          updateField('education', idx, 'startDate', value),
                        textColor: `text-[${colors.tertiary}]`,
                        ariaLabel: 'Start date',
                      })}
                      {edu.startDate && <span>-</span>}
                      {renderInput({
                        value: edu.endDate,
                        onChange: (value) =>
                          updateField('education', idx, 'endDate', value),
                        textColor: `text-[${colors.tertiary}]`,
                        ariaLabel: 'End date',
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <School className="w-4 h-4" style={{ color: colors.tertiary }} />
                    <div className="flex items-center">
                      {renderInput({
                        value: edu.institution,
                        onChange: (value) =>
                          updateField('education', idx, 'institution', value),
                        className: 'font-medium text-sm',
                        textColor: `text-[${colors.subheading}]`,
                        ariaLabel: 'Institution',
                      })}
                      {edu.location && (
                        <>
                          <span className="mx-1">-</span>
                          {renderInput({
                            value: edu.location,
                            onChange: (value) =>
                              updateField('education', idx, 'location', value),
                            className: 'font-light text-xs',
                            textColor: `text-[${colors.tertiary}]`,
                            ariaLabel: 'Location',
                          })}
                        </>
                      )}
                    </div> 
                  </div>
                  
                  {edu.description && (
                    <div className="text-sm">
                      {renderInput({
                        value: edu.description,
                        onChange: (value) =>
                          updateField('education', idx, 'description', value),
                        className: 'inline-block',
                        textColor: 'text-gray-600',
                        ariaLabel: 'Education description',
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {section === 'skills' && hasContent(resumeData.skills) && (
            <div className="mb-6 text-black">
              <SectionHeader title="Skills" />
              <div className="space-y-2">
                {resumeData.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-start break-inside-avoid">
                    {skill.skillType === 'individual' ? (
                      renderInput({
                        value: skill.skill,
                        onChange: (value) => updateField('skills', idx, 'skill', value),
                        className: 'text-sm font-semibold',
                        textColor: `text-[${colors.subheading}]`,
                        ariaLabel: 'Skill',
                      })
                    ) : (
                      <>
                        {renderInput({
                          value: skill.category,
                          onChange: (value) =>
                            updateField('skills', idx, 'category', value),
                          className: 'text-sm font-semibold',
                          textColor: `text-[${colors.subheading}]`,
                          ariaLabel: 'Skill category',
                        })}
                        <span
                          className="mx-2 text-sm font-semibold"
                          style={{ color: colors.subheading }}
                        >
                          :
                        </span>
                        {renderInput({
                          value: skill.skills,
                          onChange: (value) =>
                            updateField('skills', idx, 'skills', value),
                          className: 'text-sm',
                          textColor: 'text-gray-700',
                          ariaLabel: 'Skills',
                        })}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'certifications' && hasContent(resumeData.certifications) && (
            <div className="mb-6 text-black">
              <SectionHeader title="Certifications" />
              {resumeData.certifications.map((cert, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-start">
                    {renderInput({
                      value: cert.certificationName,
                      onChange: (value) =>
                        updateField('certifications', idx, 'certificationName', value),
                      className: 'font-medium text-sm',
                      textColor: `text-[${colors.subheading}]`,
                      ariaLabel: 'Certification name',
                    })}
                    <div className="flex items-center gap-1">
                      {renderInput({
                        value: cert.issueDate,
                        onChange: (value) =>
                          updateField('certifications', idx, 'issueDate', value),
                        className: 'text-sm',
                        textColor: `text-[${colors.tertiary}]`,
                        ariaLabel: 'Certification date',
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" style={{ color: colors.tertiary }} />
                    {renderInput({
                      value: cert.issuingOrganization,
                      onChange: (value) =>
                        updateField('certifications', idx, 'issuingOrganization', value),
                      className: 'text-sm',
                      textColor: `text-[${colors.tertiary}]`,
                      ariaLabel: 'Issuing organization',
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'languages' && hasContent(resumeData.languages) && (
            <div className="mb-6 text-black">
              <SectionHeader title="Languages" />
              <div className="flex flex-col">
                {resumeData.languages.map((language, idx) => (
                  <div
                    key={idx}
                    className="text-sm flex items-center gap-2 p-2 rounded-md"
                  >
                    {renderInput({
                      value: language.language,
                      onChange: (value) =>
                        updateField('languages', idx, 'language', value),
                      className: 'font-medium',
                      textColor: `text-[${colors.subheading}]`,
                      ariaLabel: 'Language name',
                    })}
                    <span style={{ color: colors.tertiary }}>-</span>
                    {renderInput({
                      value: language.proficiency,
                      onChange: (value) =>
                        updateField('languages', idx, 'proficiency', value),
                      textColor: `text-[${colors.tertiary}]`,
                      ariaLabel: 'Language proficiency',
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'customSections' && hasContent(resumeData.customSections) && (
            <div className="mb-6 text-black">
              {resumeData.customSections.map((custom, idx) => (
                <div key={idx} className="mb-4">
                  <SectionHeader title={custom.sectionTitle} />
                  {renderInput({
                    value: custom.content,
                    onChange: (value) =>
                      updateField('customSections', idx, 'content', value),
                    multiline: true,
                    className: 'text-sm',
                    textColor: 'text-gray-600',
                    ariaLabel: `${custom.sectionTitle} content`,
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}