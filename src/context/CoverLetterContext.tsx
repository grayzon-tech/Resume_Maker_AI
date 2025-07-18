'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Customizations {
  font: string
  fontSize: string
  spacing: string
  color: string
}

interface CoverLetterData {
  recipientName: string
  companyName: string
  jobTitle: string
  jobDescription: string
  keyRequirements: string[]
  introduction: string
  body: string
  conclusion: string
  selectedTemplate: string
  customizations: Customizations
}

interface CoverLetterContextType {
  coverLetterData: CoverLetterData
  updateCoverLetter: (field: keyof CoverLetterData, value: any) => void
  updateCustomization: (field: keyof Customizations, value: string) => void
}

const CoverLetterContext = createContext<CoverLetterContextType | undefined>(undefined)

export const useCoverLetter = () => {
  const context = useContext(CoverLetterContext)
  if (!context) {
    throw new Error('useCoverLetter must be used within a CoverLetterProvider')
  }
  return context
}

interface CoverLetterProviderProps {
  children: ReactNode
}

export function CoverLetterProvider({ children }: CoverLetterProviderProps) {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    keyRequirements: [],
    introduction: '',
    body: '',
    conclusion: '',
    selectedTemplate: 'modern',
    customizations: {
      font: 'inter',
      fontSize: 'medium',
      spacing: 'normal',
      color: 'blue'
    }
  })

  const updateCoverLetter = (field: keyof CoverLetterData, value: any) => {
    setCoverLetterData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateCustomization = (field: keyof Customizations, value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [field]: value
      }
    }))
  }

  return (
    <CoverLetterContext.Provider value={{
      coverLetterData,
      updateCoverLetter,
      updateCustomization
    }}>
      {children}
    </CoverLetterContext.Provider>
  )
}