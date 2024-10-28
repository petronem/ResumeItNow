"use client";
import { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Edit, Save, X } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import html2pdf from 'html2pdf.js';
import type { ResumeData } from './types';
import { useSession } from 'next-auth/react';
import { ModernTemplate } from '@/components/resume/templates/Modern';
import { MinimalTemplate } from '@/components/resume/templates/Minimal';
import { ProfessionalTemplate } from '@/components/resume/templates/Professional';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Template components mapping
const TEMPLATES = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate
} as const;

type TemplateKey = keyof typeof TEMPLATES;

export default function ResumeView({ 
  resumeData: initialResumeData,
  resumeId 
}: { 
  resumeData: ResumeData;
  resumeId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('modern');
  const { data: session } = useSession();

  useEffect(() => {
    const savedTemplate = localStorage.getItem('resumeitnow_template');
    if (savedTemplate && savedTemplate in TEMPLATES) {
      setSelectedTemplate(savedTemplate as TemplateKey);
    }
  }, []);

  const handleDownload = () => {
    const element = document.getElementById('resume-content');
    const opt = {
      margin: [0.2, 0.295, 0.3, 0.295],
      filename: `${resumeData.personalDetails.fullName.replace(/\s+/g, '_')}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function flattenObject(obj: any, parentKey = ''): { [key: string]: any } {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      
      if (Array.isArray(obj[key])) {
        return {
          ...acc,
          [newKey]: obj[key]
        };
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        return {
          ...acc,
          ...flattenObject(obj[key], newKey)
        };
      } else {
        return {
          ...acc,
          [newKey]: obj[key]
        };
      }
    }, {});
  }

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const userEmail = session?.user?.email;
      if (!userEmail) throw new Error('User email not found');
      
      const resumeRef = doc(db, `users/${userEmail}/resumes/${resumeId}`);
      const flattenedData = flattenObject({
        ...resumeData,
        template: selectedTemplate // Save the selected template
      });
      
      await updateDoc(resumeRef, flattenedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = <T extends keyof ResumeData>(
    section: T,
    index: number | null,
    field: string,
    value: string
  ) => {
    setResumeData(prev => {
      if (index === null) {
        if (section === 'personalDetails') {
          return {
            ...prev,
            personalDetails: {
              ...prev.personalDetails,
              [field]: value
            }
          };
        }
        if (section === 'objective') {
          return {
            ...prev,
            objective: value
          };
        }
        return prev;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sectionArray = [...prev[section] as any[]];
      sectionArray[index] = { 
        ...sectionArray[index], 
        [field]: value 
      };

      return {
        ...prev,
        [section]: sectionArray
      };
    });
  };

  // Get the current template component
  const TemplateComponent = TEMPLATES[selectedTemplate];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-4">
      <Card className="max-w-[21cm] mx-auto mb-4">
        <CardContent className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <Select
              value={selectedTemplate}
              onValueChange={(value: TemplateKey) => setSelectedTemplate(value)}
              disabled={isEditing}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern Template</SelectItem>
                <SelectItem value="minimal">Minimal Template</SelectItem>
                <SelectItem value="professional">Professional Template</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="default"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setResumeData(initialResumeData);
                    setIsEditing(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Resume
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div id="resume-content">
        <TemplateComponent 
          resumeData={resumeData}
          isEditing={isEditing}
          updateField={updateField}
        />
      </div>
    </div>
  );
}