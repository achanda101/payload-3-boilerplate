import React from 'react'

interface TagItem {
  id: string
  tag: string
}

interface TagsProps {
  id?: string
  tags?: TagItem[]
  blockType?: 'tagsBlock'
}

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  const tagTexts = tags.map((item) => item.tag).join(' • ')

  return (
    <div className="text-left">
      <p className="tag">{tagTexts}</p>
    </div>
  )
}

export default Tags
