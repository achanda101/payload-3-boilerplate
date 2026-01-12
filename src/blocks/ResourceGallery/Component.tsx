import React from 'react'
import type { Blog, Report, Mmedia } from '@/payload-types'
import { ResourceGallery as ResourceGalleryComponent } from '@/components/ResourceGallery'

type ResourceGalleryBlockProps = {
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

export const ResourceGalleryBlock: React.FC<ResourceGalleryBlockProps> = ({ galleryList }) => {
  return <ResourceGalleryComponent galleryList={galleryList} />
}
