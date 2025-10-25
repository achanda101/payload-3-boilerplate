'use client'
import { useRowLabel } from '@payloadcms/ui'


const TagRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ tag?: string }>()

  const customLabel = data?.tag 
    ? `${data.tag}`
      : rowNumber !== undefined
        ? `Tag ${String(rowNumber + 1).padStart(2, '0')}`
          : 'Tag'
  
  return <div>{customLabel}</div>
}

export default TagRowLabel;