'use client'
import { useRowLabel } from '@payloadcms/ui'


const ComparisonRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ point?: string }>()

  const customLabel = data?.point || `Point ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default ComparisonRowLabel;