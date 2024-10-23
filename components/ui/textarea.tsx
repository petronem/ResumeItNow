import * as React from "react"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    showEnhanceButton?: boolean;
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showEnhanceButton = true, ...props }, ref) => {

    const [isEnhancing, setIsEnhancing] = React.useState(false);
    const [currentText, setCurrentText] = React.useState<string>('');
    const { toast } = useToast();

    const handleEnhance = async () => {
      
      if (!currentText.trim()) {
        toast({
          title: "Error",
          description: "Please enter some text first",
          variant: "destructive",
        });
        return;
      }

      setIsEnhancing(true);
      try {
        const response = await fetch('/api/enhance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: currentText }),
        });

        const data = await response.json();
        setCurrentText(data.enhanced);
        if (data.error) throw new Error(data.error);

        toast({
          title: "Success",
          description: "Text enhanced successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to enhance text",
          variant: "destructive",
        });
        console.log(error);
      } finally {
        setIsEnhancing(false);
      }
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          <textarea
            className={cn(
              "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pb-12",
              className
            )}
            ref={ref}
            {...props}
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
          {showEnhanceButton && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="absolute right-6 bottom-2 bg-purple-400 hover:bg-purple-500 transition hover:scale-105 "
              onClick={handleEnhance}
              disabled={isEnhancing}
            >
              {isEnhancing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enhancing...
                </>
              ) : (
                "Enhance with AI"
              )}
            </Button>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }