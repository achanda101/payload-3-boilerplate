import React from 'react'
import { PinkPuffyCallOut } from '@/components/PinkPuffyCallOut'

interface TopRowItem {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  id?: string | null
}

interface BotRowItem {
  title?: string | null
  description?: string | null
  id?: string | null
}

interface LinkItem {
  link?: {
    type?: string
    newTab?: boolean | null
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    url?: string | null
    label?: string | null
    email?: string | null
    reference?: {
      relationTo?: string
      value: {
        slug?: string
      }
    } | null
    doc?: {
      relationTo: string
      value: {
        url?: string
      }
    } | null
    etestlink?: any
  }
  id?: string | null
}

interface PinkPuffyCallOutBlockProps {
  id?: string
  title?: string | null
  subtitle?: string | null
  align?: 'center' | 'left'
  topRow?: TopRowItem[] | null
  botRow?: BotRowItem[] | null
  links?: LinkItem[] | null
  blockType?: 'pinkPuffy'
}

export const PinkPuffyCallOutBlock: React.FC<PinkPuffyCallOutBlockProps> = ({
  title,
  subtitle,
  align,
  topRow,
  botRow,
  links,
}) => {
  return (
    <PinkPuffyCallOut
      title={title}
      subtitle={subtitle}
      align={align}
      topRow={topRow}
      botRow={botRow}
      links={links}
    />
  )
}
