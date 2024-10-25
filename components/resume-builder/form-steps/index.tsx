import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import  DatePickerComponent  from '../components/DatePicker';
import { PhoneInputComponent } from '../components/PhoneInput';

// Type for the entire form values
export interface FormValues {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    location?: string;
  };
  workExperience: {
    jobTitle: string;
    companyName: string;
    location?: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location?: string;
    startDate: string;
    endDate?: string;
    grade?: string;
  }[];
  skills: {
    category: string;
    skills: string;
  }[];
  projects: {
    projectName: string;
    description: string;
    link?: string;
  }[];
  languages: {
    language: string;
    proficiency?: 'Basic' | 'Fluent' | 'Native';
  }[];
  certifications: {
    certificationName: string;
    issuingOrganization: string;
    issueDate: string;
  }[];
}

// PersonalInfoStep Component
interface PersonalInfoStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  register,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input {...register("personalDetails.fullName")} className="w-full" />
        {errors.personalDetails?.fullName && 
          <p className="text-destructive text-sm">{errors.personalDetails.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register("personalDetails.email")} className="w-full" />
        {errors.personalDetails?.email && 
          <p className="text-destructive text-sm">{errors.personalDetails.email.message}</p>}
      </div>

      <PhoneInputComponent register={register} errors={errors} />

      <div className="space-y-2">
        <Label>LinkedIn URL</Label>
        <Input {...register("personalDetails.linkedin")} className="w-full" />
        {errors.personalDetails?.linkedin && 
          <p className="text-destructive text-sm">{errors.personalDetails.linkedin.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>GitHub/Portfolio URL</Label>
        <Input {...register("personalDetails.github")} className="w-full" />
        {errors.personalDetails?.github && 
          <p className="text-destructive text-sm">{errors.personalDetails.github.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input {...register("personalDetails.location")} className="w-full" />
        {errors.personalDetails?.location && 
          <p className="text-destructive text-sm">{errors.personalDetails.location.message}</p>}
      </div>
    </div>
  );
};

// WorkExperienceStep Component
interface WorkExperienceStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: UseFieldArrayReturn<FormValues, "workExperience">["fields"];
  append: UseFieldArrayReturn<FormValues, "workExperience">["append"];
  remove: UseFieldArrayReturn<FormValues, "workExperience">["remove"];
}

export const WorkExperienceStep: React.FC<WorkExperienceStepProps> = ({
  register,
  errors,
  fields,
  append,
  remove
}) => {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input {...register(`workExperience.${index}.jobTitle`)} />
              {errors.workExperience?.[index]?.jobTitle && 
                <p className="text-destructive text-sm">{errors.workExperience[index]?.jobTitle?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input {...register(`workExperience.${index}.companyName`)} />
              {errors.workExperience?.[index]?.companyName && 
                <p className="text-destructive text-sm">{errors.workExperience[index]?.companyName?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input {...register(`workExperience.${index}.location`)} />
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePickerComponent
                  label="Start Date"
                  register={register}
                  schema={`workExperience.${index}.startDate`}
                  />
                <DatePickerComponent
                  label="End Date"
                  register={register}
                  schema={`workExperience.${index}.endDate`}
                  end={true}
                  />
              </div>
              {errors.workExperience?.[index]?.startDate && 
                <p className="text-destructive text-sm">{errors.workExperience[index]?.startDate?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea 
                {...register(`workExperience.${index}.description`)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ 
          jobTitle: "", 
          companyName: "", 
          location: "", 
          startDate: "", 
          endDate: "", 
          description: "" 
        })}
      >
        Add Work Experience
      </Button>
    </div>
  );
};

// EducationStep Component
interface EducationStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: UseFieldArrayReturn<FormValues, "education">["fields"];
  append: UseFieldArrayReturn<FormValues, "education">["append"];
  remove: UseFieldArrayReturn<FormValues, "education">["remove"];
}

export const EducationStep: React.FC<EducationStepProps> = ({
  register,
  errors,
  fields,
  append,
  remove
}) => {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Education {index + 1}</h3>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input {...register(`education.${index}.degree`)} />
              {errors.education?.[index]?.degree && 
                <p className="text-destructive text-sm">{errors.education[index]?.degree?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Institution</Label>
              <Input {...register(`education.${index}.institution`)} />
              {errors.education?.[index]?.institution && 
                <p className="text-destructive text-sm">{errors.education[index]?.institution?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input {...register(`education.${index}.location`)} />
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePickerComponent
                  label="Start Date"
                  register={register}
                  schema={`education.${index}.startDate`}
                  />
                <DatePickerComponent
                  label="End Date"
                  register={register}
                  schema={`education.${index}.endDate`}
                  end={true}
                  />
              </div>
              {errors.education?.[index]?.startDate && 
                <p className="text-destructive text-sm">{errors.education[index]?.startDate?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Grade/GPA</Label>
              <Input {...register(`education.${index}.grade`)} />
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ 
          degree: "", 
          institution: "", 
          location: "", 
          startDate: "", 
          endDate: "", 
          grade: "" 
        })}
      >
        Add Education
      </Button>
    </div>
  );
};

// SkillsStep Component
interface SkillsStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: UseFieldArrayReturn<FormValues, "skills">["fields"];
  append: UseFieldArrayReturn<FormValues, "skills">["append"];
  remove: UseFieldArrayReturn<FormValues, "skills">["remove"];
}

export const SkillsStep: React.FC<SkillsStepProps> = ({
  register,
  errors,
  fields,
  append,
  remove
}) => {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Skill Category {index + 1}</h3>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input {...register(`skills.${index}.category`)} />
              {errors.skills?.[index]?.category && 
                <p className="text-destructive text-sm">{errors.skills[index]?.category?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Skills (comma-separated)</Label>
              <Input
                placeholder="e.g. HTML, CSS, JavaScript"
                className="min-h-[100px]"
                {...register(`skills.${index}.skills`)}/>
                {errors.skills?.[index]?.skills && 
                <p className="text-destructive text-sm">{errors.skills[index]?.skills?.message}</p>}
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ category: "", skills: "" })}
      >
        Add Skill Category
      </Button>
    </div>
  );
};

// ProjectsStep Component
interface ProjectsStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: UseFieldArrayReturn<FormValues, "projects">["fields"];
  append: UseFieldArrayReturn<FormValues, "projects">["append"];
  remove: UseFieldArrayReturn<FormValues, "projects">["remove"];
}

export const ProjectsStep: React.FC<ProjectsStepProps> = ({
  register,
  errors,
  fields,
  append,
  remove
}) => {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project {index + 1}</h3>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input {...register(`projects.${index}.projectName`)} />
              {errors.projects?.[index]?.projectName && 
                <p className="text-destructive text-sm">{errors.projects[index]?.projectName?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                {...register(`projects.${index}.description`)}
                className="min-h-[100px]"
              />
              {errors.projects?.[index]?.description && 
                <p className="text-destructive text-sm">{errors.projects[index]?.description?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input {...register(`projects.${index}.link`)} />
              {errors.projects?.[index]?.link && 
                <p className="text-destructive text-sm">{errors.projects[index]?.link?.message}</p>}
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ projectName: "", description: "", link: "" })}
      >
        Add Project
      </Button>
    </div>
  );
};

// LanguagesStep Component
interface LanguagesStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: UseFieldArrayReturn<FormValues, "languages">["fields"];
  append: UseFieldArrayReturn<FormValues, "languages">["append"];
  remove: UseFieldArrayReturn<FormValues, "languages">["remove"];
}

export const LanguagesStep: React.FC<LanguagesStepProps> = ({
        register,
        errors,
        fields,
        append,
        remove,
      }: LanguagesStepProps) => {
        return (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <Card key={field.id} className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Language {index + 1}</h3>
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
      
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Input {...register(`languages.${index}.language`)} />
                    {errors.languages?.[index]?.language && 
                      <p className="text-destructive text-sm">
                        {errors.languages[index]?.language?.message}
                      </p>}
                  </div>
      
                  <div className="space-y-2">
                    <Label>Proficiency</Label>
                    <Select 
                      onValueChange={(value) => 
                        register(`languages.${index}.proficiency`).onChange({
                          target: { value }
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Fluent">Fluent</SelectItem>
                        <SelectItem value="Native">Native</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            ))}
      
            <Button
              type="button"
              variant="outline"
              onClick={() => append({language: "", proficiency: "Basic"})}
            >
              Add Language
            </Button>
          </div>
        );
      };

      interface CertificationsStepProps {
        register: UseFormRegister<FormValues>;
        errors: FieldErrors<FormValues>;
        fields: UseFieldArrayReturn<FormValues, "certifications">["fields"];
        append: UseFieldArrayReturn<FormValues, "certifications">["append"];
        remove: UseFieldArrayReturn<FormValues, "certifications">["remove"];
    }
    
    export const CertificationsStep = ({
        register,
        errors,
        fields,
        append,
        remove,
    }: CertificationsStepProps) => {
        return (
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <Card key={field.id} className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Certification {index + 1}</h3>
                            {(
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
    
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Certification Name</Label>
                                <Input {...register(`certifications.${index}.certificationName`)} />
                                {errors.certifications?.[index]?.certificationName &&
                                    <p className="text-destructive text-sm">{errors.certifications[index]?.certificationName?.message}</p>}
                            </div>
    
                            <div className="space-y-2">
                                <Label>Issuing Organization</Label>
                                <Input {...register(`certifications.${index}.issuingOrganization`)} />
                                {errors.certifications?.[index]?.issuingOrganization &&
                                    <p className="text-destructive text-sm">{errors.certifications[index]?.issuingOrganization?.message}</p>}
                            </div>
                            
                            <div className="space-y-2">
                              <DatePickerComponent
                                  label="Issue Date"
                                  register={register}
                                  schema={`certifications.${index}.issueDate`}
                                  />
                              {errors.certifications?.[index]?.issueDate && 
                                <p className="text-destructive text-sm">{errors.certifications[index]?.issueDate?.message}</p>}
                            </div>
                        </div>
                    </Card>
                ))}
    
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({certificationName: "", issuingOrganization: "", issueDate: "" })}
                >
                    Add Certification
                </Button>
            </div>
        )
    }