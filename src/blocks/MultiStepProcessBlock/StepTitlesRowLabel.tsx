'use client'
import { useRowLabel } from '@payloadcms/ui'


const StepTitlesRowLabel = () => {
  const { data, rowNumber=1 } = useRowLabel<{ stepTitle?: string }>()

  const customLabel = `${String(rowNumber+1).padStart(2, '0')} ${data?.stepTitle}` || `Step Title ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default StepTitlesRowLabel;