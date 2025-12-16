import React from 'react'
import Image from 'next/image'
import { type DefaultServerCellComponentProps } from 'payload'

const AvatarCell = async ({ cellData, payload }: DefaultServerCellComponentProps) => {
  // thanks to Jarrod for the following simplification, payload
  // is already available in the props so no need to load config
  // and get payload again

  // If no avatar is set, return a placeholder or empty div
  if (!cellData) {
    return (
      <div
        style={{
          position: 'relative',
          width: '35px',
          height: '35px',
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#999',
        }}
      >
        —
      </div>
    )
  }

  try {
    const media = await payload.findByID({
      collection: 'mediaCloud',
      id: cellData,
    })

    if (!media || !media.url) {
      return null
    }

    return (
      <div
        style={{
          position: 'relative',
          width: '35px',
          height: '35px',
        }}
      >
        <Image
          src={media.url}
          alt={media.alt || 'User avatar'}
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    )
  } catch (error) {
    console.error('Error loading avatar:', error)
    return null
  }
}
export default AvatarCell
