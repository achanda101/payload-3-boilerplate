import React from 'react'
import Image from 'next/image'
import { type DefaultServerCellComponentProps } from 'payload'

const AssetCloudCell = async ({ cellData, payload }: DefaultServerCellComponentProps) => {
  let media
  try {
    media = await payload.findByID({
      collection: 'assetCloud',
      id: cellData,
    })
  } catch (error) {
    return <span>No Media</span>
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '50px',
        height: '50px',
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
export default AssetCloudCell
