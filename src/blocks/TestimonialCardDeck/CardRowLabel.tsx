'use client'
import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ attrib_name?: string }>()
  const label = data?.attrib_name || `Testimonial ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}

export default CardRowLabel
