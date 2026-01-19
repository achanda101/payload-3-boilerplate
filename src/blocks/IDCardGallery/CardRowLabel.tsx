'use client'
import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ fullname?: string }>()
  const label = data?.fullname || `ID Card ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}

export default CardRowLabel
