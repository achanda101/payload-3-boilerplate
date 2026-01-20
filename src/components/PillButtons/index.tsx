import React from 'react'
import { ButtonArray } from '@/components/ButtonArray'

interface ButtonItem {
  id: string
  link: {
    type: string
    newTab?: boolean | null
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    url?: string | null
    label: string | null
    email?: string | null
    doc?: any
    reference?: any
    etestlink?: any
  }
}

interface PillButtonsProps {
  id?: string
  buttons?: ButtonItem[]
  blockType?: 'pillButtonsBlock'
}

export const PillButtons: React.FC<PillButtonsProps> = ({ buttons }) => {
  if (!buttons || buttons.length === 0) return null

  return (
    <div className="flex justify-start mt-3">
      <ButtonArray btnArray={buttons} colStackOnMobile={true} />
    </div>
  )
}

export default PillButtons
