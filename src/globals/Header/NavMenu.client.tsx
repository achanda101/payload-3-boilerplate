'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface LinkField {
  type: 'reference' | 'custom'
  reference?: any
  url?: string
  label?: string
  newTab?: boolean
  appearance?: string
}

interface NavMenuClientProps {
  data?: {
    menuItems?: Array<{
      id: string
      title?: string
      label?: string
      navItems?: Array<{
        id: string
        title?: string
        url?: string
        link?: LinkField
      }>
    }>
  }
}

interface DropdownMenuProps {
  label: string
  id: string
  children: React.ReactNode
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, id, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div 
      className="relative dropdown-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-dropdown={id}
    >
      <button
        className="flex items-start gap-1 lg:gap-1 text-black text-base font-normal leading-[1.35] hover:opacity-80 transition-opacity dropdown-trigger max-w-[150px] text-left"
        data-dropdown-trigger={id}
      >
        {label}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lg:w-5 lg:h-5 transition-transform dropdown-icon duration-300 flex-shrink-0 mt-0.5 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      <div
        className={`dropdown-menu  ${
          isOpen 
            ? 'opacity-100 visible scale-100' 
            : 'opacity-0 invisible scale-95'
        }`}
        style={{ transformOrigin: 'top center' }}
        data-dropdown-menu={id}
      >
        {children}
      </div>
    </div>
  )
}

export const NavMenuClient: React.FC<NavMenuClientProps> = ({ data }) => {
  if (!data?.menuItems) {
    return null
  }

  return (
    <nav className="flex items-center gap-6">
      {data.menuItems.map((menuItem) => (
        <DropdownMenu
          key={menuItem.id || 'unknown'}
          id={menuItem.id || 'unknown'}
          label={ menuItem.label || 'Menu Item'}
        >
          {menuItem.navItems?.map((navItem) => (
            <Link
              key={navItem.id}
              href={navItem.url || '#'}
              className="dropdown-menu-item"
            >
              <span>{navItem.link?.label}</span>
            </Link>
          ))}
        </DropdownMenu>
      ))}
    </nav>
  )
}