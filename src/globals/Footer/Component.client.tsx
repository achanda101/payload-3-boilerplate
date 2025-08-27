'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../../contexts/LanguageContext'

interface MediaCloud {
  id: number;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
}

interface FooterClientProps {
  data?: {
    logo?: (number | null) | MediaCloud;
    donateCTA?: {
      heading?: string;
      description?: string;
      buttonText?: string;
      url?: string;
    }
    newsletterSub?: {
      description?: string;
      inputPlaceholder?: string;
      buttonText?: string;
      url?: string;
    }
    smLinksGroup?: {
      smLinks?: {
        smType?: string;
        url?: string;
      }[];
    };
  }
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {

  const { logo, donateCTA, newsletterSub, smLinksGroup } = data || {}
  const { selectedLanguage } = useLanguage()
  const [ donateCTAData, setDonateCTAData ] = useState<FooterClientProps['data']['donateCTA']>({})
  const [newsletterData, setNewsletterData] = useState<FooterClientProps['data']['newsletterSub']>({})

  const handleLanguageChange = async (newLanguage: string) => {
    try {
        const response = await fetch(`/api/globals/footer?locale=${newLanguage}&depth=1`)
        const data = await response.json()
        setDonateCTAData(data?.donateCTA || {})
        setNewsletterData(data?.newsletterSub || 'Donate')
      } catch (error) {
        console.error('Failed to fetch footer Donate CTA data and Newsletter data:', error)
      }
  }

  useEffect(() => {
    // Any side effects based on selectedLanguage can be handled here
    handleLanguageChange(selectedLanguage)
  }, [selectedLanguage])

return (
  <footer className="site-footer">
    <div className="footer-content">
      <h1>Footer Content</h1>
      <p>{donateCTAData?.description}</p>
      </div>
  </footer>
)
}