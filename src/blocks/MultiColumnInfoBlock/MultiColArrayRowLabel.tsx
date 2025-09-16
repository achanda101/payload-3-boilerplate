'use client'
import { useRowLabel } from '@payloadcms/ui'

const MultiColArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title: string }>()

  const customLabel = `${data?.title}` || `Column ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default MultiColArrayRowLabel;