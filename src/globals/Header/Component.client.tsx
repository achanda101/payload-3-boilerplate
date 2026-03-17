'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import languageOptions from './languageOptions.json'
import { NavMenuClient } from './NavMenu.client'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useDebounce } from '@/utilities/useDebounce'
import { stripLocaleFromPathname } from '@/utilities/localeUtils'
import { getValidUrl } from '@/utilities/getValidUrl'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { Sheet, SheetPortal, SheetOverlay } from '@/components/ui/sheet'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { cn } from 'src/utilities/cn'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
}

interface HeaderData {
  logo?: (number | null) | AssetCloud
  searchEnabled?: boolean | null
  languages?: string[]
  showBanner?: boolean | null
  banner?: {
    text?: string | null
    link?: {
      type?: 'reference' | 'custom' | 'email' | 'document' | 'etest' | null
      reference?: {
        relationTo: string
        value: { slug: string } | string | number
      } | null
      url?: string | null
      email?: string | null
      label?: string | null
      newTab?: boolean | null
      anchor?: string | null
    } | null
  } | null
}

interface DonateData {
  url: string
  buttonText: string
}

interface HeaderClientProps {
  initialHeaderData?: HeaderData
  initialNavData?: any
  initialDonateData?: DonateData
  initialLocale?: string
}

function BannerLink({
  link,
  locale = 'en',
}: {
  link: NonNullable<NonNullable<HeaderData['banner']>>['link']
  locale?: string
}) {
  if (!link) return null

  const href = getValidUrl(link as any, locale)
  const target = link.newTab ? '_blank' : undefined
  const rel = link.newTab ? 'noopener noreferrer' : undefined

  return (
    <a href={href} target={target} rel={rel} className="site-header-banner-link">
      {link.label}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  initialHeaderData = {},
  initialNavData = null,
  initialDonateData = { url: '', buttonText: 'Donate' },
  initialLocale = 'en',
}) => {
  const { selectedLanguage, setSelectedLanguage, setAvailableLanguages } = useLanguage()
  const { headerTheme } = useHeaderTheme()
  const router = useRouter()
  const pathname = usePathname()
  const searchBarRef = useRef<HTMLDivElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize state with server-provided data
  const [headerData] = useState<HeaderData>(initialHeaderData)
  const [navData, setNavData] = useState<any>(initialNavData)
  const [donateUrl, setDonateUrl] = useState(initialDonateData.url)
  const [donateButtonText, setDonateButtonText] = useState(initialDonateData.buttonText)

  // Debounce search query for automatic navigation
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Set available languages on mount from server data
  useEffect(() => {
    if (initialHeaderData.languages && initialHeaderData.languages.length > 0) {
      setAvailableLanguages(initialHeaderData.languages)
    }
  }, [initialHeaderData.languages, setAvailableLanguages])

  const fetchDataForLanguage = useCallback(async (language: string) => {
    try {
      const response = await fetch(`/api/globals/nav?locale=${language}&depth=1`)
      const data = await response.json()
      setNavData(data)
    } catch (error) {
      console.error('Failed to fetch navigation data:', error)
    }
    try {
      const response = await fetch(`/api/globals/footer?locale=${language}&depth=1`)
      const data = await response.json()
      setDonateUrl(data?.donateCTA?.url || '')
      setDonateButtonText(data?.donateCTA?.buttonText || 'Donate')
    } catch (error) {
      console.error('Failed to fetch footer Donate CTA data:', error)
    }
  }, [])

  // Only re-fetch when language changes from the initial server-provided locale
  useEffect(() => {
    if (selectedLanguage !== initialLocale) {
      fetchDataForLanguage(selectedLanguage)
    }
  }, [selectedLanguage, initialLocale, fetchDataForLanguage])

  const toggleSearch = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setIsSearchOpen((prev) => {
      if (prev) {
        setSearchQuery('')
      }
      return !prev
    })
  }

  const handleNavigation = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage)

    // Build locale-aware URL - all locales get prefix including English
    const cleanPath = stripLocaleFromPathname(pathname)
    const newPath = `/${newLanguage}${cleanPath === '/' ? '' : cleanPath}`

    router.push(newPath)
  }

  // Navigate to search page when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      router.push(`/${selectedLanguage}/search?q=${encodeURIComponent(debouncedSearchQuery)}`)
    }
  }, [debouncedSearchQuery, router, selectedLanguage])

  // Handle Escape key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  // Handle click outside search bar to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchButtonRef.current && searchButtonRef.current.contains(e.target as Node)) {
        return
      }

      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        if (isSearchOpen) {
          setIsSearchOpen(false)
          setSearchQuery('')
        }
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  return (
    <header className={`site-header ${headerTheme}`}>
      {/* Announcement Banner */}
      {headerData.showBanner && headerData.banner?.text && (
        <div className="site-header-banner">
          <div className="site-header-banner-content">
            <p>{headerData.banner.text}</p>
            {headerData.banner.link?.label && <BannerLink link={headerData.banner.link} locale={selectedLanguage} />}
          </div>
        </div>
      )}
      <div className="site-header-content">
        <div className="site-header-toprow">
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
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
              className="language-selector"
              aria-label="Select language"
            >
              {(headerData.languages || []).map((langValue: string) => {
                const langOption = languageOptions.find((option) => option.value === langValue)
                return (
                  <option key={langValue} value={langValue}>
                    {langOption?.display || langOption?.label || langValue}
                  </option>
                )
              })}
            </select>
          </span>
        </div>
        <div className="site-header-bottomrow">
          {headerData.logo &&
          typeof headerData.logo === 'object' &&
          'url' in headerData.logo &&
          headerData.logo.url ? (
            <Link href={`/${selectedLanguage}`}>
              <Image
                src={headerData.logo.url}
                alt={headerData.logo.alt || 'Site Logo'}
                width={headerData.logo.width || 100}
                height={headerData.logo.height || 50}
                className="object-contain max-w-[12rem] md:max-w-[14rem] lg:max-w-[19rem] h-auto"
              />
            </Link>
          ) : (
            <Link href={`/${selectedLanguage}`}>Home</Link>
          )}
          <div className="hidden lg:block">
            <NavMenuClient data={navData} />
          </div>
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="Menu / Close_MD">
                    <path
                      id="Vector"
                      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M5 7H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M5 17H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
            )}
          </button>
          {/* Search Bar for desktop */}
          <div className="hidden lg:flex">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {headerData.searchEnabled && (
                <button
                  ref={searchButtonRef}
                  onClick={toggleSearch}
                  className="search-icon"
                  aria-label={isSearchOpen ? "Close search" : "Open search"}
                >
                  {isSearchOpen ? (
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {' '}
                        <g id="Menu / Close_MD">
                          {' '}
                          <path
                            id="Vector"
                            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                        </g>{' '}
                      </g>
                    </svg>
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {' '}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
                          fill="#080341"
                        ></path>{' '}
                      </g>
                    </svg>
                  )}
                </button>
              )}
              <button
                className="pill-button dark"
                onClick={() => (window.location.href = donateUrl)}
              >
                {donateButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="search-bar" ref={searchBarRef}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                router.push(`/${selectedLanguage}/search?q=${encodeURIComponent(searchQuery)}`)
                setIsSearchOpen(false)
              }
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsSearchOpen(false)
                  setSearchQuery('')
                }
              }}
              autoFocus
            />
          </form>
        </div>
      )}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetPortal>
          <SheetOverlay />
          <SheetPrimitive.Content
            className={cn(
              'fixed right-0 top-0 z-50 h-screen w-full border-l shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right lg:hidden',
            )}
            style={{ backgroundColor: 'hsl(39, 100%, 96%)' }}
          >
            <VisuallyHidden.Root>
              <SheetPrimitive.Title>Navigation Menu</SheetPrimitive.Title>
            </VisuallyHidden.Root>
            <div
              className="flex flex-col h-full p-6"
              style={{ backgroundColor: 'hsl(39, 100%, 96%)' }}
            >
              {/* Logo + Close Button */}
              <div className="flex justify-between items-center mt-7 mb-6 flex-shrink-0">
                {headerData.logo &&
                typeof headerData.logo === 'object' &&
                'url' in headerData.logo &&
                headerData.logo.url ? (
                  <Link href={`/${selectedLanguage}`} onClick={() => handleNavigation()}>
                    <Image
                      src={headerData.logo.url}
                      alt={headerData.logo.alt || 'Site Logo'}
                      width={headerData.logo.width || 100}
                      height={headerData.logo.height || 50}
                      className="object-contain max-w-[12rem] md:max-w-[14rem] lg:max-w-[19rem] h-auto"
                    />
                  </Link>
                ) : (
                  <Link href={`/${selectedLanguage}`} onClick={() => handleNavigation()} className="font-bold">
                    Menu
                  </Link>
                )}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 flex items-center justify-center rounded-full border-2 border-gray-800"
                  aria-label="Close menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Menu / Close_MD">
                        <path
                          id="Vector"
                          d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>

              {/* Search Input Box */}
              {headerData.searchEnabled && (
                <div className="mb-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (searchQuery.trim()) {
                        router.push(`/${selectedLanguage}/search?q=${encodeURIComponent(searchQuery)}`)
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className="flex items-center border-2 border-gray-300 rounded-full px-4 py-2"
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      className="flex-1 outline-none bg-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setSearchQuery('')
                        }
                      }}
                    />
                    <button type="submit" className="p-1 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
                          fill="#080341"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              )}

              <div>
                {/* Menu Items */}
                {navData && navData.menuItems && (
                  <nav className="flex-1 space-y-2 overflow-y-auto">
                    {navData.menuItems.map((menuItem: any) => (
                      <Collapsible key={menuItem.id || 'unknown'}>
                        <CollapsibleTrigger className="w-full flex items-center justify-between py-3 text-left hover:text-gray-600 transition-colors group">
                          <h6>{menuItem.label || 'Menu Item'}</h6>
                          <ChevronDown className="w-5 h-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border border-gray-800 rounded-xl p-4 mb-4 space-y-3">
                          {menuItem.navItems?.map((navItem: any) => {
                            const getHref = () => {
                              if (!navItem.link) return '#'
                              if (navItem.link.type === 'reference') {
                                const ref = navItem.link.reference
                                if (ref?.relationTo && ref?.value?.slug) {
                                  const collectionPath =
                                    ref.relationTo === 'pages'
                                      ? `/${ref.value.slug}`
                                      : `/${ref.relationTo}/${ref.value.slug}`
                                  return `/${selectedLanguage}${collectionPath}`
                                }
                                return '#'
                              } else {
                                return navItem.link.url || '#'
                              }
                            }

                            return (
                              <Link
                                key={navItem.id}
                                href={getHref()}
                                className="block hover:text-gray-600 transition-colors"
                                onClick={() => handleNavigation()}
                              >
                                <p className="text-[18px]">{navItem.link?.label}</p>
                              </Link>
                            )
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </nav>
                )}

                {/* Donate Button */}
                <button
                  onClick={() => (window.location.href = donateUrl)}
                  className="block mx-auto mt-8 w-[50vw] bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  {donateButtonText}
                </button>
              </div>
            </div>
          </SheetPrimitive.Content>
        </SheetPortal>
      </Sheet>
    </header>
  )
}
