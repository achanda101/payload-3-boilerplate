'use client'
import { useRowLabel } from '@payloadcms/ui'

const CtaButtonRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ link?: { label?: string } }>()

  const customLabel = `${data?.link?.label}` || `CTA Button ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default CtaButtonRowLabel;