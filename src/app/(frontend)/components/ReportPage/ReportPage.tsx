'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
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
import { serializeLexical } from '@/components/RichText/serializeRichText'
import { ResourceCard } from '@/components/ResourceCard'

interface MediaCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

interface ReportPageProps {
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
): Promise<{ types: DocType[]; reports: any[] }> {
  try {
    const draftParam = isDraft ? '&draft=true' : ''

    const response = await fetch(
      `/api/${collection}?limit=1000&locale=${locale}&depth=2&where[pageType][equals]=individual${draftParam}`,
    )
    const data = await response.json()

    if (!data.docs || !Array.isArray(data.docs)) {
      return { types: [], reports: [] }
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

    return { types, reports: data.docs }
  } catch (error) {
    console.error('Failed to fetch resource types:', error)
    return { types: [], reports: [] }
  }
}

export const ReportPage: React.FC<ReportPageProps> = ({ collection, docId, isDraft = false }) => {
  const { selectedLanguage } = useLanguage()
  const { setHeaderTheme } = useHeaderTheme()
  const heroHeaderImg = 'wavy_top-trans'
  const [pageType, setPageType] = useState<'landing' | 'individual'>('landing')
  const [resourceTypes, setResourceTypes] = useState<DocType[]>([])
  const [allReports, setAllReports] = useState<any[]>([])
  const [selectedResourceType, setSelectedResourceType] = useState<string>('')

  const [heroBlock, setHeroBlock] = useState<{
    title?: string | null
    subtitle?: string | null
    coverImage?: MediaCloud | null
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
  const getCoverImageWidth = (): string => {
    if (
      heroBlock?.coverImage &&
      typeof heroBlock.coverImage === 'object' &&
      heroBlock.coverImage.width &&
      heroBlock.coverImage.height
    ) {
      const aspectRatio = heroBlock.coverImage.width / heroBlock.coverImage.height
      return aspectRatio >= 1.25 ? '100%' : '40%'
    }
    return '100%' // default
  }

  // Calculate hero banner height based on cover image presence and dimensions
  const getHeroBannerHeight = (): string => {
    if (
      heroBlock?.coverImage &&
      typeof heroBlock.coverImage === 'object' &&
      heroBlock.coverImage.width &&
      heroBlock.coverImage.height
    ) {
      // Get the width percentage
      const widthPercent = getCoverImageWidth()
      const widthValue = widthPercent === '100%' ? 1 : 0.4

      // Calculate proportional height: (imageHeight / imageWidth) * widthValue * 100vw + offset
      const aspectRatio = heroBlock.coverImage.height / heroBlock.coverImage.width
      const imageHeightVw = aspectRatio * widthValue * 100

      // Add 75vh if heroButtons exist, otherwise add 60vh
      const offset = heroBlock?.heroButtons && heroBlock.heroButtons.length > 0 ? '75vh' : '60vh'

      return `calc(${imageHeightVw}vw + ${offset})`
    }
    return '70vh' // default when no cover image
  }

  const handleLanguageChange = useCallback(
    async (newLanguage: string) => {
      const draftParam = isDraft ? '&draft=true' : ''
      const fetchPath = `/api/${collection}/${docId}?locale=${newLanguage}&depth=2${draftParam}&trash=false`

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
          publishDate: data.pubDate,
        })
        if (data?.contentBlocks?.length > 0) {
          setContentBlocks(data.contentBlocks)
        }
      } catch (error) {
        console.error('Failed to fetch Hero and Content Blocks data on ReportPage:', error)
      }
    },
    [collection, docId, isDraft, setHeaderTheme],
  )

  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [selectedLanguage, handleLanguageChange])

  useEffect(() => {
    const fetchResourceTypes = async () => {
      // Only fetch reports if showFilter is enabled
      if (heroBlock?.showFilter) {
        const { types, reports } = await getAllResourceTypesFromCollection(
          collection,
          selectedLanguage,
          isDraft,
        )
        setResourceTypes(types)
        setAllReports(reports)
      }
    }
    fetchResourceTypes()
  }, [collection, selectedLanguage, heroBlock?.showFilter, isDraft])

  // Filter reports based on selected resource type
  const filteredReports = selectedResourceType
    ? allReports.filter((report) => {
        if (report.docType && Array.isArray(report.docType)) {
          return report.docType.some((type: any) => {
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
    : allReports

  return (
    <>
      <section className="hero-banner fit-cover-image" style={{ height: getHeroBannerHeight() }}>
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
        <div className="hero-container">
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
                  new Date(heroBlock.publishDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
              </div>
            )}

            <h2 style={{ whiteSpace: 'pre-line', textTransform: 'capitalize' }}>
              {heroBlock?.title}
            </h2>
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
              <p className="small">Report Type</p>
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
              <div
                className="hero-content hero-cover-image"
                style={{ width: getCoverImageWidth(), height: 'auto' }}
              >
                <Image
                  src={heroBlock.coverImage.url}
                  alt={heroBlock.coverImage.alt || 'Resource Cover Image'}
                  width={heroBlock.coverImage.width || 800}
                  height={heroBlock.coverImage.height || 600}
                  sizes="(max-width: 640px) 80vw, 33vw"
                  className="rounded-3xl overflow-hidden"
                  priority
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Reports Grid Section - Only show on landing page */}
      {pageType === 'landing' && filteredReports.length > 0 && (
        <div className="w-full px-[1.25rem] lg:px-[5rem] py-12">
          <div
            className="grid gap-x-6 gap-y-[4rem]"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            }}
          >
            {filteredReports.map((report: any) => {
              // Construct the link object for the ResourceCard
              const reportLink = {
                type: 'reference',
                label: 'Read More',
                arrowLink: true,
                reference: {
                  relationTo: 'reports',
                  value: {
                    slug: report.slug,
                  },
                },
              }

              // Map docType to tags format
              const tags =
                report.docType && Array.isArray(report.docType)
                  ? report.docType.map((type: any) => ({
                      id: type.id || '',
                      tag: type.type || '',
                    }))
                  : []

              // Add publication date as the last tag
              if (report.pubDate) {
                const formattedDate = new Date(report.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })
                tags.push({
                  id: 'pubDate',
                  tag: formattedDate,
                })
              }

              return (
                <ResourceCard
                  key={report.id}
                  id={report.id}
                  title={report.title}
                  desc={report.heroSubtitle || null}
                  image={report.image}
                  tags={tags}
                  link={reportLink}
                />
              )
            })}
          </div>
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
                        cards={block.cards}
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
              return null
            })}
        </div>
      </div>
    </>
  )
}
