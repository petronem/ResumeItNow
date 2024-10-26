import { Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between py-8 px-4">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <h2 className="text-xl font-bold">ResumeItNow</h2>
          <p className="text-sm text-muted-foreground">
            Create professional resumes with ease
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-2">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/templates">Templates</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/yourusername/resumeitnow"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-4 px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeItNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}