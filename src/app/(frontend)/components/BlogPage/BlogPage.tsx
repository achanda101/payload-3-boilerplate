'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { OptimizedImage } from '@/components/OptimizedImage'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { ButtonArray } from '@/components/ButtonArray'
import { GrantCardGrid } from '@/components/GrantCardGrid'
import { MultiStepProcess } from '@/components/MultiStepProcess'
import { MultiColumnInfo } from '@/components/MultiColumnInfoBlock'
import { SingleColumnInfo } from '@/components/SingleColumnInfoBlock'
import { ComparisonBlock } from '@/components/ComparisonBlock'
import { ColumnIndicators } from '../ColumnIndicators'
import { YellowCardDeck } from '@/components/YellowCardDeck'
import { FeatureCard } from '@/components/FeatureCard'
import { ListingCardDeck } from '@/components/ListingCardDeck'
import { FaqBlock } from '@/components/FaqBlock'
import { FeatureCardAccordion } from '@/components/FeatureCardAccordion'
import { SecondaryCTA } from '@/components/SecondaryCTA'
import { PinkPuffyCallOut } from '@/components/PinkPuffyCallOut'
import { BeigePuffyCallOut } from '@/components/BeigePuffyCallOut'
import { FundingMap } from '@/components/FundingMap'
import { ResourceFeatureCard } from '@/components/ResourceFeatureCard'
import { ResourceGallery } from '@/components/ResourceGallery'
import { PillarCard } from '@/components/PillarCard'
import { serializeLexical } from '@/components/RichText/serializeRichText'
import { ResourceCard } from '@/components/ResourceCard'
import { TestimonialCardDeck } from '@/components/TestimonialCardDeck'
import { MinimalCardGallery } from '@/components/MinimalCardGallery'
import { IDCardGallery } from '@/components/IDCardGallery'
import { TwoColumnBlock } from '@/components/TwoColumnBlock'
import { ThreeColumnTable } from '@/components/ThreeColumnTable'

interface MediaCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
  blurhash?: string | null
  updatedAt?: string
  createdAt?: string
}

interface BlogPageProps {
  collection: string
  docId: number
  isDraft?: boolean
}

interface DocType {
  id: string
  type: string
}

async function getAllResourceTypesFromCollection(
  collection: string,
  locale: string,
  isDraft: boolean = false,
): Promise<{ types: DocType[]; blogposts: any[] }> {
  try {
    const draftParam = isDraft ? '&draft=true' : ''

    const response = await fetch(
      `/api/${collection}?limit=1000&locale=${locale}&depth=2&where[pageType][equals]=individual&sort=-publishedAt${draftParam}`,
    )
    const data = await response.json()

    if (!data.docs || !Array.isArray(data.docs)) {
      return { types: [], blogposts: [] }
    }

    // Create a Map to store unique docTypes by id
    const uniqueDocTypes = new Map<string, DocType>()

    data.docs.forEach((doc: any) => {
      if (doc.docType && Array.isArray(doc.docType)) {
        doc.docType.forEach((type: any) => {
          if (typeof type === 'object' && type.id && type.type) {
            uniqueDocTypes.set(type.id, {
              id: type.id,
              type: type.type,
            })
          }
        })
      }
    })

    // Convert Map values to array and sort by type name
    const types = Array.from(uniqueDocTypes.values()).sort((a, b) => a.type.localeCompare(b.type))

    return { types, blogposts: data.docs }
  } catch (error) {
    console.error('Failed to fetch resource types:', error)
    return { types: [], blogposts: [] }
  }
}

export const BlogPage: React.FC<BlogPageProps> = ({ collection, docId, isDraft = false }) => {
  const { selectedLanguage } = useLanguage()
  const { setHeaderTheme } = useHeaderTheme()
  const heroHeaderImg = 'wavy_top-trans'
  const [pageType, setPageType] = useState<'landing' | 'individual'>('landing')
  const [resourceTypes, setResourceTypes] = useState<DocType[]>([])
  const [allBlogposts, setAllBlogposts] = useState<any[]>([])
  const [selectedResourceType, setSelectedResourceType] = useState<string>('')
  const [displayCount, setDisplayCount] = useState(6)

  const [heroBlock, setHeroBlock] = useState<{
    title?: string | null
    subtitle?: string | null
    coverImage?: MediaCloud | null
    coverImageCaption?: string | null
    resourceType?: string[] | null
    showFilter?: boolean | null
    heroButtons?: {
      id: string
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
    }[]
    publishDate?: string | null
  }>({})
  const [contentBlocks, setContentBlocks] = useState<
    Array<{
      blockType: string
      [key: string]: any
    }>
  >([])

  // Calculate if cover image should be full width based on aspect ratio
  // Returns Tailwind classes for responsive width
  const getCoverImageWidth = (): string => {
    if (
      heroBlock?.coverImage &&
      typeof heroBlock.coverImage === 'object' &&
      heroBlock.coverImage.width &&
      heroBlock.coverImage.height
    ) {
      const aspectRatio = heroBlock.coverImage.width / heroBlock.coverImage.height

      if (aspectRatio >= 1.25) {
        // Landscape: full width on all screens
        return 'w-full'
      } else if (aspectRatio > 1.0) {
        // Medium/Square-ish: full width on mobile, 60% on desktop
        return 'w-full md:w-4/5 lg:w-[60%]'
      } else {
        // Portrait: full width on mobile, 75% on tablet, 40% on desktop
        return 'w-full md:w-3/4 lg:w-[40%]'
      }
    }
    return 'w-full' // default
  }

  const handleLanguageChange = useCallback(
    async (newLanguage: string) => {
      const draftParam = isDraft ? '&draft=true' : ''
      const fetchPath = `/api/${collection}/${docId}?locale=${newLanguage}&depth=3${draftParam}&trash=false`

      try {
        const response = await fetch(fetchPath)
        const data = await response.json()
        const headerColour = 'trans'
        setPageType(data.pageType || 'landing')
        setHeaderTheme(headerColour)
        setHeroBlock({
          title: data.heroTitle,
          subtitle: data.heroSubtitle,
          coverImage: data.image,
          coverImageCaption: data.image?.caption || data.imageCaption,
          resourceType: data.docType,
          showFilter: data.showFilter,
          heroButtons: data.heroButtons?.map((button: { id: string; link: any }) => ({
            id: button.id,
            type: button.link.type,
            link: button.link,
            pillSolid: button.link.pillSolid,
            url: button.link.url,
            label: button.link.label,
            newTab: button.link.newTab,
            email: button.link.email,
            reference: button.link.reference,
          })),
          publishDate: data.publishedAt,
        })
        if (data?.contentBlocks?.length > 0) {
          setContentBlocks(data.contentBlocks)
        }
      } catch (error) {
        console.error('Failed to fetch Hero and Content Blocks data on BlogPage:', error)
      }
    },
    [collection, docId, isDraft, setHeaderTheme],
  )

  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [selectedLanguage, handleLanguageChange])

  useEffect(() => {
    const fetchResourceTypes = async () => {
      // Only fetch blogposts if showFilter is enabled
      if (heroBlock?.showFilter) {
        const { types, blogposts } = await getAllResourceTypesFromCollection(
          collection,
          selectedLanguage,
          isDraft,
        )
        setResourceTypes(types)
        setAllBlogposts(blogposts)
      }
    }
    fetchResourceTypes()
  }, [collection, selectedLanguage, heroBlock?.showFilter, isDraft])

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(6)
  }, [selectedResourceType])

  // Filter blogposts based on selected resource type
  const filteredBlogposts = (
    selectedResourceType
      ? allBlogposts.filter((blogpost) => {
          if (blogpost.docType && Array.isArray(blogpost.docType)) {
            return blogpost.docType.some((type: any) => {
              // Handle both object format (with depth) and string format (IDs only)
              if (typeof type === 'object' && type.id) {
                // Convert both to strings for comparison to handle type mismatch
                return String(type.id) === String(selectedResourceType)
              } else if (typeof type === 'string') {
                return type === selectedResourceType
              }
              return false
            })
          }
          return false
        })
      : allBlogposts
  ).sort((a, b) => {
    // Sort by publishedAt in reverse chronological order (newest first)
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })

  return (
    <>
      <section className="hero-banner fit-cover-image" style={{ height: 'auto' }}>
        <Image
          src={`/heroes/${heroHeaderImg}.png`}
          alt="Header image"
          width={1440}
          height={100}
          sizes="(min-width: 769px) 100vw, 0vw"
          style={{ width: '100%', height: 'auto' }}
          className="desktop-image"
          priority
        />
        <Image
          src={`/heroes/${heroHeaderImg}-mobile.png`}
          alt="Header image"
          width={800}
          height={100}
          sizes="(max-width: 768px) 100vw, 0vw"
          style={{ width: '100%', height: 'auto' }}
          className="mobile-image"
          priority
        />
        <div
          className="hero-container"
          style={{ position: 'relative', left: 'auto', transform: 'none' }}
        >
          <div className="hero-content">
            {(heroBlock?.resourceType || heroBlock?.publishDate) && pageType !== 'landing' && (
              <div className="tag">
                {heroBlock?.resourceType?.map((type: any, index, array) => (
                  <React.Fragment key={index}>
                    {typeof type === 'object' ? type.type : type}
                    {(index < array.length - 1 || heroBlock?.publishDate) && ' • '}
                  </React.Fragment>
                ))}
                {heroBlock?.publishDate &&
                  new Date(heroBlock.publishDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
              </div>
            )}
            <h4 style={{ whiteSpace: 'pre-line', textTransform: 'capitalize' }}>
              {heroBlock?.title}
            </h4>
            <p style={{ whiteSpace: 'pre-line' }}>{heroBlock?.subtitle}</p>
          </div>
          {heroBlock?.heroButtons && heroBlock.heroButtons.length > 0 && (
            <div className="hero-content full-width">
              <ButtonArray
                btnArray={heroBlock?.heroButtons || []}
                colStackOnMobile={pageType === 'landing' ? true : false}
              />
            </div>
          )}

          {heroBlock?.showFilter && (
            <div className="hero-content !gap-[0.25rem] !mt-[2rem] pill-outline">
              <p className="small">Blogpost Type</p>
              <div className="relative inline-block">
                <select
                  className="appearance-none pr-10 bg-transparent border border-black rounded-full py-3 px-5 text-base font-medium focus:outline-none"
                  value={selectedResourceType}
                  onChange={(e) => setSelectedResourceType(e.target.value)}
                >
                  <option value="">Show All</option>
                  {resourceTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {heroBlock?.coverImage &&
          typeof heroBlock.coverImage === 'object' &&
          heroBlock.coverImage.url ? (
            <div className="w-full px-[1.25rem] lg:px-[5rem]">
              <div className={`hero-content hero-cover-image h-auto ${getCoverImageWidth()}`}>
                <OptimizedImage
                  media={heroBlock.coverImage as any}
                  sizes="(max-width: 640px) 80vw, 33vw"
                  className="rounded-3xl overflow-hidden"
                  priority
                />
                {heroBlock.coverImageCaption && (
                  <p className="text-color-light text-sm mt-0 text-center w-2/3 mx-auto">
                    {heroBlock.coverImageCaption}
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Blogposts Grid Section - Only show on landing page */}
      {pageType === 'landing' && filteredBlogposts.length > 0 && (
        <div className="w-full px-[1.25rem] lg:px-[5rem] py-12">
          <div
            className="grid gap-x-6 gap-y-[4rem]"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            }}
          >
            {filteredBlogposts.slice(0, displayCount).map((blogpost: any) => {
              // Construct the link object for the ResourceCard
              const blogpostLink = {
                type: 'reference',
                label: 'Read More',
                arrowLink: true,
                reference: {
                  relationTo: 'blog',
                  value: {
                    slug: blogpost.slug,
                  },
                },
              }

              // Map docType to tags format
              const tags =
                blogpost.docType && Array.isArray(blogpost.docType)
                  ? blogpost.docType.map((type: any) => ({
                      id: type.id || '',
                      tag: type.type || '',
                    }))
                  : []

              // Add publication date as the last tag
              if (blogpost.publishedAt) {
                const formattedDate = new Date(blogpost.publishedAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
                tags.push({
                  id: 'publishedAt',
                  tag: formattedDate,
                })
              }

              return (
                <ResourceCard
                  key={blogpost.id}
                  id={blogpost.id}
                  title={blogpost.title}
                  desc={blogpost.heroSubtitle || null}
                  image={blogpost.image}
                  tags={tags}
                  link={blogpostLink}
                />
              )
            })}
          </div>
          {displayCount < filteredBlogposts.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setDisplayCount((prev) => prev + 6)}
                className="px-6 py-3 rounded-full border-[1px] border-black bg-transparent text-black font-medium hover:bg-black hover:text-white transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      <div className="w-full px-[1.25rem] lg:px-[5rem]">
        <div className="frame_layout">
          {contentBlocks &&
            contentBlocks.length > 0 &&
            contentBlocks.map((block, index) => {
              if (block.blockType === 'secondarycta') {
                return (
                  <React.Fragment key={index}>
                    <SecondaryCTA
                      title={(block as any).ctaTitle || ''}
                      subtitle={(block as any).ctaSubtitle || ''}
                      uiType={(block as any).uiType}
                      ctaButton={(block as any).ctaButton || []}
                    />
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'grantCardGridBlock') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <GrantCardGrid
                        title={block.title}
                        desc={block.desc}
                        grantCards={(block as any) || []}
                      />
                    </div>
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'mstepProcess') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <MultiStepProcess
                        title={block.title}
                        subtitle={block.subtitle}
                        steps={block.steps}
                      />
                    </div>
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'mcolInfoBlock') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <MultiColumnInfo infoColumns={block.multicols} />
                    </div>

                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'scolInfoBlk') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <SingleColumnInfo
                        title={block.title}
                        desc={block.desc}
                        buttons={block.colBtns}
                      />
                    </div>

                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'comparisonBlk') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout  gap-0 md:gap-0 lg:gap-6">
                      <ComparisonBlock
                        title={block.title}
                        desc={block.desc}
                        buttons={block.buttons}
                        lftCol={block.lftGrp}
                        rtCol={block.rtGrp}
                      />
                    </div>

                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'ylwDeck') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <YellowCardDeck
                        blockName={block.blockName}
                        title={block.title}
                        desc={block.desc}
                        cards={block.cards}
                        align={block.align}
                      />
                    </div>
                  </React.Fragment>
                )
              }
              if (block.blockType === 'featCrd') {
                return (
                  <React.Fragment key={index}>
                    <FeatureCard
                      title={block.title}
                      subtitle={block.subtitle}
                      desc={block.desc}
                      tags={block.tags}
                      image={block.image}
                      link={block.link}
                    />

                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'listCrdDck') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <ListingCardDeck
                        title={block.title}
                        dataSource={block.dataSource}
                        cards={block.cards}
                        resourcePages={block.resourcePages}
                        buttons={block.buttons}
                      />
                    </div>
                  </React.Fragment>
                )
              }
              if (block.blockType === 'faqBlk') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <FaqBlock
                        title={block.title}
                        desc={block.desc}
                        link={block.link}
                        faqs={block.faqs}
                      />
                    </div>
                  </React.Fragment>
                )
              }
              if (block.blockType === 'featCrdAcc') {
                return (
                  <React.Fragment key={index}>
                    <FeatureCardAccordion
                      title={block.title}
                      blockName={block.blockName}
                      featureCards={block.featCrds}
                    />
                  </React.Fragment>
                )
              }
              if (block.blockType === 'richContentBlock') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6 [&>*:first-child]:mt-0">
                      {block.richText && typeof block.richText == 'object' ? (
                        serializeLexical({ nodes: block.richText.root?.children || [] })
                      ) : (
                        <p className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 md:block lg:hidden mb-8">
                          {block.richText}
                        </p>
                      )}
                    </div>
                  </React.Fragment>
                )
              }
              if (block.blockType === 'pinkPuffy') {
                return (
                  <React.Fragment key={index}>
                    <PinkPuffyCallOut
                      title={block.title}
                      subtitle={block.subtitle}
                      align={block.align}
                      topRow={block.topRow}
                      botRow={block.botRow}
                      links={block.links}
                    />
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'beigePuffy') {
                return (
                  <React.Fragment key={index}>
                    <BeigePuffyCallOut
                      title={block.title}
                      subtitle={block.subtitle}
                      align={block.align}
                      items={block.items}
                    />
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'fundingMap') {
                return (
                  <React.Fragment key={index}>
                    <FundingMap
                      title={block.title}
                      subtitle={block.subtitle}
                      selectorLabel={block.selectorLabel}
                      items={block.items}
                    />
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'resourceFeatCard') {
                return (
                  <React.Fragment key={index}>
                    <ResourceFeatureCard
                      title={block.title}
                      align={block.align}
                      desc={block.desc}
                      featCardList={block.featCardList}
                    />
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'resourceGallery') {
                return (
                  <React.Fragment key={index}>
                    <ResourceGallery
                      title={block.title}
                      align={block.align}
                      desc={block.desc}
                      galleryList={block.galleryList}
                    />
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'pillarCard') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <PillarCard
                        title={block.title}
                        subtitle={block.subtitle}
                        align={block.align}
                        cards={block.cards}
                      />
                    </div>
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'testimonialDeck') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <TestimonialCardDeck title={block.title} cards={block.cards} />
                    </div>
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'minCardGallery') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <MinimalCardGallery header={block.header} cards={block.cards} />
                    </div>
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'idCardGallery') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <IDCardGallery header={block.header} cards={block.cards} />
                    </div>
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'twoColumnBlock') {
                return (
                  <React.Fragment key={index}>
                    <TwoColumnBlock
                      title={block.title}
                      subtitle={block.subtitle}
                      leftColumn={block.leftColumn}
                      rightColumn={block.rightColumn}
                    />
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              if (block.blockType === 'threeColumnTableBlock') {
                return (
                  <React.Fragment key={index}>
                    <div className="page_column_layout gap-6">
                      <ThreeColumnTable
                        title={block.title}
                        subtitle={block.subtitle}
                        firstColumn={block.firstColumn}
                        secondColumn={block.secondColumn}
                        thirdColumn={block.thirdColumn}
                        columnWidths={block.columnWidths}
                      />
                    </div>
                    {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                      <div className="page_column_layout gap-6">
                        <ColumnIndicators />
                      </div>
                    )}
                  </React.Fragment>
                )
              }
              return null
            })}
        </div>
      </div>
    </>
  )
}
