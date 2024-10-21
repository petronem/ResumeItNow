import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePickerComponent } from '../components/DatePicker';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormValues } from '../types';

interface EducationStepProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
}

export const EducationStep = ({
  register,
  errors,
  fields,
  append,
  remove,
}: EducationStepProps) => {
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
                <p className="text-destructive text-sm">
                  {errors.education[index]?.degree?.message}
                </p>}
            </div>

            <div className="space-y-2">
              <Label>Institution</Label>
              <Input {...register(`education.${index}.institution`)} />
              {errors.education?.[index]?.institution && 
                <p className="text-destructive text-sm">
                  {errors.education[index]?.institution?.message}
                </p>}
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input {...register(`education.${index}.location`)} />
            </div>

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
              />
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
        onClick={() => append()}
      >
        Add Education
      </Button>
    </div>
  );
};