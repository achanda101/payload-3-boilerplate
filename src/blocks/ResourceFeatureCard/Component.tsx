import React from 'react'
import type { Page } from '@/payload-types'

import { ResourceFeatureCard as ResourceFeatureCardComponent } from '@/components/ResourceFeatureCard'

type ResourceFeatureCardBlockProps = Extract<
  NonNullable<Page['contentBlocks']>[number],
  { blockType: 'resourceFeatCard' }
>

export const ResourceFeatureCardBlock: React.FC<ResourceFeatureCardBlockProps> = ({
  featCardList,
}) => {
  return <ResourceFeatureCardComponent featCardList={featCardList} />
}
