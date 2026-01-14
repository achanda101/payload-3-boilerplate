import React from 'react'
import type { Blog, Report, Mmedia } from '@/payload-types'
import { ResourceGallery as ResourceGalleryComponent } from '@/components/ResourceGallery'

type ResourceGalleryBlockProps = {
  title?: string | null
  align?: 'left' | 'center' | null
  desc?: any
  galleryList?:
    | (
        | {
            relationTo: 'blog'
            value: number | Blog
          }
        | {
            relationTo: 'reports'
            value: number | Report
          }
        | {
            relationTo: 'mmedia'
            value: number | Mmedia
          }
      )[]
    | null
}

export const ResourceGalleryBlock: React.FC<ResourceGalleryBlockProps> = ({
  title,
  align,
  desc,
  galleryList,
}) => {
  return (
    <ResourceGalleryComponent title={title} align={align} desc={desc} galleryList={galleryList} />
  )
}
