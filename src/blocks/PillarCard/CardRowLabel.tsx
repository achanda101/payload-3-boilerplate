'use client'
import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  const label = data?.title || `Pillar Card ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}

export default CardRowLabel
