'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
import { ResourceFeatureCard } from '@/components/ResourceFeatureCard'
import { PillarCard } from '@/components/PillarCard'
import { ResourceGallery } from '@/components/ResourceGallery'
import { TestimonialCardDeck } from '@/components/TestimonialCardDeck'
import { MinimalCardGallery } from '@/components/MinimalCardGallery'
import { IDCardGallery } from '@/components/IDCardGallery'
import { TwoColumnBlock } from '@/components/TwoColumnBlock'
import { ThreeColumnTable } from '@/components/ThreeColumnTable'
import { serializeLexical } from '@/components/RichText/serializeRichText'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

interface UAFPageProps {
  collection: string
  docId: number
  isDraft?: boolean
  locale?: string
  initialData?: any  // Server-provided page data
}

export const UAFPage: React.FC<UAFPageProps> = ({ collection, docId, isDraft = false, locale = 'en', initialData }) => {
  const { selectedLanguage } = useLanguage()
  const { setHeaderTheme } = useHeaderTheme()
  const [heroHeaderImg, setHeroHeaderImg] = useState('wavy_top-trans')
  // const [ pageType, setPageType ] = useState<'landing' | 'individual'>('landing')
  const [heroBlock, setHeroBlock] = useState<{
    title?: string | null
    subtitle?: string | null
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
      }
    }[]
    heroContact?: {
      label?: string | null
      email?: string | null
    }
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
        const headerColour = data.heroColour
        // setPageType(data.pageType || 'landing')
        setHeroHeaderImg(`${data.bgType}-${headerColour}`)
        if (data.bgType === 'center_blob') setHeaderTheme('trans')
        else setHeaderTheme(headerColour)
        setHeroBlock({
          title: data.heroTitle,
          subtitle: data.heroSubtitle,
          heroImage: data.mascot,
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
          heroContact: data.heroContact,
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

  // Initialize with server-provided data
  useEffect(() => {
    if (initialData) {
      const headerColour = initialData.heroColour
      setHeroHeaderImg(`${initialData.bgType}-${headerColour}`)
      if (initialData.bgType === 'center_blob') setHeaderTheme('trans')
      else setHeaderTheme(headerColour)
      setHeroBlock({
        title: initialData.heroTitle,
        subtitle: initialData.heroSubtitle,
        heroImage: initialData.mascot,
        heroButtons: initialData.heroButtons?.map((button: { id: string; link: any }) => ({
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
        heroContact: initialData.heroContact,
      })
      if (initialData?.contentBlocks?.length > 0) {
        setContentBlocks(initialData.contentBlocks)
      }
    }
  }, [initialData, setHeaderTheme])

  // Only fetch when language changes from the initial server-provided locale
  useEffect(() => {
    if (selectedLanguage !== locale) {
      handleLanguageChange(selectedLanguage)
    }
  }, [selectedLanguage, locale, handleLanguageChange])

  return (
    <>
      <section className="hero-banner">
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
                sizes="(max-width: 640px) 80vw, 33vw"
                style={{ width: '100%', height: 'auto', maxWidth: 'clamp(80vw, 100%, 33vw)' }}
                className="hero-mascot"
                priority
              />
            ) : null}
            <h2 style={{ whiteSpace: 'pre-line', textTransform: 'capitalize' }}>
              {heroBlock?.title}
            </h2>
            <p style={{ whiteSpace: 'pre-line' }}>{heroBlock?.subtitle}</p>
          </div>
          <div className="hero-content full-width">
            <ButtonArray btnArray={heroBlock?.heroButtons || []} colStackOnMobile={true} />

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
                      titleAlignment={block.titleAlignment}
                        desc={block.desc}
                        grantCards={(block as any) || []}
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
              if (block.blockType === 'mstepProcess') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'comparisonBlk') {
                return (
                  <div key={index} id={block.id}>
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
                      titleAlignment={block.titleAlignment}
                        desc={block.desc}
                        cards={block.cards}
                        align={block.align}
                      />
                    </div>
                  </div>
                )
              }
              if (block.blockType === 'featCrd') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'listCrdDck') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'faqBlk') {
                return (
                  <div key={index} id={block.id}>
                    <div className="page_column_layout gap-6">
                      <FaqBlock
                        title={block.title}
                      titleAlignment={block.titleAlignment}
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
                      titleAlignment={block.titleAlignment}
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
                  </div>
                )
              }
              if (block.blockType === 'beigePuffy') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'fundingMap') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'resourceFeatCard') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'resourceGallery') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'pillarCard') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              if (block.blockType === 'testimonialDeck') {
                return (
                  <div key={index} id={block.id}>
                    <div className="page_column_layout gap-6">
                      <TestimonialCardDeck title={block.title}
                      titleAlignment={block.titleAlignment} cards={block.cards} />
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
                  </div>
                )
              }
              if (block.blockType === 'threeColumnTableBlock') {
                return (
                  <div key={index} id={block.id}>
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
                  </div>
                )
              }
              return null
            })}
        </div>
      </div>
    </>
  )
}
