import React from 'react'
import type { Page } from '@/payload-types'

import { FundingMap } from '@/components/FundingMap'

type FundingMapBlockProps = Extract<
  NonNullable<Page['contentBlocks']>[number],
  { blockType: 'fundingMap' }
>

export const FundingMapBlock: React.FC<FundingMapBlockProps> = ({
  title,
  subtitle,
  selectorLabel,
  items,
}) => {
  return (
    <FundingMap title={title} subtitle={subtitle} selectorLabel={selectorLabel} items={items} />
  )
}
