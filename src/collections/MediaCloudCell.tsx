import React from 'react'
import Image from 'next/image'
import { type DefaultServerCellComponentProps } from 'payload'

const MediaCloudCell = async ({ cellData, payload }: DefaultServerCellComponentProps) => {
  let media
  try {
    media = await payload.findByID({
      collection: 'mediaCloud',
      id: cellData,
    })
  } catch (error) {
    return <span>No Media</span>
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '40px',
        height: '40px',
      }}
    >
      <Image
        src={media.url!}
        alt={media.alt}
        fill
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
export default MediaCloudCell
