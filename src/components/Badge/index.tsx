import React from 'react'

interface BadgeProps {
  id?: string
  badgeText: string
  badgeType?: 'info' | 'imp' | 'inactive'
  blockType?: 'badgeBlock'
}

export const Badge: React.FC<BadgeProps> = ({ badgeText, badgeType = 'info' }) => {
  if (!badgeText) return null

  return (
    <div className="flex justify-center md:justify-start mt-3">
      <div className={`badge ${badgeType}`}>
        <p className="tag m-0">{badgeText}</p>
      </div>
    </div>
  )
}

export default Badge
