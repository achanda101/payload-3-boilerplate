'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/providers/LanguageContext'
import { SecondaryCTA } from './components/SecondaryCTA'
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
import { ColumnIndicators } from '../ColumnIndicators'
import { serializeLexical } from '@/components/RichText/serializeRichText'

interface PageProps {
  data?: {
    contentBlocks: any[]
  }
}

export const PageContent: React.FC<PageProps> = ({ data = { contentBlocks: [] } }) => {
  const { selectedLanguage } = useLanguage()
  const [contentBlocks, setContentBlocks] = useState<any[]>(data.contentBlocks || [])

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      const response = await fetch(`/api/globals/homepage?locale=${newLanguage}&depth=2`)

      if (!response.ok) {
        throw new Error(`Failed to fetch Content Blocks: ${response.status} ${response.statusText}`)
      }

      const responseData = await response.json()

      if (responseData?.contentBlocks?.length > 0) {
        setContentBlocks(responseData.contentBlocks)
      }
    } catch (error) {
      console.error('Failed to fetch Content Blocks data:', error)
    }
  }

  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [selectedLanguage])

  return (
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
                  ctaButton={(block as any).ctaButton || []}
                />
                {process.env.NODE_ENV === 'development' && (
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
                  <GrantCardGrid title={block.title} desc={block.desc} grantCards={block as any} />
                </div>
                {process.env.NODE_ENV === 'development' && (
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
                  subtitle={block.subtitle}
                  desc={block.desc}
                  tags={block.tags}
                  image={block.image}
                  link={block.link}
                />

                {process.env.NODE_ENV === 'development' && (
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
                {process.env.NODE_ENV === 'development' && (
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

                {process.env.NODE_ENV === 'development' && (
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
                  <SingleColumnInfo title={block.title} desc={block.desc} buttons={block.colBtns} />
                </div>

                {process.env.NODE_ENV === 'development' && (
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

                {process.env.NODE_ENV === 'development' && (
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

          return null
        })}
    </div>
  )
}
