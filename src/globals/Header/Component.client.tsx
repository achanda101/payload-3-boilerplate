'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import languageOptions from './languageOptions.json'
import { NavMenuClient } from './NavMenu.client'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface Language {
  value: string;
  label: string;
}

interface MediaCloud {
  id: number;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
}

interface HeaderClientProps {
  data?: {
    logo?: (number | null) | MediaCloud;
    searchEnabled?: boolean | null;
    languages: string[];
  };
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data = {} }) => {
  const { selectedLanguage, setSelectedLanguage, setAvailableLanguages } = useLanguage()
  const { headerTheme } = useHeaderTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [headerData, setHeaderData] = useState<Partial<NonNullable<HeaderClientProps['data']>>>({})
  const [ navData, setNavData ] = useState(null)
  const [donateUrl, setDonateUrl] = useState('')
  const [ donateButtonText, setDonateButtonText ] = useState('Donate')

  // Fetch header data and set available languages
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('/api/globals/header?depth=1')
        const data = await response.json()
        setHeaderData(data)
        if (data.languages && data.languages.length > 0) {
          setAvailableLanguages(data.languages)
        }
      } catch (error) {
        console.error('Failed to fetch header data:', error)
      }
    }
    
    fetchHeaderData()
  }, [setAvailableLanguages])
  
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const fetchDataForLanguage = async (language: string) => {
    // Fetch nav data for the selected language
    try {
      const response = await fetch(`/api/globals/nav?locale=${language}&depth=1`)
      const data = await response.json()
      setNavData(data)
    } catch (error) {
      console.error('Failed to fetch navigation data:', error)
    }
    // Fetch donate URL and button text from footer global
    try {
        const response = await fetch(`/api/globals/footer?locale=${language}&depth=1`)
        const data = await response.json()
        setDonateUrl(data?.donateCTA?.url || '')
        setDonateButtonText(data?.donateCTA?.buttonText || 'Donate')
      } catch (error) {
        console.error('Failed to fetch footer Donate CTA data:', error)
      }
  }

  const handleLanguageChange = async (newLanguage: string) => {
    setSelectedLanguage(newLanguage)
    await fetchDataForLanguage(newLanguage)
  }

  useEffect(() => {
    // Initial fetch without changing the selected language
    fetchDataForLanguage(selectedLanguage)
  }, [selectedLanguage])


  return (
    <header className={`site-header ${headerTheme}`}>
      <div className="site-header-content">
        <div className="site-header-toprow">
          <span style={{display: 'inline-flex', alignItems: 'center'}}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lg:w-4 lg:h-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <select 
            value={selectedLanguage} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className='language-selector'
          >
            {(headerData.languages || []).map((langValue: string) => {
              const langOption = languageOptions.find(option => option.value === langValue)
              return (
                <option key={langValue} value={langValue}>
                  {langOption?.display || langOption?.label || langValue}
                </option>
              )
            })}
            </select>
            </span>
        </div>
        <div className='site-header-bottomrow'>
          {headerData.logo && typeof headerData.logo === 'object' && 'url' in headerData.logo && headerData.logo.url ? (
            <Link href="/">
              <Image 
                src={headerData.logo.url} 
                alt={headerData.logo.alt || "Site Logo"} 
                width={headerData.logo.width || 100} 
                height={headerData.logo.height || 50} 
              />
            </Link>
          ) : (
              <Link href="/">Home</Link>
          )}
          <NavMenuClient data={navData} />
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            {headerData.searchEnabled && (
              <button onClick={toggleSearch} className='search-icon'>
                {isSearchOpen ?
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg> :
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="#080341"></path> </g></svg>
                }
              </button>
            )}
            <button className="pill-button dark" onClick={() => window.location.href = donateUrl}>{donateButtonText}</button>
          </div>
          
        </div>
      </div>
      {isSearchOpen && (
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      )}
    </header>
  )

}