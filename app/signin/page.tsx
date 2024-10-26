"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email){
      router.push('/profile');
    }
  }, [session, router])
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => signIn("google")}>Sign in with Google</Button>
    </div>
  );
}
