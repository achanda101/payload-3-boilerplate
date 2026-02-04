'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { ButtonArray } from '@/components/ButtonArray'
import { GrantCardGrid } from '@/components/GrantCardGrid'
import { checkGrantPeriodStatus } from '@/utilities/checkGrantPeriod'
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
import { TestimonialCardDeck } from '@/components/TestimonialCardDeck'
import { MinimalCardGallery } from '@/components/MinimalCardGallery'
import { IDCardGallery } from '@/components/IDCardGallery'
import { TwoColumnBlock } from '@/components/TwoColumnBlock'
import { ThreeColumnTable } from '@/components/ThreeColumnTable'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

interface ETestLink {
  type: string
  url?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo?: string
    value: {
      slug?: string
    }
  }
  downloadLink?: boolean | null
  arrowLink?: boolean | null
  pillSolid?: boolean | null
  pillOutline?: boolean | null
  label: string | null
  etestlink?: {
    relationTo?: string
    value: {
      introCard?: object | null
      critList?: object | null
      isECard?: object | null
      notECard?: object | null
    }
  }
}

interface GrantPageProps {
  collection: string
  docId: number
  isDraft?: boolean
}

export const GrantPage: React.FC<GrantPageProps> = ({ collection, docId, isDraft = false }) => {
  const { selectedLanguage } = useLanguage()
  const { setHeaderTheme } = useHeaderTheme()
  const [heroHeaderImg, setHeroHeaderImg] = useState('wavy_top-trans')
  const [pageType, setPageType] = useState<'landing' | 'individual'>('landing')
  const [heroBlock, setHeroBlock] = useState<{
    title?: string | null
    subtitle?: string | null
    badgeText?: string | null
    badgeType?: string | null
    heroImage?: AssetCloud | null
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
        etestlink?: {
          relationTo?: string
          value: {
            introCard?: {
              introTitle?: string | null
              introDesc?: Record<string, any> | null
            }
            critList?: {
              criteria?:
                | {
                    question?: string | null
                    reason?: string | null
                    options?:
                      | {
                          optionText?: string | null
                          isEligible?: boolean | null
                          isCustom?: boolean | null
                          customResponse?: Record<string, any> | null
                        }[]
                      | null
                  }[]
                | null
            } | null
            isECard?: {
              isETitle?: string | null
              isEDesc?: Record<string, any> | null
              isELink?: ETestLink | null
              isEMascot?: AssetCloud | null
            } | null
            notECard?: {
              notETitle?: string | null
              notEDesc?: Record<string, any> | null
              notELink?: ETestLink | null
              notEMascot?: AssetCloud | null
            } | null
          }
        }
      }
    }[]
    heroContact?: {
      label?: string | null
      email?: string | null
    }
    activePeriod?: 'open_all_year' | 'specific_period' | 'closed' | null
    startDate?: string | null
    endDate?: string | null
    msg?: string | null
  }>({})
  const [contentBlocks, setContentBlocks] = useState<
    Array<{
      blockType: string
      [key: string]: any
    }>
  >([])

  const handleLanguageChange = useCallback(
    async (newLanguage: string) => {
      const draftParam = isDraft ? '&draft=true' : ''
      const fetchPath = `/api/${collection}/${docId}?locale=${newLanguage}&depth=3${draftParam}&trash=false`

      try {
        const response = await fetch(fetchPath)
        const data = await response.json()
        const headerColour = getHeaderColour(data.pageType, data.grantCard)
        setPageType(data.pageType || 'landing')
        setHeroHeaderImg(`${data.bgType}-${headerColour}`)
        if (data.bgType === 'center_blob') setHeaderTheme('trans')
        else setHeaderTheme(headerColour)
        setHeroBlock({
          title: data.heroTitle,
          subtitle: data.heroSubtitle,
          badgeText: data.grantCard?.badgeText,
          badgeType: data.grantCard?.badgeType,
          heroImage: data.grantCard?.mascot,
          heroButtons: data.heroButtons?.map(
            (button: { id: string; link: any }, index: number) => ({
              id: button.id,
              type: button.link.type,
              link: button.link,
              pillSolid: button.link.pillSolid,
              url: button.link.url,
              label: button.link.label,
              newTab: button.link.newTab,
              email: button.link.email,
              reference: button.link.reference,
              etest: button.link.etestlink,
            }),
          ),
          heroContact: data.heroContact,
          activePeriod: data.grantCard?.activePeriod || null,
          startDate: data.grantCard?.startDate || null,
          endDate: data.grantCard?.endDate || null,
          msg: data.grantCard?.msg || null,
        })
        if (data?.contentBlocks?.length > 0) {
          setContentBlocks(data.contentBlocks)
        }
      } catch (error) {
        console.error('Failed to fetch Hero and Content Blocks data on Page:', error)
      }
    },
    [collection, docId, isDraft, setHeaderTheme],
  )

  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [selectedLanguage, handleLanguageChange])

  // Calculate period status for hero buttons
  const { shouldDisableApply, message } = checkGrantPeriodStatus(
    heroBlock.activePeriod ?? undefined,
    heroBlock.startDate ?? undefined,
    heroBlock.endDate ?? undefined,
    heroBlock.msg ?? undefined,
  )

  return (
    <>
      <section className={`hero-banner${pageType === 'landing' ? ' short' : ''}`}>
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
            {heroBlock?.heroImage &&
            typeof heroBlock.heroImage === 'object' &&
            heroBlock.heroImage.url ? (
              <Image
                src={heroBlock.heroImage.url}
                alt={heroBlock.heroImage.alt || 'Hero Mascot Image'}
                width={heroBlock.heroImage.width || 800}
                height={heroBlock.heroImage.height || 600}
                style={{ width: '100%', height: 'auto' }}
                className="hero-mascot"
                priority
              />
            ) : null}
            {heroBlock?.badgeText ? (
              <div className={`badge ${heroBlock?.badgeType}`}>
                <p className="tag">{heroBlock?.badgeText}</p>
              </div>
            ) : null}
            <h2 style={{ whiteSpace: 'pre-line', textTransform: 'capitalize' }}>
              {heroBlock?.title}
            </h2>
            <p style={{ whiteSpace: 'pre-line' }}>{heroBlock?.subtitle}</p>
          </div>
          <div className="hero-content full-width">
            <ButtonArray
              btnArray={heroBlock?.heroButtons || []}
              colStackOnMobile={pageType === 'landing' ? true : false}
              disableApplyButtons={shouldDisableApply}
              disabledMessage={message}
            />

            <div className="hero-contact">
              {heroBlock?.heroContact?.label && heroBlock?.heroContact?.email && (
                <div className="hero-contact">
                  <span>{heroBlock.heroContact.label}</span>
                  <a href={`mailto:${heroBlock.heroContact.email}`} className="underline">
                    {heroBlock.heroContact.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
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

const getHeaderColour = (pageType: 'landing' | 'individual', grantCard: {}) => {
  if (
    pageType === 'individual' &&
    grantCard &&
    typeof grantCard === 'object' &&
    'cardColour' in grantCard
  ) {
    return `${(grantCard as { cardColour?: string | null }).cardColour}`.trim() || 'trans'
  }
  return 'trans'
}
