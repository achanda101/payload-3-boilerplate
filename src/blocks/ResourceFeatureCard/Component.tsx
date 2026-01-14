import React from 'react'
import type { Page } from '@/payload-types'

import { ResourceFeatureCard as ResourceFeatureCardComponent } from '@/components/ResourceFeatureCard'

type ResourceFeatureCardBlockProps = Extract<
  NonNullable<Page['contentBlocks']>[number],
  { blockType: 'resourceFeatCard' }
>

export const ResourceFeatureCardBlock: React.FC<ResourceFeatureCardBlockProps> = ({
  title,
  align,
  desc,
  featCardList,
}) => {
  return (
    <ResourceFeatureCardComponent
      title={title}
      align={align}
      desc={desc}
      featCardList={featCardList}
    />
  )
}
