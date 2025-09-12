'use client'
import { useRowLabel } from '@payloadcms/ui'

const HeroButtonRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ link?: { label?: string } }>()

  const customLabel = `${data?.link?.label}` || `Hero Button ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default HeroButtonRowLabel;