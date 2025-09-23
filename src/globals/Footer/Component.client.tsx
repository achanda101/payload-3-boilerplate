'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../../providers/LanguageContext'
import { set } from 'react-hook-form'

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

export const FooterClient: React.FC<FooterClientProps> = ({ data = {} }) => {

  const { selectedLanguage } = useLanguage()
  const [ orgLogo, setOrgLogo ] = useState<NonNullable<FooterClientProps[ 'data' ]>[ 'logo' ]>(null)
  const [ orgName, setOrgName ] = useState('Urgent Action Fund Asia & Pacific')
  const [ donateCTAData, setDonateCTAData ] = useState<NonNullable<FooterClientProps[ 'data' ]>[ 'donateCTA' ]>({})
  const [ newsletterData, setNewsletterData ] = useState<NonNullable<FooterClientProps[ 'data' ]>[ 'newsletterSub' ]>({})
  const [ navData, setNavData ] = useState<any>(null)
  const [ contactInfo, setContactInfo ] = useState<{ emails?: Array<{ email?: string; label?: string }> }>({})
  const [ smLinks, setSmLinks ] = useState<NonNullable<FooterClientProps[ 'data' ]>[ 'smLinksGroup' ]>({ smLinks: [] })
  const [ showModal, setShowModal ] = useState(false)
  const [ subscribedEmail, setSubscribedEmail ] = useState('')
  const emailInputRef = useRef<HTMLInputElement>(null)
  
  const handleLanguageChange = async (newLanguage: string) => {
    try {
      const response = await fetch(`/api/globals/footer?locale=${newLanguage}&depth=1`)
      const data = await response.json()
      setDonateCTAData(data?.donateCTA || {})
      setNewsletterData(data?.newsletterSub || {})
      setSmLinks(data?.smLinksGroup || { smLinks: [] })
      setOrgName(data?.orgName || 'Urgent Action Fund Asia & Pacific')
      setOrgLogo(data?.logo || null)
    } catch (error) {
      console.error('Failed to fetch footer Donate CTA data and Newsletter data:', error)
    }
    // Fetch nav data for the selected language
    try {
      const response = await fetch(`/api/globals/nav?locale=${newLanguage}&depth=1`)
      const data = await response.json()
      setNavData(data)
    } catch (error) {
      console.error('Failed to fetch footer navigation data:', error)
    }
    // Fetch contact data for the selected language
    try {
      const response = await fetch(`/api/globals/contactInfo?locale=${newLanguage}&depth=1`)
      const data = await response.json()
      setContactInfo(data || { emails: [] })
    } catch (error) {
      console.error('Failed to fetch footer navigation data:', error)
    }
  }

  useEffect(() => {
    // Any side effects based on selectedLanguage can be handled here
    handleLanguageChange(selectedLanguage)
  }, [ selectedLanguage ])

  const handleSubscriptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && emailRegex.test(email)) {
      setSubscribedEmail(email)
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
            <h2 style={{ whiteSpace: 'pre-line' }}>{donateCTAData?.heading || 'Donate CTA Headline'}</h2>
            <p>{donateCTAData?.description || 'Donate CTA Tagline'}</p>
          </span>
          <button className='pill-button dark' onClick={() => window.location.href = donateCTAData?.url || '#'}>
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
          {newsletterData?.description && (
            <h5>{newsletterData.description}</h5>
          )}
        </div>
          <div className="footer-grid-item div-j">
            {/* <form method="post" action="https://list.uafanp.org/subscription/form" style={{display: 'flex'}}> */}
            <form onSubmit={handleSubscriptionSubmit} style={{display: 'flex'}}>
              <input type="email" name="email" placeholder={newsletterData?.inputPlaceholder} ref={emailInputRef} />
              <input id="c41c8" type="checkbox" name="l" defaultChecked value="c41c894d-7563-4c8c-ad30-51cb77907cbf"/>
              <button type='submit' className="pill-button dark">{newsletterData?.buttonText}</button>
            </form>
        </div>
        <div className="footer-grid-item div-k"></div>
        <div className="footer-grid-item div-a">
          {navData?.menuItems?.[ 0 ] && (
            <div>
              <p className='tag'>{navData.menuItems?.[ 0 ]?.label}</p>
              {navData.menuItems?.[ 0 ]?.navItems && (
                <ul>
                
                  {navData.menuItems?.[ 0 ]?.navItems?.map((navItem, index) => {
                    const getHref = () => {
                      if (!navItem.link) return '#'
                      if (navItem.link.type === 'reference') {
                        return `/${navItem.link.reference?.relationTo}/${navItem.link.reference?.value?.slug}` || '#'
                      } else {
                        return navItem.link.url || '#'
                      }
                    }
                    return (
                      <li key={index}>
                        <Link
                          href={getHref()}
                          target={navItem.link?.newTab ? '_blank' : '_self'}
                        >
                          {navItem.link?.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="footer-grid-item div-b">
          {navData?.menuItems?.[ 1 ] && (
            <div>
              <p className='tag'>{navData.menuItems?.[ 1 ]?.label}</p>
              {navData.menuItems?.[ 1 ]?.navItems && (
                <ul>
                
                  {navData.menuItems?.[ 1 ]?.navItems?.map((navItem, index) => {
                    const getHref = () => {
                      if (!navItem.link) return '#'
                      if (navItem.link.type === 'reference') {
                        return `/${navItem.link.reference?.relationTo}/${navItem.link.reference?.value?.slug}` || '#'
                      } else {
                        return navItem.link.url || '#'
                      }
                    }
                    return (
                      <li key={index}>
                        <Link
                          href={getHref()}
                          target={navItem.link?.newTab ? '_blank' : '_self'}
                        >
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
        <div className="footer-grid-item div-c">
          {navData?.menuItems?.[ 2 ] && (
            <div>
              <p className='tag'>{navData.menuItems?.[ 2 ]?.label}</p>
              {navData.menuItems?.[ 2 ]?.navItems && (
                <ul>
                
                  {navData.menuItems?.[ 2 ]?.navItems?.map((navItem, index) => {
                    const getHref = () => {
                      if (!navItem.link) return '#'
                      if (navItem.link.type === 'reference') {
                        return `/${navItem.link.reference?.relationTo}/${navItem.link.reference?.value?.slug}` || '#'
                      } else {
                        return navItem.link.url || '#'
                      }
                    }
                    return (
                      <li key={index}>
                        <Link
                          href={getHref()}
                          target={navItem.link?.newTab ? '_blank' : '_self'}
                        >
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
        <div className="footer-grid-item div-d">
          {navData?.menuItems?.[ 3 ] && (
            <div>
              <p className='tag'>{navData.menuItems?.[ 3 ]?.label}</p>
              {navData.menuItems?.[ 3 ]?.navItems && (
                <ul>
                  {navData.menuItems?.[ 3 ]?.navItems?.map((navItem, index) => {
                    const getHref = () => {
                      if (!navItem.link) return '#'
                      if (navItem.link.type === 'reference') {
                        return `/${navItem.link.reference?.relationTo}/${navItem.link.reference?.value?.slug}` || '#'
                      } else {
                        return navItem.link.url || '#'
                      }
                    }
                    return (
                      <li key={index}>
                        <Link
                          href={getHref()}
                          target={navItem.link?.newTab ? '_blank' : '_self'}
                        >
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
        <div className="footer-grid-item div-e">
          {orgLogo && typeof orgLogo !== 'number' && orgLogo.url ? (
            <Image
              src={orgLogo.url}
              alt={orgLogo.alt || "Site Logo"}
              width={orgLogo.width || 100}
              height={orgLogo.height || 50}
            />
          ) : (
            <Link href="/">Home</Link>
          )}
        </div>
        <div className="footer-grid-item div-f">
          {orgName && <h6>{orgName}</h6>}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {smLinks?.smLinks?.map((smLink, index) => (
              smLink.smType && smLink.url && (
                <Link key={index} href={smLink.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`/icons/${smLink.smType.toLowerCase()}.svg`}
                    alt={`${smLink.smType} icon`}
                    width={24}
                    height={24}
                    className="social-icon"
                  />
                </Link>
              )
            ))}
          </div>
        </div>   
          {contactInfo?.emails && contactInfo.emails.length > 0 && (
            <div className="footer-grid-item div-g">
                {contactInfo.emails.map((emailObj, index) => (
                  emailObj.email && (
                    <div key={index}>
                      <p className='tag'>{emailObj.label || emailObj.email}</p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <a href={`mailto:${emailObj.email}`}>{emailObj.email}</a>
                        <Image
                          src={'/arrow-rt.svg'}
                          alt={'arrow right icon'}
                          width={16}
                          height={16}
                        />
                      </span>
                      
                    </div>
                  )
                ))}
            </div>
          )}
        </div>
      <div className="footer-waveborder"></div>
      <div className="footer-copyright">
        <p>
          Copyright © {new Date().getFullYear()} UAF ANP | All Rights Reserved | <Link href={navData?.t_and_c?.value?.slug || '#'}>Terms and Conditions</Link> | <Link href={navData?.privacy?.value?.slug || '#'}>Privacy Policy</Link>
        </p>
      </div>
      </footer>
      
      {showModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#fff8eb',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h6 style={{ marginBottom: '1rem' }}>Thank you!</h6>
            <p>{subscribedEmail} is now subscribed to our newsletter.</p>
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