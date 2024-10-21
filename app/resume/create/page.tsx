// "use client";
// import React, { useState, useEffect } from 'react';
// import * as z from 'zod';
// import { useForm, useFieldArray, UseFormRegister, FieldErrors } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { format } from "date-fns";

// // Import shadcn/ui components
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// import { useSession } from 'next-auth/react';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// interface DatePickerComponentProps {
//   label: string; // Label for the date picker
//   end?: boolean; // Optional prop to show Present option
//   register: UseFormRegister<any>; // Adjust the type based on your form values
//   schema?: string; // Schema as string to determine field registration
// }

// const DatePickerComponent = ({ label, end, register, schema = 'personalDetails.startDate' }: DatePickerComponentProps) => {
//   const [monthYear, setMonthYear] = useState<string>(''); // Start with an empty string

//   const handleMonthChange = (newMonth: string) => {
//     const monthIndex = parseInt(newMonth, 10);
//     const year = new Date().getFullYear(); // Use the current year
//     const newDate = new Date(year, monthIndex, 1);
//     const formattedValue = format(newDate, "MMM yyyy"); // Format as "MMM yyyy"
//     setMonthYear(formattedValue); // Store formatted value as string
//   };

//   const handleYearChange = (newYear: string) => {
//     const year = parseInt(newYear, 10);
//     const month = new Date().getMonth(); // Use the current month
//     const newDate = new Date(year, month, 1);
//     const formattedValue = format(newDate, "MMM yyyy"); // Format as "MMM yyyy"
//     setMonthYear(formattedValue); // Store formatted value as string
//   };

//   const handlePresent = () => {
//     setMonthYear('Present'); // Set the value to "Present"
//   };

//   useEffect(() => {
//     // Register the field with react-hook-form
//     register(schema).onChange({
//       target: { value: monthYear, name: schema }
//     });
//   }, [monthYear, register, schema]);

//   return (
//     <div className="space-y-2">
//       <Label>{label}</Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="outline" className="w-full justify-start text-left font-normal">
//             {monthYear || 'Select Date'} {/* Display formatted value or placeholder */}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-4" align="start">
//           <div className="flex gap-4">
//             <Select onValueChange={handleMonthChange} defaultValue="">
//               <SelectTrigger className="w-[100px]">
//                 <SelectValue>{monthYear ? monthYear.split(' ')[0] : 'Month'}</SelectValue>
//               </SelectTrigger>
//               <SelectContent>
//                 {Array.from({ length: 12 }, (_, i) => (
//                   <SelectItem key={i} value={i.toString()}>
//                     {format(new Date(0, i), 'MMMM')}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select onValueChange={handleYearChange} defaultValue="">
//               <SelectTrigger className="w-[100px]">
//                 <SelectValue>{monthYear ? monthYear.split(' ')[1] : 'Year'}</SelectValue>
//               </SelectTrigger>
//               <SelectContent>
//                 {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => (
//                   <SelectItem key={i} value={(1900 + i).toString()}>
//                     {1900 + i}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           {end && (
//             <div className="mt-2">
//               <Button variant="outline" onClick={handlePresent} className="w-full">
//                 Present
//               </Button>
//             </div>
//           )}
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };



// interface PhoneInputComponentProps {
//   register: UseFormRegister<FormValues>;
//   errors: FieldErrors<FormValues>;
// };

// const PhoneInputComponent = ({ register, errors }: PhoneInputComponentProps) => {
//   const [countryCode, setCountryCode] = useState("+1");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   useEffect(() => {
//     const fullNumber = `${countryCode}${phoneNumber}`;
//     register("personalDetails.phone").onChange({
//       target: { value: fullNumber, name: "personalDetails.phone" }
//     });
//   }, [countryCode, phoneNumber]);

//   return (
//     <div className="space-y-2">
//       <Label>Phone Number</Label>
//       <div className="flex gap-2">
//         <Select value={countryCode} onValueChange={setCountryCode}>
//           <SelectTrigger className="w-[100px]">
//             <SelectValue>{countryCode}</SelectValue>
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="+1">+1 (US)</SelectItem>
//             <SelectItem value="+44">+44 (UK)</SelectItem>
//             <SelectItem value="+91">+91 (IN)</SelectItem>
//           </SelectContent>
//         </Select>
//         <Input 
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="123-456-7890"
//         />
//       </div>
//       {errors.personalDetails?.phone && 
//         <p className="text-destructive text-sm">{errors.personalDetails.phone.message}</p>}
//     </div>
//   );
// };

// type FormValues = {
//   personalDetails: {
//     fullName: string;
//     email: string;
//     phone: string;
//     linkedin?: string;
//     github?: string;
//     location?: string;
//   };
//   objective?: string;
//   workExperience: {
//     jobTitle: string;
//     companyName: string;
//     location?: string;
//     startDate: string;
//     endDate?: string;
//     description?: string;
//   }[];
//   education: {
//     degree: string;
//     institution: string;
//     location?: string;
//     startDate: string;
//     endDate?: string;
//     grade?: string;
//   }[];
//   skills: {
//     skill: string;
//     proficiency?: 'Beginner' | 'Intermediate' | 'Advanced';
//   }[];
//   projects: {
//     projectName: string;
//     description: string;
//     link?: string;
//   }[];
//   languages: {
//     language: string;
//     proficiency?: 'Basic' | 'Fluent' | 'Native';
//   }[];
//   certifications: {
//     certificationName: string;
//     issuingOrganization: string;
//     issueDate: string;
//   }[];
// };

// export default function StepForm() {
//   const { data: session } = useSession();
//   const [step, setStep] = useState(0);

//   const personalInfoSchema = z.object({
//     personalDetails: z.object({
//       fullName: z.string().min(1, "Full Name is required"),
//       email: z.string().email("Invalid email address"),
//       phone: z.string().min(10, "Phone number must have at least 10 digits"),
//       linkedin: z.string().optional().or(z.string().url("Invalid LinkedIn URL")),
//       github: z.string().optional().or(z.string().url("Invalid GitHub/Portfolio URL")),
//       location: z.string().optional(),
//     })
//   });

//   const careerObjectiveSchema = z.object({
//     objective: z.string().max(500, "Objective must be less than 500 characters").optional(),
//   });

//   const workExperienceSchema = z.object({
//     workExperience: z.array(z.object({
//       jobTitle: z.string().min(1, "Job Title is required"),
//       companyName: z.string().min(1, "Company Name is required"),
//       location: z.string().optional(),
//       startDate: z.string().min(1, "Start date is required"),
//       endDate: z.string().optional(),
//       description: z.string().max(2000, "Description must be less than 2000 characters").optional(),
//     }))
//   });

//   const educationSchema = z.object({
//     education: z.array(z.object({
//       degree: z.string().min(1, "Degree is required"),
//       institution: z.string().min(1, "School/University Name is required"),
//       location: z.string().optional(),
//       startDate: z.string().min(1, "Start date is required"),
//       endDate: z.string().optional(),
//       grade: z.string().optional(),
//     }))
//   });

//   const skillsSchema = z.object({
//     skills: z.array(z.object({
//       skill: z.string().min(1, "Skill is required"),
//       proficiency: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
//     }))
//   });

//   const projectsSchema = z.object({
//     projects: z.array(z.object({
//       projectName: z.string().min(1, "Project Name is required"),
//       description: z.string().max(1000, "Description must be less than 1000 characters").min(1, "Description is required"),
//       link: z.string().optional().or(z.string().url("Invalid URL")),
//     }))
//   });

//   const languagesSchema = z.object({
//     languages: z.array(z.object({
//       language: z.string().min(1, "Language is required"),
//       proficiency: z.enum(["Basic", "Fluent", "Native"]).optional(),
//     }))
//   });

//   const certificationsSchema = z.object({
//     certifications: z.array(z.object({
//       certificationName: z.string().min(1, "Certification Name is required"),
//       issuingOrganization: z.string().min(1, "Issuing Organization is required"),
//       issueDate: z.string().min(1, "Issue Date is required"),
//     }))
//   });

//   const steps = [
//     { schema: personalInfoSchema, title: "Personal Info" },
//     { schema: careerObjectiveSchema, title: "Career Objective" },
//     { schema: workExperienceSchema, title: "Work Experience" },
//     { schema: educationSchema, title: "Education" },
//     { schema: skillsSchema, title: "Skills" },
//     { schema: projectsSchema, title: "Projects" },
//     { schema: languagesSchema, title: "Languages" },
//     { schema: certificationsSchema, title: "Certifications" },
//   ];
//   const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>({
//     resolver: zodResolver(steps[step].schema),
//     defaultValues: {
//       personalDetails: { 
//         fullName: session?.user?.name || "", 
//         email: session?.user?.email || "", 
//         phone: "", 
//         linkedin: "",
//         github: "",
//         location: ""
//       },
//       workExperience: [{ jobTitle: "", companyName: "", location: "", startDate: "", endDate: "", description: "" }],
//       projects: [{ projectName: "", description: "", link: "" }],
//       education: [{ degree: "", institution: "", location: "", startDate: "", endDate: "", grade: "" }],
//       languages: [{ language: "", proficiency: "Basic" }],
//       certifications: [{ certificationName: "", issuingOrganization: "", issueDate: "" }],
//       skills: [{ skill: "", proficiency: "Beginner" }]
//     }
//   });

//   const { fields: workExperienceFields, append: appendWorkExperience, remove: removeWorkExperience } = useFieldArray({
//     control,
//     name: 'workExperience'
//   });

//   const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
//     control,
//     name: 'projects'
//   });

//   const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
//     control,
//     name: 'education'
//   });

//   const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
//     control,
//     name: 'skills'
//   });

//   const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
//     control,
//     name: 'languages'
//   });

//   const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
//     control,
//     name: 'certifications'
//   });

//   const onSubmit = async (data: FormValues) => {
//     if (step < steps.length - 1) {
//       setStep(step + 1);
//     } else {
//       const userId = session?.user?.email;
//       if (!userId) {
//         alert("Please sign in to save your resume");
//         return;
//       }
      
//       const resumeId = `resume_${new Date().getTime()}`; // Generate unique ID
//       const docRef = doc(db, `users/${userId}/resumes/${resumeId}`);

//       try {
//         await setDoc(docRef, {
//           ...data,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString()
//         });
//         alert("Resume saved successfully!");
//       } catch (error) {
//         console.error("Error saving resume:", error);
//         alert("Error saving resume. Please try again.");
//       }
//     }
//   };
//   console.log(errors);
//   return (
//     <main className="container mx-auto py-10 px-4 md:px-6">
//       <div className="max-w-xl mx-auto">
//         <Card className="p-6">
//           <h1 className="text-3xl font-bold mb-6">{steps[step].title}</h1>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* Personal Info step */}
//             {step === 0 && (
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <Label>Full Name</Label>
//                   <Input {...register("personalDetails.fullName")} className="w-full" />
//                   {errors.personalDetails?.fullName && 
//                     <p className="text-destructive text-sm">{errors.personalDetails.fullName.message}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Email</Label>
//                   <Input {...register("personalDetails.email")} className="w-full" />
//                   {errors.personalDetails?.email && 
//                     <p className="text-destructive text-sm">{errors.personalDetails.email.message}</p>}
//                 </div>

//                 <PhoneInputComponent register={register} errors={errors} />

//                 <div className="space-y-2">
//                   <Label>LinkedIn URL</Label>
//                   <Input {...register("personalDetails.linkedin")} className="w-full" />
//                   {errors.personalDetails?.linkedin && 
//                     <p className="text-destructive text-sm">{errors.personalDetails.linkedin.message}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>GitHub/Portfolio URL</Label>
//                   <Input {...register("personalDetails.github")} className="w-full" />
//                   {errors.personalDetails?.github && 
//                     <p className="text-destructive text-sm">{errors.personalDetails.github.message}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Location</Label>
//                   <Input {...register("personalDetails.location")} className="w-full" />
//                   {errors.personalDetails?.location && 
//                     <p className="text-destructive text-sm">{errors.personalDetails.location.message}</p>}
//                 </div>
//               </div>
//             )}

//             {/* Career Objective step */}
//             {step === 1 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Career Objective</Label>
//                   <Textarea 
//                     {...register("objective")} 
//                     className="min-h-[200px]"
//                     placeholder="Write a brief summary of your career objectives..."
//                   />
//                   {errors.objective && 
//                     <p className="text-destructive text-sm">{errors.objective.message}</p>}
//                 </div>
//               </div>
//             )}

//             {/* Work Experience step */}
//             {step === 2 && (
//               <div className="space-y-6">
//                 {workExperienceFields.map((field, index) => (
//                   <Card key={field.id} className="p-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
//                       { (
//                         <Button 
//                           type="button" 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => removeWorkExperience(index)}
//                         >
//                           Remove
//                         </Button>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label>Job Title</Label>
//                         <Input {...register(`workExperience.${index}.jobTitle`)} />
//                         {errors.workExperience?.[index]?.jobTitle && 
//                           <p className="text-destructive text-sm">{errors.workExperience[index]?.jobTitle?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Company Name</Label>
//                         <Input {...register(`workExperience.${index}.companyName`)} />
//                         {errors.workExperience?.[index]?.companyName && 
//                           <p className="text-destructive text-sm">{errors.workExperience[index]?.companyName?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Location</Label>
//                         <Input {...register(`workExperience.${index}.location`)} />
//                         {errors.workExperience?.[index]?.location && 
//                           <p className="text-destructive text-sm">{errors.workExperience[index]?.location?.message}</p>}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <DatePickerComponent
//                             label="Start Date"
//                             register={register}
//                             schema={`workExperience.${index}.startDate`}
//                           />
//                           {errors.workExperience?.[index]?.startDate && 
//                           <p className="text-destructive text-sm">{errors.workExperience[index]?.startDate?.message}</p>}
//                         </div>

//                         <DatePickerComponent
//                           label="End Date"
//                           register={register}
//                           schema={`workExperience.${index}.endDate`}
//                           end={true}
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Job Description</Label>
//                         <Textarea 
//                           {...register(`workExperience.${index}.description`)}
//                           className="min-h-[100px]"
//                         />
//                         {errors.workExperience?.[index]?.description && 
//                           <p className="text-destructive text-sm">{errors.workExperience[index]?.description?.message}</p>}
//                       </div>
//                     </div>
//                   </Card>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => appendWorkExperience({ 
//                     jobTitle: "", 
//                     companyName: "", 
//                     location: "", 
//                     startDate: "", 
//                     endDate: "", 
//                     description: "" 
//                   })}
//                 >
//                   Add Work Experience
//                 </Button>
//               </div>
//             )}
//             {/* Education step */}
//             {step === 3 && (
//               <div className="space-y-6">
//                 {educationFields.map((field, index) => (
//                   <Card key={field.id} className="p-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold">Education {index + 1}</h3>
//                       {(
//                         <Button 
//                           type="button" 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => removeEducation(index)}
//                         >
//                           Remove
//                         </Button>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label>Degree</Label>
//                         <Input {...register(`education.${index}.degree`)} />
//                         {errors.education?.[index]?.degree && 
//                           <p className="text-destructive text-sm">{errors.education[index]?.degree?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Institution</Label>
//                         <Input {...register(`education.${index}.institution`)} />
//                         {errors.education?.[index]?.institution && 
//                           <p className="text-destructive text-sm">{errors.education[index]?.institution?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Location</Label>
//                         <Input {...register(`education.${index}.location`)} />
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <DatePickerComponent
//                           label="Start Date"
//                           register={register}
//                           schema={`education.${index}.startDate`}
//                         />

//                         <DatePickerComponent
//                           label="End Date"
//                           register={register}
//                           schema={`education.${index}.endDate`}
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Grade/GPA</Label>
//                         <Input {...register(`education.${index}.grade`)} />
//                       </div>
//                     </div>
//                   </Card>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => appendEducation({ 
//                     degree: "", 
//                     institution: "", 
//                     location: "", 
//                     startDate: "", 
//                     endDate: "", 
//                     grade: "" 
//                   })}
//                 >
//                   Add Education
//                 </Button>
//               </div>
//             )}

//             {/* Skills step */}
//             {step === 4 && (
//               <div className="space-y-6">
//                 {skillsFields.map((field, index) => (
//                   <Card key={field.id} className="p-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold">Skill {index + 1}</h3>
//                       {(
//                         <Button 
//                           type="button" 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => removeSkill(index)}
//                         >
//                           Remove
//                         </Button>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label>Skill Name</Label>
//                         <Input {...register(`skills.${index}.skill`)} />
//                         {errors.skills?.[index]?.skill && 
//                           <p className="text-destructive text-sm">{errors.skills[index]?.skill?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Proficiency</Label>
//                         <Select 
//                           onValueChange={(value) => 
//                             register(`skills.${index}.proficiency`).onChange({
//                               target: { value }
//                             })
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select proficiency" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="Beginner">Beginner</SelectItem>
//                             <SelectItem value="Intermediate">Intermediate</SelectItem>
//                             <SelectItem value="Advanced">Advanced</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => appendSkill({ skill: "", proficiency: "Beginner" })}
//                 >
//                   Add Skill
//                 </Button>
//               </div>
//             )}

//             {/* Projects step */}
//             {step === 5 && (
//               <div className="space-y-6">
//                 {projectFields.map((field, index) => (
//                   <Card key={field.id} className="p-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold">Project {index + 1}</h3>
//                       { (
//                         <Button 
//                           type="button" 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => removeProject(index)}
//                         >
//                           Remove
//                         </Button>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label>Project Name</Label>
//                         <Input {...register(`projects.${index}.projectName`)} />
//                         {errors.projects?.[index]?.projectName && 
//                           <p className="text-destructive text-sm">{errors.projects[index]?.projectName?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Description</Label>
//                         <Textarea 
//                           {...register(`projects.${index}.description`)}
//                           className="min-h-[100px]"
//                         />
//                         {errors.projects?.[index]?.description && 
//                           <p className="text-destructive text-sm">{errors.projects[index]?.description?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Project Link</Label>
//                         <Input {...register(`projects.${index}.link`)} />
//                         {errors.projects?.[index]?.link && 
//                           <p className="text-destructive text-sm">{errors.projects[index]?.link?.message}</p>}
//                       </div>
//                     </div>
//                   </Card>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => appendProject({ projectName: "", description: "", link: "" })}
//                 >
//                   Add Project
//                 </Button>
//               </div>
//             )}

//             {/* Languages step */}
//             {step === 6 && (
//               <div className="space-y-6">
//                 {languageFields.map((field, index) => (
//                   <Card key={field.id} className="p-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold">Language {index + 1}</h3>
//                       { (
//                         <Button 
//                           type="button" 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => removeLanguage(index)}
//                         >
//                           Remove
//                         </Button>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label>Language</Label>
//                         <Input {...register(`languages.${index}.language`)} />
//                         {errors.languages?.[index]?.language && 
//                           <p className="text-destructive text-sm">{errors.languages[index]?.language?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Proficiency</Label>
//                         <Select 
//                           onValueChange={(value) => 
//                             register(`languages.${index}.proficiency`).onChange({
//                               target: { value }
//                             })
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select proficiency" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="Basic">Basic</SelectItem>
//                             <SelectItem value="Fluent">Fluent</SelectItem>
//                             <SelectItem value="Native">Native</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => appendLanguage({ language: "", proficiency: "Basic" })}
//                 >
//                   Add Language
//                 </Button>
//               </div>
//             )}

//             {/* Certifications step */}
//             {step === 7 && (
//               <div className="space-y-6">
//                 {certificationFields.map((field, index) => (
//                   <Card key={field.id} className="p-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold">Certification {index + 1}</h3>
//                       { (
//                         <Button 
//                           type="button" 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => removeCertification(index)}
//                         >
//                           Remove
//                         </Button>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label>Certification Name</Label>
//                         <Input {...register(`certifications.${index}.certificationName`)} />
//                         {errors.certifications?.[index]?.certificationName && 
//                           <p className="text-destructive text-sm">{errors.certifications[index]?.certificationName?.message}</p>}
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Issuing Organization</Label>
//                         <Input {...register(`certifications.${index}.issuingOrganization`)} />
//                         {errors.certifications?.[index]?.issuingOrganization && 
//                           <p className="text-destructive text-sm">{errors.certifications[index]?.issuingOrganization?.message}</p>}
//                       </div>

//                       <DatePickerComponent
//                         label="Issue Date"
//                         register={register}
//                         schema={`certifications.${index}.issueDate`}
//                       />
//                     </div>
//                   </Card>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => appendCertification({ 
//                     certificationName: "", 
//                     issuingOrganization: "", 
//                     issueDate: "" 
//                   })}
//                 >
//                   Add Certification
//                 </Button>
//               </div>
//             )}

//             <div className="flex justify-between mt-8">
//               {step > 0 && (
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setStep(step - 1)}
//                 >
//                   Previous
//                 </Button>
//               )}
//               <Button
//                 type="submit"
//                 className={step === 0 ? "w-full" : ""}
//               >
//                 {step === steps.length - 1 ? 'Save Resume' : 'Next'}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </main>
//   );
// }

import StepForm from '@/components/resume-builder/StepForm'
import React from 'react'

export default function page() {
  return (
    <div>
      <StepForm />
    </div>
  )
}
