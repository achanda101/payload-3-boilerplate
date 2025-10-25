'use client'
import { useRowLabel } from '@payloadcms/ui'


const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()

  const customLabel = data?.title
        ? data.title
        : rowNumber !== undefined
         ? `Card ${String(rowNumber + 1).padStart(2, '0')}`
          : 'Card'
  
  return <div>{customLabel}</div>
}

export default CardRowLabel;