import React from 'react'
import Image from 'next/image'
import { UAFButton } from '@/components/UAFButton'
import { serializeLexical } from '@/components/RichText/serialize'
import { Heading } from '@/components/Heading'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

interface FeatureCardProps {
  title: string | null
  titleAlignment?: 'left' | 'right'
  subtitle: string | null
  desc: any
  tags:
    | {
        id: string
        tag: string | null
      }[]
    | null
  image: AssetCloud | null
  link: {
    type: string
    newTab?: boolean | null
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    url?: string | null
    label: string | null
    email?: string | null
    reference?: {
      relationTo?: string
      value: {
        slug?: string
      }
    }
  }
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  titleAlignment = 'left',
  subtitle,
  desc,
  tags,
  image,
  link,
}) => {
  return (
    <>
      <div className="hidden md:block">
        {/* Desktop & Tablet View */}
        <div className="page_column_layout gap-6 gap-y-0">
          {title && (
            <div
              className={
                titleAlignment === 'left'
                  ? 'md:col-span-4 lg:col-span-6'
                  : 'md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-7'
              }
            >
              <Heading level={3}>{title}</Heading>
            </div>
          )}
        </div>
        <div className="page_column_layout gap-6 gap-y-0">
          {image && image.url && (
            <div className="md:col-span-4 col-start-1 lg:col-span-5">
              <Image
                src={image.url}
                alt={image.alt || 'Feature Card Image'}
                width={image.width || 300}
                height={image.height || 200}
                className="object-contain w-full h-auto rounded-3xl overflow-hidden"
              />
            </div>
          )}
          <div className="md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-7 flex flex-col justify-between">
            <div>
              {subtitle && <Heading level={5}>{subtitle}</Heading>}
              {tags && (
                <div className="flex flex-wrap gap-1 items-center">
                  {tags.map((tag, index) => (
                    <React.Fragment key={tag.id || index}>
                      <span className="tag">{tag.tag}</span>
                      {index < tags.length - 1 && <span className="mx-0.5">•</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            <div>
              {desc && typeof desc == 'object' ? (
                <Heading level={6} className="mb-8">
                  {serializeLexical({ nodes: desc.root?.children || [] })}
                </Heading>
              ) : (
                <Heading level={6}>{desc}</Heading>
              )}
              {link && <UAFButton button={link} />}
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        {/* Mobile View */}
        <div className="flex flex-col gap-2">
          {title && <Heading level={4}>{title}</Heading>}
          {image && image.url && (
            <Image
              src={image.url}
              alt={image.alt || 'Feature Card Image'}
              width={image.width || 300}
              height={image.height || 200}
              className="object-contain w-full h-auto rounded-3xl overflow-hidden"
            />
          )}
          {subtitle && (
            <Heading level={5} className="mt-4 mb-0">
              {subtitle}
            </Heading>
          )}
          {tags && (
            <div className="flex flex-wrap gap-1 items-center mt-0">
              {tags.map((tag, index) => (
                <React.Fragment key={tag.id || index}>
                  <span className="tag">{tag.tag}</span>
                  {index < tags.length - 1 && <span className="mx-0.5">•</span>}
                </React.Fragment>
              ))}
            </div>
          )}
          {desc && typeof desc == 'object' ? (
            <div className="my-4">{serializeLexical({ nodes: desc.root?.children || [] })}</div>
          ) : (
            <p className="my-4">{desc}</p>
          )}
          {link && <UAFButton button={link} />}
        </div>
      </div>
    </>
  )
}
