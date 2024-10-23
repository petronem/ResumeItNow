// app/profile/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, Mail, User } from 'lucide-react'

interface Resume {
  id: string
  title: string
  createdAt: string
  // Add other resume fields as needed
}

function ProfileSkeleton() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[500px]" />
        </div>
      </div>
    )
  }

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResumes = async () => {
      if (!session?.user?.name) return

      try {
        const resumesRef = collection(db, `users/${session.user.email}/resumes`)
        const resumesSnapshot = await getDocs(resumesRef)
        
        const resumeData = resumesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Resume[]

        setResumes(resumeData)
      } catch (error) {
        console.error('Error fetching resumes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()
  }, [session?.user?.email, session?.user?.name])

  if (status === 'loading') {
    return <ProfileSkeleton />
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Profile Information Card */}
        <Card className="h-fit">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={session.user?.image ?? ''} alt={session.user?.name ?? ''} />
              <AvatarFallback>
                {session.user?.name?.charAt(0) ?? 'U'}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{session.user?.name}</CardTitle>
            <CardDescription>
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                <span>@{session.user?.name ?? 'username'}</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Mail className="w-4 h-4" />
                <span>{session.user?.email}</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Resumes List Card */}
        <Card>
          <CardHeader>
            <CardTitle>My Resumes</CardTitle>
            <CardDescription>Manage your created resumes</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No resumes found. Create your first resume!</p>
                <Button
                  className="mt-4"
                  onClick={() => router.push('/resume/create')}
                >
                  Create Resume
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {resumes.map((resume) => (
                  <Card
                    key={resume.id}
                    className="hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => router.push(`/resume/${resume.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{resume.id}</CardTitle>
                          <CardDescription>
                            Created: {new Date(resume.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <FileText className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}