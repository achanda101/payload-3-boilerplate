'use client'
import { useRowLabel } from '@payloadcms/ui'
import { useEffect, useState } from 'react'


const FaqRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ question?: string }>()
  const [label, setLabel] = useState<string>('')

  useEffect(() => {
    if (data?.question && typeof data.question === 'string' && data.question.trim()) {
      setLabel(data.question)
    } else {
      setLabel(
        rowNumber !== undefined
          ? `Question ${String(rowNumber + 1).padStart(2, '0')}`
          : 'Question'
      )
    }
  }, [data?.question, rowNumber])

  return <div>{label}</div>
}

export default FaqRowLabel;