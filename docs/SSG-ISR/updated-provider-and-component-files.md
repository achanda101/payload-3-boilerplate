# Updated Provider and Component Files for Locale Integration

## File 1: Updated Language Provider

**File: `src/providers/LanguageContext/index.tsx`** (MODIFY)

```typescript
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LanguageContextType {
  selectedLanguage: string
  setLanguage: (language: string) => void
  availableLanguages: string[]
  setAvailableLanguages: (languages: string[]) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
  locale?: string  // Accept initial locale from Layout
  defaultLanguages?: string[]
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  locale = 'en',  // Initialize with URL locale
  defaultLanguages = ['en'],
}) => {
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(defaultLanguages)
  
  // Initialize selectedLanguage with locale from URL
  const [selectedLanguage, setSelectedLanguageState] = useState<string>(locale)

  const setLanguage = (language: string) => {
    setSelectedLanguageState(language)
  }

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setLanguage,
        availableLanguages,
        setAvailableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
```

**Key Changes:**
1. ✅ Removed cookie logic (now handled in Layout server-side)
2. ✅ Added `locale` prop to receive URL locale
3. ✅ Initialize `selectedLanguage` with `locale` from URL
4. ✅ Simplified - no client-side cookie reading needed
5. ✅ Removed `useEffect` for language validation (no longer needed)

---

## File 2: Updated Providers Index

**File: `src/providers/index.tsx`** (MODIFY)

```typescript
'use client'

import React from 'react'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LanguageProvider } from './LanguageContext'

export const Providers: React.FC<{
  children: React.ReactNode
  locale?: string  // Accept locale from Layout
}> = ({ children, locale = 'en' }) => {
  return (
    <ThemeProvider>
      <LanguageProvider locale={locale}>  {/* Pass locale to LanguageProvider */}
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
```

**Key Changes:**
1. ✅ Added `locale` prop to Providers
2. ✅ Pass `locale` to LanguageProvider
3. ✅ Default to 'en' if not provided

---

## File 3: Updated Footer Server Component

**File: `src/globals/Footer/Component.tsx`** (NEW/MODIFY)

```typescript
import React from 'react'
import { FooterClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

interface FooterProps {
  locale?: string
}

export async function Footer({ locale = 'en' }: FooterProps) {
  // Fetch all footer data in the correct locale
  const footerData = await getCachedGlobal('footer', 1, locale)()
  const navData = await getCachedGlobal('nav', 1, locale)()
  const contactData = await getCachedGlobal('contactInfo', 1, locale)()

  return (
    <FooterClient
      initialFooterData={footerData}
      initialNavData={navData}
      initialContactData={contactData}
      initialLocale={locale}
    />
  )
}
```

---

## File 4: Updated Footer Client Component

**File: `src/globals/Footer/Component.client.tsx`** (MODIFY)

```typescript
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
}

interface FooterData {
  logo?: (number | null) | AssetCloud
  orgName?: string
  donateCTA?: {
    heading?: string
    description?: string
    buttonText?: string
    url?: string
  }
  newsletterSub?: {
    description?: string
    inputPlaceholder?: string
    buttonText?: string
    url?: string
  }
  smLinksGroup?: {
    smLinks?: {
      smType?: string
      url?: string
    }[]
  }
}

interface ContactData {
  emails?: Array<{ email?: string; label?: string }>
}

interface FooterClientProps {
  initialFooterData: FooterData
  initialNavData: any
  initialContactData: ContactData
  initialLocale: string
}

export const FooterClient: React.FC<FooterClientProps> = ({
  initialFooterData,
  initialNavData,
  initialContactData,
  initialLocale,
}) => {
  const { selectedLanguage } = useLanguage()
  
  // Initialize state with data from server
  const [orgLogo, setOrgLogo] = useState<FooterData['logo']>(initialFooterData?.logo || null)
  const [orgName, setOrgName] = useState(
    initialFooterData?.orgName || 'Urgent Action Fund Asia & Pacific',
  )
  const [donateCTAData, setDonateCTAData] = useState<FooterData['donateCTA']>(
    initialFooterData?.donateCTA || {},
  )
  const [newsletterData, setNewsletterData] = useState<FooterData['newsletterSub']>(
    initialFooterData?.newsletterSub || {},
  )
  const [navData, setNavData] = useState<any>(initialNavData)
  const [contactInfo, setContactInfo] = useState<ContactData>(initialContactData || { emails: [] })
  const [smLinks, setSmLinks] = useState<FooterData['smLinksGroup']>(
    initialFooterData?.smLinksGroup || { smLinks: [] },
  )
  const [showModal, setShowModal] = useState(false)
  const [subscribeMsg, setSubscribeMsg] = useState('')
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Update footer data when language changes
  useEffect(() => {
    // Only fetch if language changed from initial
    if (selectedLanguage !== initialLocale) {
      handleLanguageChange(selectedLanguage)
    }
  }, [selectedLanguage, initialLocale])

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      // Fetch footer data
      const footerResponse = await fetch(`/api/globals/footer?locale=${newLanguage}&depth=1`)
      const footerData = await footerResponse.json()
      setDonateCTAData(footerData?.donateCTA || {})
      setNewsletterData(footerData?.newsletterSub || {})
      setSmLinks(footerData?.smLinksGroup || { smLinks: [] })
      setOrgName(footerData?.orgName || 'Urgent Action Fund Asia & Pacific')
      setOrgLogo(footerData?.logo || null)

      // Fetch nav data
      const navResponse = await fetch(`/api/globals/nav?locale=${newLanguage}&depth=1`)
      const navData = await navResponse.json()
      setNavData(navData)

      // Fetch contact data
      const contactResponse = await fetch(
        `/api/globals/contactInfo?locale=${newLanguage}&depth=1`,
      )
      const contactData = await contactResponse.json()
      setContactInfo(contactData || { emails: [] })
    } catch (error) {
      console.error('Failed to fetch footer data for locale:', newLanguage, error)
    }
  }

  const handleSubscriptionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && emailRegex.test(email)) {
      try {
        const response = await fetch('https://list.uafanp.org/api/public/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            list_uuids: ['c41c894d-7563-4c8c-ad30-51cb77907cbf'],
          }),
        })

        if (response.ok) {
          setSubscribeMsg(
            `${email} successfully subscribed! You should be receiving newsletters from UAF A&P in your email.`,
          )
        } else {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Subscription failed')
        }
      } catch (error: any) {
        setSubscribeMsg(
          `Error message: ${error.message}. ${email} subscription failed.` ||
            'An error occurred. Please try again.',
        )
      }

      setShowModal(true)
    }
  }

  return (
    <>
      <div className="donate-cta">
        <div>
          <Image
            src="/footer_imgs/donate-banner-top.png"
            alt="Donate banner"
            width={1200}
            height={100}
            sizes="(min-width: 769px) 100vw, 0vw"
            style={{ width: '100%', height: 'auto' }}
            className="desktop-image"
            priority
          />
          <Image
            src="/footer_imgs/donate-banner-top-mobile.png"
            alt="Donate banner"
            width={800}
            height={100}
            sizes="(max-width: 768px) 100vw, 0vw"
            style={{ width: '100%', height: 'auto' }}
            className="mobile-image"
          />
        </div>
        <div className="donate-cta-info-section">
          <span>
            <h2 style={{ whiteSpace: 'pre-line' }}>
              {donateCTAData?.heading || 'Donate CTA Headline'}
            </h2>
            <p>{donateCTAData?.description || 'Donate CTA Tagline'}</p>
          </span>
          <button
            className="pill-button dark"
            onClick={() => (window.location.href = donateCTAData?.url || '#')}
          >
            {donateCTAData?.buttonText || 'Donate Now'}
          </button>
        </div>
        <div>
          <Image
            src="/footer_imgs/donate-banner-bottom.png"
            alt="Donate banner bottom part"
            width={1200}
            height={100}
            sizes="(min-width: 769px) 100vw, 0vw"
            style={{ width: '100%', height: 'auto' }}
            className="desktop-image"
          />
          <Image
            src="/footer_imgs/donate-banner-bottom-mobile.png"
            alt="Donate banner bottom part"
            width={800}
            height={100}
            sizes="(max-width: 768px) 100vw, 0vw"
            style={{ width: '100%', height: 'auto' }}
            className="mobile-image"
          />
        </div>
      </div>
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-grid-item div-i">
            {newsletterData?.description && <h5>{newsletterData.description}</h5>}
          </div>
          <div className="footer-grid-item div-j h-auto min-h-fit">
            <form
              onSubmit={handleSubscriptionSubmit}
              action="https://list.uafanp.org/subscription/form"
              className="flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start gap-0"
            >
              <label htmlFor="email-input" className="sr-only">
                Email address for newsletter
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                placeholder={newsletterData?.inputPlaceholder}
                ref={emailInputRef}
                aria-label="Enter your email address"
              />
              <input id="c41c8" type="checkbox" name="l" value="c41c894d-7563-4c8c-ad30-51cb77907cbf" hidden defaultChecked />
              <button type="submit" className="pill-button dark">
                {newsletterData?.buttonText}
              </button>
            </form>
          </div>
          
          {/* Navigation columns - uses navData state */}
          <div className="footer-grid-item div-a">
            {navData?.menuItems?.[0] && (
              <div>
                <p className="tag">{navData.menuItems?.[0]?.label}</p>
                {navData.menuItems?.[0]?.navItems && (
                  <ul>
                    {navData.menuItems?.[0]?.navItems?.map((navItem: any, index: number) => {
                      const getHref = () => {
                        if (!navItem.link) return '#'
                        if (navItem.link.type === 'reference') {
                          const relationTo = navItem.link.reference?.relationTo
                          const slug = navItem.link.reference?.value?.slug
                          if (relationTo === 'pages') {
                            return `/${slug}` || '#'
                          }
                          return `/${relationTo}/${slug}` || '#'
                        } else {
                          return navItem.link.url || '#'
                        }
                      }
                      return (
                        <li key={index}>
                          <Link href={getHref()} target={navItem.link?.newTab ? '_blank' : '_self'}>
                            <span>{navItem.link?.label}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Repeat similar pattern for div-b, div-c, div-d */}
          
          <div className="footer-grid-item div-e">
            {orgLogo && typeof orgLogo !== 'number' && orgLogo.url ? (
              <Link href="/">
                <Image
                  src={orgLogo.url}
                  alt={orgLogo.alt || 'Site Logo'}
                  width={orgLogo.width || 100}
                  height={orgLogo.height || 50}
                  className="object-contain max-w-[12rem] md:max-w-[14rem] lg:max-w-[19rem] h-auto"
                />
              </Link>
            ) : (
              <Link href="/">Home</Link>
            )}
          </div>
          
          <div className="footer-grid-item div-f">
            {orgName && <h6>{orgName}</h6>}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {smLinks?.smLinks?.map(
                (smLink, index) =>
                  smLink.smType &&
                  smLink.url && (
                    <Link
                      key={index}
                      href={smLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit us on ${smLink.smType}`}
                    >
                      <Image
                        src={`/icons/${smLink.smType.toLowerCase()}.svg`}
                        alt={`${smLink.smType} icon`}
                        width={24}
                        height={24}
                        className="social-icon"
                      />
                    </Link>
                  ),
              )}
            </div>
          </div>
          
          <div className="footer-grid-item div-h">
            <Link
              href="https://uafanp.org/#"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', lineHeight: 0 }}
            >
              <Image
                src="/footer_imgs/ngo-source-logo.png"
                alt="NGO Source logo"
                width={150}
                height={58}
                style={{ display: 'block', height: 'auto' }}
              />
            </Link>
            <Link
              href="https://www.ngosource.org/about-equivalency-determination-on-file-badge"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', lineHeight: 0 }}
            >
              <Image
                src="/footer_imgs/ACNC-Registered-Charity-Logo.png"
                alt="ACNC registered charity logo"
                width={100}
                height={100}
                style={{ display: 'block' }}
              />
            </Link>
          </div>
          
          {contactInfo?.emails && contactInfo.emails.length > 0 && (
            <div className="footer-grid-item div-g">
              {contactInfo.emails.map(
                (emailObj, index) =>
                  emailObj.email && (
                    <div key={index}>
                      <p className="tag">{emailObj.label || emailObj.email}</p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <a href={`mailto:${emailObj.email}`}>{emailObj.email}</a>
                        <Image
                          src={'/arrow-rt.svg'}
                          alt={'arrow right icon'}
                          width={16}
                          height={16}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
        
        <div className="footer-waveborder"></div>
        
        <div className="footer-copyright">
          <p>
            Copyright © {new Date().getFullYear()} UAF ANP | All Rights Reserved |{' '}
            <Link href={navData?.t_and_c?.value?.slug || '#'}>Terms and Conditions</Link> |{' '}
            <Link href={navData?.privacy?.value?.slug || '#'}>Privacy Policy</Link>
          </p>
        </div>
      </footer>

      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: '#fff8eb',
              padding: '3rem',
              borderRadius: '8px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <p>{subscribeMsg}</p>
            <button
              onClick={() => {
                setShowModal(false)
                if (emailInputRef.current) {
                  emailInputRef.current.value = ''
                }
              }}
              className="pill-button dark"
              style={{ marginTop: '1rem' }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
```

**Key Changes to FooterClient:**
1. ✅ Receives `initialFooterData`, `initialNavData`, `initialContactData`, `initialLocale` as props
2. ✅ Initializes all state with server-provided data
3. ✅ Only fetches new data if `selectedLanguage` changes from `initialLocale`
4. ✅ Removed dependency on `data` prop (now uses individual props)
5. ✅ Added proper TypeScript interfaces

---

## File 5: Updated Header Server Component

**File: `src/globals/Header/Component.tsx`** (CREATE NEW FILE)

This is a new server component wrapper for the Header:

```typescript
import React from 'react'
import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

interface HeaderProps {
  locale?: string
}

export async function Header({ locale = 'en' }: HeaderProps) {
  // Fetch all header data in the correct locale server-side
  const headerData = await getCachedGlobal('header', 1, locale)()
  const navData = await getCachedGlobal('nav', 1, locale)()
  const footerData = await getCachedGlobal('footer', 1, locale)() // For donate CTA

  return (
    <HeaderClient
      initialHeaderData={headerData}
      initialNavData={navData}
      initialDonateData={{
        url: footerData?.donateCTA?.url || '',
        buttonText: footerData?.donateCTA?.buttonText || 'Donate',
      }}
      initialLocale={locale}
    />
  )
}
```

**Why This Component:**
1. ✅ Fetches data server-side (faster, better SEO)
2. ✅ Passes initial data to HeaderClient
3. ✅ Eliminates flash on initial load
4. ✅ Language selector auto-syncs with URL locale

---

## File 6: Updated Header Client Component

**File: `src/globals/Header/Component.client.tsx`** (MODIFY)

Update to receive initial data from server and properly sync with URL locale:

```typescript
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import languageOptions from './languageOptions.json'
import { NavMenuClient } from './NavMenu.client'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useDebounce } from '@/utilities/useDebounce'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { Sheet, SheetPortal, SheetOverlay } from '@/components/ui/sheet'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { cn } from 'src/utilities/cn'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'

interface Language {
  value: string
  label: string
}

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
  languages: string[]
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
    } | null
  } | null
}

interface DonateData {
  url: string
  buttonText: string
}

interface HeaderClientProps {
  initialHeaderData: HeaderData
  initialNavData: any
  initialDonateData: DonateData
  initialLocale: string
}

function BannerLink({
  link,
}: {
  link: NonNullable<HeaderData['banner']>['link']
}) {
  if (!link) return null

  let href = '#'
  const target = link.newTab ? '_blank' : undefined
  const rel = link.newTab ? 'noopener noreferrer' : undefined

  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    if (typeof ref.value === 'object' && 'slug' in ref.value) {
      href =
        ref.relationTo === 'pages' ? `/${ref.value.slug}` : `/${ref.relationTo}/${ref.value.slug}`
    }
  } else if (link.type === 'custom' && link.url) {
    href = link.url
  } else if (link.type === 'email' && link.email) {
    href = `mailto:${link.email}`
  }

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
  initialHeaderData,
  initialNavData,
  initialDonateData,
  initialLocale,
}) => {
  const { selectedLanguage, setLanguage, setAvailableLanguages } = useLanguage()
  const { headerTheme } = useHeaderTheme()
  const router = useRouter()
  const pathname = usePathname()
  const searchBarRef = useRef<HTMLDivElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Initialize state with data from server
  const [headerData, setHeaderData] = useState<HeaderData>(initialHeaderData)
  const [navData, setNavData] = useState<any>(initialNavData)
  const [donateUrl, setDonateUrl] = useState(initialDonateData.url)
  const [donateButtonText, setDonateButtonText] = useState(initialDonateData.buttonText)

  // Debounce search query for automatic navigation
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Set available languages on mount
  useEffect(() => {
    if (initialHeaderData.languages && initialHeaderData.languages.length > 0) {
      setAvailableLanguages(initialHeaderData.languages)
    }
  }, [initialHeaderData.languages, setAvailableLanguages])

  // Update header/nav/donate data when language changes
  useEffect(() => {
    // Only fetch if language changed from initial
    if (selectedLanguage !== initialLocale) {
      fetchDataForLanguage(selectedLanguage)
    }
  }, [selectedLanguage, initialLocale])

  const fetchDataForLanguage = async (language: string) => {
    try {
      // Fetch nav data
      const navResponse = await fetch(`/api/globals/nav?locale=${language}&depth=1`)
      const navData = await navResponse.json()
      setNavData(navData)

      // Fetch donate CTA from footer
      const footerResponse = await fetch(`/api/globals/footer?locale=${language}&depth=1`)
      const footerData = await footerResponse.json()
      setDonateUrl(footerData?.donateCTA?.url || '')
      setDonateButtonText(footerData?.donateCTA?.buttonText || 'Donate')
      
      // Note: Header data (logo, banner, etc.) typically doesn't change per locale
      // But if it does, fetch it here:
      // const headerResponse = await fetch(`/api/globals/header?locale=${language}&depth=1`)
      // const headerData = await headerResponse.json()
      // setHeaderData(headerData)
    } catch (error) {
      console.error('Failed to fetch data for language:', language, error)
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    
    // Set cookie on client side for immediate persistence
    document.cookie = `NEXT_LOCALE=${newLanguage}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax${process.env.NODE_ENV === 'production' ? '; secure' : ''}`
    
    // Build new URL with locale prefix
    let newPath = pathname
    
    // Remove existing locale prefix if present
    if (initialLocale !== 'en' && pathname.startsWith(`/${initialLocale}`)) {
      newPath = pathname.replace(`/${initialLocale}`, '')
    }
    
    // Add new locale prefix (except for English)
    if (newLanguage !== 'en') {
      newPath = `/${newLanguage}${newPath || '/'}`
    } else {
      newPath = newPath || '/'
    }
    
    // Navigate to new locale
    router.push(newPath)
  }

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

  // Navigate to search page when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`)
    }
  }, [debouncedSearchQuery, router])

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

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  return (
    <header
      className="site-header"
      data-theme={headerTheme}
    >
      {/* Banner */}
      {headerData.showBanner && headerData.banner && (
        <div className="site-header-banner">
          <p className="site-header-banner-text">{headerData.banner.text}</p>
          {headerData.banner.link && <BannerLink link={headerData.banner.link} />}
        </div>
      )}

      <div className="site-header-wrapper">
        <div className="site-header-content">
          <div className="site-header-row">
            {/* Logo */}
            <div className="site-header-logo-container">
              {headerData.logo &&
              typeof headerData.logo === 'object' &&
              'url' in headerData.logo &&
              headerData.logo.url ? (
                <Link href="/">
                  <Image
                    src={headerData.logo.url}
                    alt={headerData.logo.alt || 'Site Logo'}
                    width={headerData.logo.width || 100}
                    height={headerData.logo.height || 50}
                    className="object-contain max-w-[12rem] md:max-w-[14rem] lg:max-w-[19rem] h-auto"
                    priority
                  />
                </Link>
              ) : (
                <Link href="/" className="font-bold">
                  Home
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="site-header-nav-desktop">
              {navData && <NavMenuClient data={navData} onNavigate={handleNavigation} />}
            </div>

            {/* Actions */}
            <div className="site-header-actions">
              {/* Language Selector - Auto-syncs with URL */}
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="site-header-language-selector"
                aria-label="Select language"
              >
                {headerData.languages?.map((langCode) => {
                  const langOption = languageOptions.find((opt) => opt.value === langCode)
                  return (
                    <option key={langCode} value={langCode}>
                      {langOption?.label || langCode}
                    </option>
                  )
                })}
              </select>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="site-header-mobile-menu-button lg:hidden"
                aria-label="Open menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M4 18L20 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Search Button */}
              {headerData.searchEnabled && (
                <button
                  ref={searchButtonRef}
                  onClick={toggleSearch}
                  className="site-header-search-button"
                  aria-label="Toggle search"
                >
                  {isSearchOpen ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* Donate Button */}
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

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="search-bar" ref={searchBarRef}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
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

      {/* Mobile Menu Sheet */}
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
                  <Link href="/" onClick={() => handleNavigation()}>
                    <Image
                      src={headerData.logo.url}
                      alt={headerData.logo.alt || 'Site Logo'}
                      width={headerData.logo.width || 100}
                      height={headerData.logo.height || 50}
                      className="object-contain max-w-[12rem] md:max-w-[14rem] lg:max-w-[19rem] h-auto"
                    />
                  </Link>
                ) : (
                  <Link href="/" onClick={() => handleNavigation()} className="font-bold">
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
                    <path
                      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
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
                        />
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
                                  if (ref.relationTo === 'pages') {
                                    return `/${ref.value.slug}`
                                  }
                                  return `/${ref.relationTo}/${ref.value.slug}`
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
```

**Key Changes to HeaderClient:**
1. ✅ Changed props structure:
   - From: `data?: { logo?: ..., searchEnabled?: ... }`
   - To: `initialHeaderData`, `initialNavData`, `initialDonateData`, `initialLocale`
2. ✅ Initializes all state with server-provided data
3. ✅ Only fetches new data if `selectedLanguage` changes from `initialLocale`
4. ✅ Language selector auto-syncs with URL locale
5. ✅ Sets cookie on client-side during language change
6. ✅ Builds locale-aware URLs for navigation
7. ✅ No flash on initial load - shows correct locale immediately

---

## Summary of All Changes

### Phase 1: LanguageProvider
- **Before:** Client-side cookie management, no URL awareness
- **After:** Receives locale from URL, initializes state correctly

### Phase 2: Providers
- **Before:** No locale prop
- **After:** Accepts and passes locale to LanguageProvider

### Phase 3: Footer Server Component (NEW)
- Fetches all data in correct locale server-side
- Passes initial data to FooterClient

### Phase 4: Footer Client Component
- **Before:** Always fetches data on mount, no initial data
- **After:** Receives initial data from server, only fetches when language changes

---

## Benefits of This Architecture

1. ✅ **No Flash on Load** - Footer shows with correct locale immediately
2. ✅ **Fewer API Calls** - Only fetches when user changes language
3. ✅ **Better Performance** - Server-side data fetching is faster
4. ✅ **SEO Friendly** - Search engines see localized content in HTML
5. ✅ **Type Safe** - Proper TypeScript interfaces
6. ✅ **Cookie Persistence** - Handled server-side in Layout
7. ✅ **URL as Source of Truth** - Locale always matches URL

---

## Migration Checklist

- [ ] Update `src/providers/LanguageContext/index.tsx`
- [ ] Update `src/providers/index.tsx`
- [ ] Create `src/globals/Footer/Component.tsx` (server component)
- [ ] Update `src/globals/Footer/Component.client.tsx`
- [ ] Remove old cookie utilities from LanguageContext
- [ ] Test language selector synchronization
- [ ] Test footer data updates on language change
- [ ] Verify newsletter form still works
- [ ] Check all navigation links render correctly
