'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
  currentPosition?: string
  yearsOfExperience?: string
  skills?: string
  professionalSummary?: string
}

interface WorkExperience {
  id: number
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: number
  school: string
  degree: string
  field: string
  location: string
  startYear: string
  startMonth: string
  endYear: string
  endMonth: string
  current: boolean
  description: string
}

interface Project {
  id: number
  title: string
  technologies: string
  startDate: string
  endDate: string
  description: string
  link: string
}

interface Certification {
  id: number
  name: string
  issuer: string
  issueDate: string
  expiryDate: string
  credentialId: string
  credentialUrl: string
  description: string
}

interface ResumeData {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
  hobbies: string[]
}

interface ResumeContextType {
  resumeData: ResumeData
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
  updateSection: (section: keyof ResumeData, data: any) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}

interface ResumeProviderProps {
  children: ReactNode
}

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    hobbies: [],
  })

  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  const updateSection = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const value = {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    updateSection,
  }

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}