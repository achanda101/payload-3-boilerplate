import React from 'react'
import { BeigePuffyCallOut } from '@/components/BeigePuffyCallOut'

interface ItemType {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  id?: string | null
}

interface BeigePuffyCallOutBlockProps {
  title?: string | null
  subtitle?: string | null
  align?: 'center' | 'left'
  items?: ItemType[] | null
}

export const BeigePuffyCallOutBlock: React.FC<BeigePuffyCallOutBlockProps> = ({
  title,
  subtitle,
  align,
  items,
}) => {
  return <BeigePuffyCallOut title={title} subtitle={subtitle} align={align} items={items} />
}
