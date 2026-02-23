'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/providers/LanguageContext'
import { SecondaryCTA } from '@/components/SecondaryCTA'
import { GrantCardGrid } from '@/components/GrantCardGrid'
import { FeatureCard } from '@/components/FeatureCard'
import { ListingCardDeck } from '@/components/ListingCardDeck'
import { MultiStepProcess } from '@/components/MultiStepProcess'
import { MultiColumnInfo } from '@/components/MultiColumnInfoBlock'
import { SingleColumnInfo } from '@/components/SingleColumnInfoBlock'
import { ComparisonBlock } from '@/components/ComparisonBlock'
import { YellowCardDeck } from '@/components/YellowCardDeck'
import { FaqBlock } from '@/components/FaqBlock'
import { FeatureCardAccordion } from '@/components/FeatureCardAccordion'
import { PinkPuffyCallOut } from '@/components/PinkPuffyCallOut'
import { BeigePuffyCallOut } from '@/components/BeigePuffyCallOut'
import { FundingMap } from '@/components/FundingMap'
import { ResourceFeatureCard } from '@/components/ResourceFeatureCard'
import { ResourceGallery } from '@/components/ResourceGallery'
import { PillarCard } from '@/components/PillarCard'
import { TestimonialCardDeck } from '@/components/TestimonialCardDeck'
import { MinimalCardGallery } from '@/components/MinimalCardGallery'
import { IDCardGallery } from '@/components/IDCardGallery'
import { TwoColumnBlock } from '@/components/TwoColumnBlock'
import { ThreeColumnTable } from '@/components/ThreeColumnTable'

import { ColumnIndicators } from '../ColumnIndicators'
import { serializeLexical } from '@/components/RichText/serializeRichText'

interface PageProps {
  data?: any
  isDraft?: boolean
  initialLocale?: string
}

export const PageContent: React.FC<PageProps> = ({ data = {}, isDraft = false, initialLocale = 'en' }) => {
  const { selectedLanguage } = useLanguage()
  const [contentBlocks, setContentBlocks] = useState<any[]>(data?.contentBlocks || [])

  const handleLanguageChange = useCallback(
    async (newLanguage: string) => {
      try {
        const draftParam = isDraft ? '&draft=true' : ''
        const response = await fetch(
          `/api/globals/homepage?locale=${newLanguage}&depth=3${draftParam}`,
        )

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Content Blocks: ${response.status} ${response.statusText}`,
          )
        }

        const responseData = await response.json()

        if (responseData?.contentBlocks?.length > 0) {
          setContentBlocks(responseData.contentBlocks)
        }
      } catch (error) {
        console.error('Failed to fetch Content Blocks data:', error)
      }
    },
    [isDraft],
  )

  // Only re-fetch when language changes from the initial server-provided locale
  useEffect(() => {
    if (selectedLanguage !== initialLocale) {
      handleLanguageChange(selectedLanguage)
    }
  }, [selectedLanguage, initialLocale, handleLanguageChange])

  return (
    <div className="w-full px-[1.25rem] lg:px-[5rem]">
      <div className="frame_layout">
        {contentBlocks &&
          contentBlocks.length > 0 &&
          contentBlocks.map((block, index) => {
            if (block.blockType === 'secondarycta') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'grantCardGridBlock') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <GrantCardGrid
                      title={block.title}

                      desc={block.desc}
                      grantCards={block as any}
                    />
                  </div>
                  {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                    <div className="page_column_layout gap-6">
                      <ColumnIndicators />
                    </div>
                  )}
                </div>
              )
            }
            if (block.blockType === 'featCrd') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'listCrdDck') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <ListingCardDeck
                      title={block.title}

                      dataSource={block.dataSource}
                      cards={block.cards}
                      resourcePages={block.resourcePages}
                      buttons={block.buttons}
                    />
                  </div>
                </div>
              )
            }
            if (block.blockType === 'mstepProcess') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'mcolInfoBlock') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <MultiColumnInfo infoColumns={block.multicols} />
                  </div>

                  {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                    <div className="page_column_layout gap-6">
                      <ColumnIndicators />
                    </div>
                  )}
                </div>
              )
            }
            if (block.blockType === 'scolInfoBlk') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'comparisonBlk') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'ylwDeck') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <YellowCardDeck
                      blockName={block.blockName}
                      title={block.title}

                      desc={block.desc}
                      cards={block.cards}
                      align={block.align}
                    />
                  </div>
                </div>
              )
            }
            if (block.blockType === 'faqBlk') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <FaqBlock
                      title={block.title}

                      desc={block.desc}
                      link={block.link}
                      faqs={block.faqs}
                    />
                  </div>
                </div>
              )
            }
            if (block.blockType === 'featCrdAcc') {
              return (
                <div key={index} id={block.id}>
                  <FeatureCardAccordion
                    title={block.title}

                    blockName={block.blockName}
                    featureCards={block.featCrds}
                  />
                </div>
              )
            }
            if (block.blockType === 'richContentBlock') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6 [&>*:first-child]:mt-0">
                    {block.richText && typeof block.richText == 'object' ? (
                      serializeLexical({ nodes: block.richText.root?.children || [] })
                    ) : (
                      <p className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 md:block lg:hidden mb-8">
                        {block.richText}
                      </p>
                    )}
                  </div>
                </div>
              )
            }
            if (block.blockType === 'pinkPuffy') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'beigePuffy') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'fundingMap') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'resourceFeatCard') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'resourceGallery') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'pillarCard') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'testimonialDeck') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <TestimonialCardDeck title={block.title} cards={block.cards} />
                  </div>
                  {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                    <div className="page_column_layout gap-6">
                      <ColumnIndicators />
                    </div>
                  )}
                </div>
              )
            }
            if (block.blockType === 'minCardGallery') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <MinimalCardGallery header={block.header} cards={block.cards} />
                  </div>
                  {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                    <div className="page_column_layout gap-6">
                      <ColumnIndicators />
                    </div>
                  )}
                </div>
              )
            }
            if (block.blockType === 'idCardGallery') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <IDCardGallery header={block.header} cards={block.cards} />
                  </div>
                  {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                    <div className="page_column_layout gap-6">
                      <ColumnIndicators />
                    </div>
                  )}
                </div>
              )
            }
            if (block.blockType === 'twoColumnBlock') {
              return (
                <div key={index} id={block.id}>
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
                </div>
              )
            }
            if (block.blockType === 'threeColumnTableBlock') {
              return (
                <div key={index} id={block.id}>
                  <div className="page_column_layout gap-6">
                    <ThreeColumnTable
                      title={block.title}
                      subtitle={block.subtitle}
                      rows={block.rows}
                      columnWidths={block.columnWidths}
                    />
                  </div>
                  {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
                    <div className="page_column_layout gap-6">
                      <ColumnIndicators />
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
      </div>
    </div>
  )
}
