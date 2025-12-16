'use client'
import { useRowLabel } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

const OptionsRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    optionText?: string
    isEligible?: boolean
  }>()
  const [label, setLabel] = useState<string>('')

  useEffect(() => {
    if (data?.optionText && typeof data.optionText === 'string' && data.optionText.trim()) {
      const truncatedText =
        data.optionText.length > 50 ? data.optionText.substring(0, 50) + '...' : data.optionText
      setLabel(truncatedText)
    } else {
      setLabel(
        rowNumber !== undefined ? `Option ${String(rowNumber + 1).padStart(2, '0')}` : 'Option',
      )
    }
  }, [data?.optionText, rowNumber])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>{label}</span>
      {data?.isEligible && <Check size={16} color="#22c55e" />}
    </div>
  )
}

export default OptionsRowLabel
