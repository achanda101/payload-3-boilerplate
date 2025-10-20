'use client'
import { useRowLabel } from '@payloadcms/ui'


const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string, subtitle?: string }>()

  const customLabel = data?.title && data?.subtitle
    ? `${data.title} ${data.subtitle}`
    : data?.title
      ? data.title
      : data?.subtitle
        ? data.subtitle
        : rowNumber !== undefined
         ? `Card ${String(rowNumber + 1).padStart(2, '0')}`
          : 'Card'
  
  return <div>{customLabel}</div>
}

export default CardRowLabel;