'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ETestRender } from '@/components/ETestRender'
import { getValidUrl } from '@/utilities/getValidUrl'
import { formatFileSize } from '@/utilities/formatFileSize'
import { useLanguage } from '@/providers/LanguageContext'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

interface ETestLink {
  type: string
  url?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo?: string
    value: {
      slug?: string
    }
  }
  downloadLink?: boolean | null
  arrowLink?: boolean | null
  pillSolid?: boolean | null
  pillOutline?: boolean | null
  label: string | null
  etestlink?: {
    relationTo?: string
    value: {
      introCard?: object | null
      critList?: object | null
      isECard?: object | null
      notECard?: object | null
    }
  }
}

interface ButtonProps {
  button: {
    type: string
    newTab?: boolean | null
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    url?: string | null
    label: string | null
    email?: string | null
    doc?: {
      relationTo: string
      value: {
        url?: string
        filesize?: number | null
      }
    } | null
    reference?: {
      relationTo?: string
      value: {
        slug?: string
      }
    } | null
    etestlink?: {
      relationTo?: string
      value: {
        introCard?: {
          introTitle?: string | null
          introDesc?: Record<string, any> | null
        }
        critList?: {
          criteria?:
            | {
                question?: string | null
                reason?: string | null
                options?:
                  | {
                      optionText?: string | null
                      isEligible?: boolean | null
                      isCustom?: boolean | null
                      customResponse?: Record<string, any> | null
                    }[]
                  | null
              }[]
            | null
        } | null
        isECard?: {
          isETitle?: string | null
          isEDesc?: Record<string, any> | null
          isELink?: ETestLink | null
          isEMascot?: AssetCloud | null
        } | null
        notECard?: {
          notETitle?: string | null
          notEDesc?: Record<string, any> | null
          notELink?: ETestLink | null
          notEMascot?: AssetCloud | null
        } | null
      }
    } | null
  }
  align?: 'left' | 'center'
}

export const UAFButton: React.FC<ButtonProps> = ({ button, align = 'left' }) => {
  const { selectedLanguage } = useLanguage()
  const [isETestOpen, setIsETestOpen] = useState(false)

  const handleEtestClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsETestOpen(true)
  }

  const closeModal = () => {
    setIsETestOpen(false)
  }

  const getHref = () => {
    return getValidUrl(button as any, selectedLanguage)
  }

  const getBtnClassName = () => {
    const classes: string[] = []

    // Handle download link variants
    if (button.downloadLink) {
      classes.push('download')
      if (button.pillSolid) {
        classes.push('pill-button', 'dark')
      } else if (button.pillOutline) {
        classes.push('pill-button', 'outline')
      }
    }

    // Handle arrow link variants
    else if (button.arrowLink) {
      classes.push('arrow')
      if (button.pillSolid) {
        classes.push('pill-button', 'dark')
      } else if (button.pillOutline) {
        classes.push('pill-button', 'outline')
      }
    }

    // Handle pill buttons without download or arrow link
    else if (button.pillSolid) {
      classes.push('pill-button', 'dark')
    } else if (button.pillOutline) {
      classes.push('pill-button', 'outline')
    }

    // Default to underline if no specific variant is set
    else {
      classes.push('underline')
    }

    return classes.join(' ')
  }

  // Check if link type is 'etest'
  if (button.type === 'etest') {
    return (
      <>
        <button onClick={handleEtestClick} className={getBtnClassName()}>
          {button.label}
        </button>
        {isETestOpen && <ETestRender etestData={button.etestlink as any} onClose={closeModal} />}
      </>
    )
  }

  const isDocumentLink = button.type === 'document'
  const fileSize = isDocumentLink ? button.doc?.value?.filesize : null

  return (
    <div className={`flex flex-col h-full ${align === 'left' ? 'items-start' : 'items-center'}`}>
      <Link
        href={getHref()}
        target={button?.newTab ? '_blank' : '_self'}
        className="flex flex-col items-center"
      >
        <button className={getBtnClassName()}>{button.label}</button>

        {isDocumentLink && fileSize && (
          <div className="h-5">
            <div className="text-xs text-gray-500 mt-1">Filesize: {formatFileSize(fileSize)}</div>
          </div>
        )}
      </Link>
    </div>
  )
}
