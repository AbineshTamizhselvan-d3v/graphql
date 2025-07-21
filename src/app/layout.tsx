import './globals.css'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from '@/lib/apollo-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GraphQL Next.js App',
  description: 'A Next.js app with GraphQL integration using JSONPlaceholder API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <h1 className="text-3xl font-bold text-gray-900">
                    GraphQL Next.js Demo
                  </h1>
                  <nav className="space-x-8">
                    <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Users
                    </a>
                    <a href="/posts" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Posts
                    </a>
                    <a href="/comments" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Comments
                    </a>
                    <a href="/photos" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Photos
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  )
}
