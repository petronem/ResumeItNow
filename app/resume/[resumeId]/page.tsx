// app/resume/[resumeId]/page.tsx
"use client";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, Edit } from 'lucide-react';

interface PersonalDetails {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
}
  
interface WorkExperience {
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}
  
interface Education {
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    grade: string;
}
  
interface Skill {
    skill: string;
    proficiency: string;
}
  
interface Project {
    projectName: string;
    description: string;
    link: string;
  }
  
interface Language {
    language: string;
    proficiency: string;
}
  
interface Certification {
    certificationName: string;
    issuingOrganization: string;
    issueDate: string;
}

interface ResumeData {
    personalDetails: PersonalDetails;
    objective: string;
    workExperience: WorkExperience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
    languages: Language[];
    certifications: Certification[];
}

async function getResumeData(resumeId: string): Promise<ResumeData | null> {
    const session = await getServerSession(authOptions);
    try {
      const userId = session?.user?.email;
      const resumeRef = doc(db, `users/${userId}/resumes/${resumeId}`);
      const resumeSnap = await getDoc(resumeRef);
      
      if (!resumeSnap.exists()) {
        return null;
      }
      
      return resumeSnap.data() as ResumeData;
    } catch (error) {
      console.error('Error fetching resume:', error);
      return null;
    }
  }

export default async function Page({
  params: { resumeId },
}: {
  params: { resumeId: string };
}) {
  const resumeData = await getResumeData(resumeId);
  const session = await getServerSession(authOptions);

  if (!resumeData) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">No resume data found</p>
        <p className="text-sm text-gray-500">ID: {resumeId}</p>
        <p className="text-sm text-gray-500">User: {session?.user?.email}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center px-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Link href={`/resume/${resumeId}/edit`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Resume
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
        {/* Personal Details Section */}
        <div className="p-8 border-b dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {resumeData.personalDetails.fullName}
          </h1>
          <div className="mt-2 text-gray-600 dark:text-gray-300">
            <p>{resumeData.personalDetails.email}</p>
            <p>{resumeData.personalDetails.phone}</p>
            <p>{resumeData.personalDetails.location}</p>
            <div className="mt-2">
              <a 
                href={resumeData.personalDetails.linkedin}
                className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a 
                href={resumeData.personalDetails.github}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Work Experience Section - Moved up as it's typically most important */}
        <div className="p-8 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Work Experience</h2>
          {resumeData.workExperience.map((experience, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="font-semibold dark:text-white">{experience.jobTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300">{experience.companyName}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {experience.startDate} - {experience.endDate}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{experience.description}</p>
            </div>
          ))}
        </div>

        {/* Projects Section - Moved up as it shows practical skills */}
        <div className="p-8 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="font-semibold dark:text-white">{project.projectName}</h3>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
              <a 
                href={project.link}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Project Link
              </a>
            </div>
          ))}
        </div>

        {/* Skills Section - Moved up as it's highly relevant */}
        <div className="p-8 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex justify-between">
                <span className="dark:text-white">{skill.skill}</span>
                <span className="text-gray-600 dark:text-gray-300">{skill.proficiency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="p-8 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="font-semibold dark:text-white">{edu.degree}</h3>
              <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {edu.startDate} - {edu.endDate}
              </p>
              <p className="text-gray-600 dark:text-gray-300">Grade: {edu.grade}</p>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="p-8 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Certifications</h2>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold dark:text-white">{cert.certificationName}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {cert.issuingOrganization} - {cert.issueDate}
              </p>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Languages</h2>
          <div className="grid grid-cols-2 gap-4">
            {resumeData.languages.map((language, index) => (
              <div key={index} className="flex justify-between">
                <span className="dark:text-white">{language.language}</span>
                <span className="text-gray-600 dark:text-gray-300">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Print Styles */}
      {/* <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style> */}
    </div>
  );
}