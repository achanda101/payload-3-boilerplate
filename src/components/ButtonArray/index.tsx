import React, { useState } from 'react'
import Link from 'next/link'
import { ETestRender } from '@/components/ETestRender'
import { getValidUrl } from '@/utilities/getValidUrl'
import { formatFileSize } from '@/utilities/formatFileSize'

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

interface ButtonItem {
  id: string
  link: {
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
}

type ButtonArrayProps = ButtonItem[]

export const ButtonArray: React.FC<{ btnArray: ButtonArrayProps; colStackOnMobile: boolean }> = ({
  btnArray,
  colStackOnMobile = false,
}) => {
  const [isETestOpen, setIsETestOpen] = useState(false)
  const [currentEtestData, setCurrentEtestData] = useState<ButtonItem['link']['etestlink'] | null>(
    null,
  )

  const getBtnArrayClassName = () => {
    const classes: string[] = ['btn-array']
    if (colStackOnMobile) {
      classes.push('col-stack-mobile')
    }
    return classes.join(' ')
  }

  const handleEtestClick =
    (etestData: ButtonItem['link']['etestlink']) => (e: React.MouseEvent) => {
      e.preventDefault()
      setCurrentEtestData(etestData)
      setIsETestOpen(true)
    }

  const closeModal = () => {
    setIsETestOpen(false)
    setCurrentEtestData(null)
  }

  return (
    <>
      <div className={getBtnArrayClassName()}>
        {btnArray.map((button, index) => {
          const getHref = () => {
            if (!button.link) return '#'
            return getValidUrl(button.link as any)
          }

          const getBtnClassName = () => {
            const classes: string[] = []

            // Handle download link variants
            if (button.link.downloadLink) {
              classes.push('download')
              if (button.link.pillSolid) {
                classes.push('pill-button', 'dark')
              } else if (button.link.pillOutline) {
                classes.push('pill-button', 'outline')
              }
            }

            // Handle arrow link variants
            else if (button.link.arrowLink) {
              classes.push('arrow')
              if (button.link.pillSolid) {
                classes.push('pill-button', 'dark')
              } else if (button.link.pillOutline) {
                classes.push('pill-button', 'outline')
              }
            }

            // Handle pill buttons without download or arrow link
            else if (button.link.pillSolid) {
              classes.push('pill-button', 'dark')
            } else if (button.link.pillOutline) {
              classes.push('pill-button', 'outline')
            }

            // Default to underline if no specific variant is set
            else {
              classes.push('underline')
            }

            return classes.join(' ')
          }

          // Check if link type is 'etest'
          if (button.link.type === 'etest') {
            return (
              <button
                key={index}
                onClick={handleEtestClick(button.link.etestlink)}
                className={getBtnClassName()}
              >
                {button.link.label}
              </button>
            )
          }

          const isDocumentLink = button.link.type === 'document'
          const fileSize = isDocumentLink ? button.link.doc?.value?.filesize : null

          return (
            <div key={index} className="flex flex-col items-center h-full">
              <Link href={getHref()} target={button.link?.newTab ? '_blank' : '_self'}>
                <button className={getBtnClassName()}>{button.link.label}</button>
              </Link>
              <div className="h-5">
                {isDocumentLink && fileSize && (
                  <div className="text-xs text-gray-500 mt-1">Filesize: {formatFileSize(fileSize)}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Display the Eligibility Test Contents using the ETestRender */}
      {isETestOpen && <ETestRender etestData={currentEtestData as any} onClose={closeModal} />}
    </>
  )
}
