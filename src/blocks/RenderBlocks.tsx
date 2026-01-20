import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { YouTubeBlock } from '@/blocks/YouTubeBlock/config'
import { VimeoBlock } from '@/blocks/VimeoBlock/config'
import { Code } from '@/blocks/Code/config'
import { SpotifyTrackBlock } from '@/blocks/SpotifyTrackBlock/config'
import { SoundCloudEmbedBlock } from '@/blocks/SoundCloudEmbedBlock/config'
import { FancyList } from '@/components/FancyList'
import { Badge } from '@/components/Badge'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  youtubeBlock: YouTubeBlock,
  vimeoBlock: VimeoBlock,
  codeBlock: Code,
  spotifyTrack: SpotifyTrackBlock,
  soundcloudEmbed: SoundCloudEmbedBlock,
  fancyListBlock: FancyList,
  badgeBlock: Badge,
}

// Generic block type that can be used until Page collection is added
type Block = {
  blockType: keyof typeof blockComponents
  id?: string
  [key: string]: any
}

export const RenderBlocks: React.FC<{
  blocks: Block[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
