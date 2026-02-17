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
                      titleAlignment={block.titleAlignment}
                      desc={block.desc}
                      grantCards={block as any}
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
            if (block.blockType === 'featCrd') {
              return (
                <React.Fragment key={index}>
                  <FeatureCard
                    title={block.title}
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
                      dataSource={block.dataSource}
                      cards={block.cards}
                      resourcePages={block.resourcePages}
                      buttons={block.buttons}
                    />
                  </div>
                </React.Fragment>
              )
            }
            if (block.blockType === 'mstepProcess') {
              return (
                <React.Fragment key={index}>
                  <div className="page_column_layout gap-6">
                    <MultiStepProcess
                      title={block.title}
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
                      desc={block.desc}
                      cards={block.cards}
                      align={block.align}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                    <TestimonialCardDeck title={block.title}
                      titleAlignment={block.titleAlignment} cards={block.cards} />
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
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
  )
}
