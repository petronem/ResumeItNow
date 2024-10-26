// app/resume-builder/page.tsx
"use client";

import { useSession } from "next-auth/react";
import StepForm from '@/components/resume-builder/StepForm';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function ResumeBuilderPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="container min-h-screen mx-auto py-10 px-4 max-w-3xl">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription className="mt-2">
            You need to be signed in to create and save resumes. Please sign in to continue.
          </AlertDescription>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => router.push('/signin')}
            size='lg'
          >
            Sign In
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <StepForm />
    </div>
  );
}