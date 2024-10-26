// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

async function getResumesCreated() {
  try {
    const infoDoc = await getDoc(doc(db, "info", "resumesCreated"));
    return infoDoc.exists() ? infoDoc.data().count : 0;
  } catch (error) {
    console.error("Error fetching resumes count:", error);
    return 0;
  }
}

export default async function HomePage() {
  const resumesCreated = await getResumesCreated();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center bg-gradient-to-b from-background to-muted">
        <Badge className="mb-4" variant="secondary">
          Powered by Llama 3.1
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Create Your ATS-Friendly Resume <br className="hidden md:inline" />
          with <span className="text-primary">Ease</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-[750px]">
          Simple and effective resume builder with AI-enhanced content suggestions. 
          Choose from professional templates and download in PDF format.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="gap-2">
            Create Resume <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Templates
          </Button>
        </div>

        <div className="mt-12 p-4 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-primary">{resumesCreated.toLocaleString()}+</p>
          <p className="text-sm text-muted-foreground">Resumes Created</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>ATS-Friendly Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Professional resume templates</li>
                <li>• Clean, readable formatting</li>
                <li>• Optimized for ATS systems</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>AI Content Enhancement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Improve your descriptions</li>
                <li>• Enhance your achievements</li>
                <li>• Better phrase suggestions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Easy Export</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Download as PDF</li>
                <li>• Ready to send format</li>
                <li>• Print-friendly layout</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}