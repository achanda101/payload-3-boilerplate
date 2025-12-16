'use client'
import { useRowLabel } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

const CriteriaRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ question?: string }>()
  const [label, setLabel] = useState<string>('')

  useEffect(() => {
    if (data?.question && typeof data.question === 'string' && data.question.trim()) {
      const truncatedText =
        data.question.length > 70 ? data.question.substring(0, 70) + '...' : data.question
      setLabel(truncatedText)
    } else {
      setLabel(
        rowNumber !== undefined
          ? `Criterion ${String(rowNumber + 1).padStart(2, '0')}`
          : 'Criterion',
      )
    }
  }, [data?.question, rowNumber])

  return <div>{label}</div>
}

export default CriteriaRowLabel
