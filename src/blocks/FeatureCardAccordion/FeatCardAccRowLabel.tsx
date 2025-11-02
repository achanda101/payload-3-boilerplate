'use client'
import { useRowLabel } from '@payloadcms/ui'


const FeatCardAccRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ accTitle?: string }>()

  const customLabel = data?.accTitle 
    ? `${data.accTitle}`
      : rowNumber !== undefined
        ? `Accordion Item ${String(rowNumber + 1).padStart(2, '0')}`
          : 'Accordion Item'
  
  return <div>{customLabel}</div>
}

export default FeatCardAccRowLabel;