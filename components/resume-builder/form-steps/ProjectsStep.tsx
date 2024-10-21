import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormValues } from '../types';

interface ProjectsStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
}

export const ProjectsStep = ({
  register,
  errors,
  fields,
  append,
  remove,
}: ProjectsStepProps) => {
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
                <p className="text-destructive text-sm">
                  {errors.projects[index]?.projectName?.message}
                </p>}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                {...register(`projects.${index}.description`)}
                className="min-h-[100px]"
              />
              {errors.projects?.[index]?.description && 
                <p className="text-destructive text-sm">
                  {errors.projects[index]?.description?.message}
                </p>}
            </div>

            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input {...register(`projects.${index}.link`)} />
              {errors.projects?.[index]?.link && 
                <p className="text-destructive text-sm">
                  {errors.projects[index]?.link?.message}
                </p>}
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append()}
      >
        Add Project
      </Button>
    </div>
  );
};