import type { Metadata } from 'next'
import { Inter, Open_Sans, Poppins, Roboto } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { ResumeProvider } from '@/context/ResumeContext'
import { CoverLetterProvider } from '@/context/CoverLetterContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-opensans',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'AI Resume & Cover Letter Builder',
  description: 'Create professional resumes and cover letters with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${openSans.variable} ${poppins.variable} ${roboto.variable} font-inter`}>
        <AuthProvider>
          <ResumeProvider>
            <CoverLetterProvider>
              {children}
            </CoverLetterProvider>
          </ResumeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}