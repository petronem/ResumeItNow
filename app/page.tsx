

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-8">ResumeIt</h1>
        <p className="text-2xl mb-12">Create professional, ATS-optimized resumes in minutes.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Resume Generation</h2>
            <ul className="list-disc list-inside">
              <li>AI-powered resume creation from your details.</li>
              <li>Tailored job descriptions and skills suggestions.</li>
              <li>ATS keyword optimization for better visibility.</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">AI-Powered Content Suggestions</h2>
            <ul className="list-disc list-inside">
              <li>Recommended phrasing for job descriptions and skills.</li>
              <li>Multiple resume templates (modern, classic, creative).</li>
              <li>Highlights measurable achievements and key soft skills.</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Input Options</h2>
            <ul className="list-disc list-inside">
              <li>Manually input details or auto-populate from LinkedIn.</li>
              <li>Pre-filled job title suggestions with customizable placeholders.</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Export & Share</h2>
            <ul className="list-disc list-inside">
              <li>Export resumes as PDF, Word, or plain text.</li>
              <li>Share resumes via email or a public link.</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Job-Specific Optimization</h2>
            <ul className="list-disc list-inside">
              <li>Tailor resumes for specific job postings by analyzing job descriptions and optimizing keywords.</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Skill Matching</h2>
            <ul className="list-disc list-inside">
              <li>Suggest relevant skills based on past job experience.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
