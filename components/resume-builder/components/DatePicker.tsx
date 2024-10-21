import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { format } from "date-fns";

interface DatePickerComponentProps {
    label: string;
    end?: boolean;
    register: UseFormRegister<any>;
    schema?: string;
  }

export const DatePickerComponent = ({ label, end, register, schema = 'personalDetails.startDate' }: DatePickerComponentProps) => {
    const [monthYear, setMonthYear] = useState<string>(''); // Start with an empty string
  
    const handleMonthChange = (newMonth: string) => {
      const monthIndex = parseInt(newMonth, 10);
      const year = new Date().getFullYear(); // Use the current year
      const newDate = new Date(year, monthIndex, 1);
      const formattedValue = format(newDate, "MMM yyyy"); // Format as "MMM yyyy"
      setMonthYear(formattedValue); // Store formatted value as string
    };
  
    const handleYearChange = (newYear: string) => {
      const year = parseInt(newYear, 10);
      const month = new Date().getMonth(); // Use the current month
      const newDate = new Date(year, month, 1);
      const formattedValue = format(newDate, "MMM yyyy"); // Format as "MMM yyyy"
      setMonthYear(formattedValue); // Store formatted value as string
    };
  
    const handlePresent = () => {
      setMonthYear('Present'); // Set the value to "Present"
    };
  
    useEffect(() => {
      // Register the field with react-hook-form
      register(schema).onChange({
        target: { value: monthYear, name: schema }
      });
    }, [monthYear, register, schema]);
  
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              {monthYear || 'Select Date'} {/* Display formatted value or placeholder */}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <div className="flex gap-4">
              <Select onValueChange={handleMonthChange} defaultValue="">
                <SelectTrigger className="w-[100px]">
                  <SelectValue>{monthYear ? monthYear.split(' ')[0] : 'Month'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {format(new Date(0, i), 'MMMM')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleYearChange} defaultValue="">
                <SelectTrigger className="w-[100px]">
                  <SelectValue>{monthYear ? monthYear.split(' ')[1] : 'Year'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => (
                    <SelectItem key={i} value={(1900 + i).toString()}>
                      {1900 + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {end && (
              <div className="mt-2">
                <Button variant="outline" onClick={handlePresent} className="w-full">
                  Present
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    );
  };