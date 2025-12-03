import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { BlockQuoteBlock } from '@/blocks/BlockQuote/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import VideoPlayer from '@/components/VideoPlayer'
import UploadRenderer from '@/components/UploadRenderer'
import SpotifyTrackRenderer from '@/components/SpotifyTrackRenderer'
import SoundCloudRenderer from '@/components/SoundCloudRenderer'
import React, { Fragment, JSX } from 'react'
import { CMSLink } from '@/components/Link'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import Image from 'next/image'

// Local interfaces for block types (since they don't exist in payload-types yet)
interface CTABlockProps {
  id?: string
  richText?: any
  links?: Array<{
    link: {
      type?: 'reference' | 'custom'
      reference?: any
      url?: string
      label: string
      newTab?: boolean
    }
  }>
  blockType?: 'cta'
}

interface MediaBlockProps {
  media: any
  id?: string
  blockType?: 'mediaBlock'
}

interface BannerBlockProps {
  style: 'info' | 'warning' | 'error' | 'success'
  content: any
  id?: string
  blockType?: 'banner'
}

interface BlockQuoteProps {
  id?: string
  quote_text?: string
  attrib_name?: string
  attrib_dsg?: string
  blockType?: 'blckquote'
}

interface YouTubeBlockProps {
  id?: string
  videoURL: string
  blockName?: string
  title?: string
  desc?: string
  blockType?: 'youtubeBlock'
}

interface VimeoBlockProps {
  id?: string
  videoURL: string
  title?: string
  desc?: string
  blockType?: 'vimeoBlock'
}

interface SpotifyTrackProps {
  id?: string
  trackUrl: string
  blockName?: string
  caption?: string
  displayMode?: 'compact' | 'large'
  displayMetadata?: boolean
  blockType?: 'spotifyTrack'
}

interface SoundCloudEmbedProps {
  id?: string
  trackUrl: string
  blockName?: string
  trackTitle?: string
  caption?: string
  blockType?: 'soundcloud-embed'
}

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | BlockQuoteProps
      | YouTubeBlockProps
      | VimeoBlockProps
      | SpotifyTrackProps
      | SoundCloudEmbedProps
    >

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        // Check if next/previous nodes for spacing adjustments
        const prevNode = nodes[index - 1]
        const isPrevBlockquote =
          prevNode?.type === 'block' && prevNode?.fields?.blockType === 'blckquote'
        const isPrevHeading = prevNode?.type === 'heading'
        const isPrevUpload = prevNode?.type === 'upload'
        const isPrevVideo =
          prevNode?.type === 'block' &&
          (prevNode?.fields?.blockType === 'youtubeBlock' ||
            prevNode?.fields?.blockType === 'vimeoBlock')
        const isPrevSpotify =
          prevNode?.type === 'block' && prevNode?.fields?.blockType === 'spotifyTrack'
        const isPrevSoundcloud =
          prevNode?.type === 'block' && prevNode?.fields?.blockType === 'soundcloud-embed'

        if (node.type === 'text') {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        if (node.type === 'block') {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }

          switch (blockType) {
            case 'cta':
              return <CallToActionBlock key={index} {...block} />
            case 'mediaBlock':
              return (
                <MediaBlock
                  className="col-start-1 col-span-3"
                  imgClassName="m-0"
                  key={index}
                  {...block}
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                  disableInnerContainer={true}
                />
              )
            case 'banner':
              return <BannerBlock className="col-start-2 mb-4" key={index} {...block} />
            case 'code':
              return <CodeBlock className="col-start-2" key={index} {...block} />
            case 'youtubeBlock':
              return (
                <VideoPlayer
                  key={index}
                  videoURL={block.videoURL}
                  title={block.title}
                  desc={block.desc}
                  isPrevHeading={isPrevHeading}
                  isPrevUpload={isPrevUpload}
                  isPrevVideo={isPrevVideo}
                  isPrevBlockquote={isPrevBlockquote}
                  isPrevSpotify={isPrevSpotify}
                  isPrevSoundcloud={isPrevSoundcloud}
                />
              )
            case 'vimeoBlock':
              return (
                <VideoPlayer
                  key={index}
                  videoURL={block.videoURL}
                  title={block.title}
                  desc={block.desc}
                  isPrevHeading={isPrevHeading}
                  isPrevUpload={isPrevUpload}
                  isPrevVideo={isPrevVideo}
                  isPrevBlockquote={isPrevBlockquote}
                  isPrevSpotify={isPrevSpotify}
                  isPrevSoundcloud={isPrevSoundcloud}
                />
              )
            case 'blckquote':
              const topMarginBlockquote =
                isPrevHeading || isPrevBlockquote || isPrevUpload || isPrevVideo || isPrevSpotify || isPrevSoundcloud
                  ? 'mt-0'
                  : 'mt-[4rem]'
              return (
                <div
                  className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMarginBlockquote} mb-[4rem] last:mb-0`}
                  key={index}
                >
                  <BlockQuoteBlock {...block} />
                </div>
              )
            case 'spotifyTrack':
              return (
                <SpotifyTrackRenderer
                  key={index}
                  trackUrl={block.trackUrl}
                  blockName={block.blockName}
                  caption={block.caption}
                  displayMode={block.displayMode}
                  displayMetadata={block.displayMetadata}
                  isPrevHeading={isPrevHeading}
                  isPrevUpload={isPrevUpload}
                  isPrevVideo={isPrevVideo}
                  isPrevBlockquote={isPrevBlockquote}
                  isPrevSpotify={isPrevSpotify}
                  isPrevSoundcloud={isPrevSoundcloud}
                />
              )
            case 'soundcloud-embed':
              return (
                <SoundCloudRenderer
                  key={index}
                  trackUrl={block.trackUrl}
                  blockName={block.blockName}
                  trackTitle={block.trackTitle}
                  caption={block.caption}
                  isPrevHeading={isPrevHeading}
                  isPrevUpload={isPrevUpload}
                  isPrevVideo={isPrevVideo}
                  isPrevBlockquote={isPrevBlockquote}
                  isPrevSpotify={isPrevSpotify}
                  isPrevSoundcloud={isPrevSoundcloud}
                />
              )
            default:
              return null
          }
        } else {
          switch (node.type) {
            case 'linebreak': {
              return <br key={index} />
            }
            case 'horizontalrule': {
              return (
                <div
                  className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4"
                  key={index}
                >
                  <Image
                    src="/block_icons/horizontal-rule.png"
                    alt="Horizontal Rule"
                    width={164}
                    height={38}
                    className="my-8 mx-auto"
                  />
                </div>
              )
            }
            case 'paragraph': {
              return (
                <div
                  className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4"
                  key={index}
                >
                  <p className="mb-[1rem] last:mb-0">{serializedChildren}</p>
                </div>
              )
            }
            case 'heading': {
              const Tag = node?.tag
              return (
                <div
                  className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4"
                  key={index}
                >
                  <Tag className="mb-0"> {serializedChildren}</Tag>
                </div>
              )
            }
            case 'list': {
              const Tag = node?.tag
              return (
                <div
                  className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4"
                  key={index}
                >
                  <Tag className="list">{serializedChildren}</Tag>
                </div>
              )
            }
            case 'listitem': {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? 'true' : 'false'}
                    className={` ${node.checked ? '' : ''}`}
                    key={index}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                )
              } else {
                return (
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                )
              }
            }
            case 'link': {
              const fields = node.fields

              return (
                <CMSLink
                  key={index}
                  newTab={Boolean(fields?.newTab)}
                  reference={fields.doc as any}
                  type={fields.linkType === 'internal' ? 'reference' : 'custom'}
                  url={fields.url}
                  className="underline"
                >
                  {serializedChildren}
                </CMSLink>
              )
            }
            case 'upload': {
              const fields = node.value
              // Type guard to ensure fields has the required properties
              if (typeof fields === 'object' && fields !== null && 'url' in fields) {
                const uploadFields = fields as any
                const topMargin =
                  isPrevHeading || isPrevUpload || isPrevVideo || isPrevBlockquote || isPrevSpotify || isPrevSoundcloud
                    ? 'mt-0'
                    : 'mt-[4rem]'

                return (
                  <UploadRenderer key={index} uploadFields={uploadFields} topMargin={topMargin} />
                )
              }
              return null
            }
            default:
              return null
          }
        }
      })}
    </Fragment>
  )
}
