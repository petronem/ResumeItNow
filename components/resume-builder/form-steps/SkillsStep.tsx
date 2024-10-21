import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormValues } from '../types';

interface SkillsStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
}

export const SkillsStep = ({
  register,
  errors,
  fields,
  append,
  remove,
}: SkillsStepProps) => {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Skill {index + 1}</h3>
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
              <Label>Skill Name</Label>
              <Input {...register(`skills.${index}.skill`)} />
              {errors.skills?.[index]?.skill && 
                <p className="text-destructive text-sm">
                  {errors.skills[index]?.skill?.message}
                </p>}
            </div>

            <div className="space-y-2">
              <Label>Proficiency</Label>
              <Select 
                onValueChange={(value) => 
                  register(`skills.${index}.proficiency`).onChange({
                    target: { value }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append()}
      >
        Add Skill
      </Button>
    </div>
  );
};