import React from 'react'
import Link from 'next/link'
import { ButtonArray } from '@/components/ButtonArray'
import { Heading } from '@/components/Heading'

interface SecondaryCTAProps {
  title: string
  subtitle: string
  uiType?: 'lrg_txt_cta' | 'md_txt_cta' | 'min_cta' | 'puffy_beige_cta'
  ctaButton: {
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
      reference?: {
        relationTo?: string
        value: {
          slug?: string
        }
      }
    }
  }[]
}

export const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  title,
  subtitle,
  uiType = 'lrg_txt_cta',
  ctaButton
}) => {
  const renderTitle = () => {
    const style = { whiteSpace: 'pre-line' as const }

    switch (uiType) {
      case 'md_txt_cta':
        return <Heading level={4} style={style}>{title}</Heading>
      case 'min_cta':
        return <Heading level={5} style={style}>{title}</Heading>
      case 'puffy_beige_cta':
      case 'lrg_txt_cta':
      default:
        return <Heading level={3} style={style}>{title}</Heading>
    }
  }

  const renderSubtitle = () => {
    const style = { whiteSpace: 'pre-line' as const }

    switch (uiType) {
      case 'md_txt_cta':
        return <Heading level={5} style={style}>{subtitle}</Heading>
      case 'min_cta':
      case 'puffy_beige_cta':
      case 'lrg_txt_cta':
      default:
        return <p style={style}>{subtitle}</p>
    }
  }

  return (
    <div className="secondaryCTA" data-ui-type={uiType}>
      <div className="seccondaryCTA_titles">
        {renderTitle()}
        {renderSubtitle()}
      </div>
      <ButtonArray btnArray={ctaButton} colStackOnMobile={true} />
    </div>
  )
}
