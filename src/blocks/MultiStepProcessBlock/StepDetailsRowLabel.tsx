'use client'
import { useRowLabel } from '@payloadcms/ui'


const StepDetailsRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ bullet?: string }>()

  const customLabel = `${data?.bullet}` || `Step Detail ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default StepDetailsRowLabel;