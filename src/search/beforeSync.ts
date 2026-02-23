import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const { slug, title, meta } = originalDoc

  // Get the collection name from searchDoc.doc.relationTo
  const collection = searchDoc?.doc?.relationTo as string | undefined

  // Extract common fields across all collections
  const commonFields = extractCommonFields(originalDoc)

  // Extract collection-specific content
  let contentData = ''
  if (collection === 'pages') {
    contentData = extractPageContent(originalDoc)
  } else if (collection === 'blog') {
    contentData = extractBlogContent(originalDoc)
  } else if (collection === 'grants') {
    contentData = extractGrantContent(originalDoc)
  } else if (collection === 'reports') {
    contentData = extractReportContent(originalDoc)
  } else if (collection === 'mmedia') {
    contentData = extractMMediaContent(originalDoc)
  }

  // Handle polymorphic meta image (can be from mediaCloud or assetCloud)
  // Pages and Grants use assetCloud, others use mediaCloud
  let metaImage: { relationTo: string; value: number } | null = null
  if (meta?.image) {
    if (typeof meta.image === 'object' && meta.image.id) {
      // Image is populated - determine which collection it's from
      // Check if it has a collection property or infer from the original doc structure
      const imageCollection = meta.image.collection ||
                             (collection === 'grants' || collection === 'pages' ? 'assetCloud' : 'mediaCloud')
      metaImage = {
        relationTo: imageCollection,
        value: meta.image.id
      }
    } else if (typeof meta.image === 'number') {
      // Image is just an ID - infer collection based on document type
      const imageCollection = collection === 'grants' || collection === 'pages' ? 'assetCloud' : 'mediaCloud'
      metaImage = {
        relationTo: imageCollection,
        value: meta.image
      }
    } else if (typeof meta.image === 'object' && 'relationTo' in meta.image && 'value' in meta.image) {
      // Already in correct format
      metaImage = meta.image as { relationTo: string; value: number }
    }
  }

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: metaImage,
      description: meta?.description,
    },
    contentData,
    author: commonFields.author,
    tags: commonFields.tags,
    publishedDate: commonFields.publishedDate,
    categories: commonFields.categories,
  }

  return modifiedDoc
}

// Extract common fields present across multiple collections
function extractCommonFields(doc: any) {
  return {
    author: doc.author?.title || doc.author?.name || '',
    tags: doc.tags?.map((tag: any) => tag.name || tag.title || '').join(' ') || '',
    publishedDate: doc.publishedAt || doc.createdAt || '',
    categories: doc.categories?.map((cat: any) => ({
      relationTo: cat.relationTo,
      id: cat.value?.id || cat.id,
      title: cat.value?.title || cat.title,
    })) || [],
  }
}

// Extract content from Pages with blocks
function extractPageContent(doc: any): string {
  const parts = [
    doc.title || '',
    doc.heroTitle || '',
    doc.heroSubtitle || '',
    doc.label || '',
    doc.email || '',
  ]

  if (doc.heroButtons) {
    doc.heroButtons.forEach((btn: any) => {
      if (btn.link?.label) parts.push(btn.link.label)
      if (btn.link?.email) parts.push(btn.link.email)
    })
  }

  // Pages use 'contentBlocks' field for blocks
  if (doc.contentBlocks) {
    parts.push(extractBlockContent(doc.contentBlocks))
  }

  return parts.filter(Boolean).join(' ')
}

// Extract content from Blog posts
function extractBlogContent(doc: any): string {
  const parts = [
    doc.title || '',
    doc.heroTitle || '',
    doc.heroSubtitle || '',
    doc.excerpt || '',
    doc.content ? extractRichText(doc.content) : '',
  ]

  // Blog uses 'contentBlocks' field for blocks
  if (doc.contentBlocks) {
    parts.push(extractBlockContent(doc.contentBlocks))
  }

  return parts.filter(Boolean).join(' ')
}

// Extract content from Grants
function extractGrantContent(doc: any): string {
  const parts = [
    doc.title || '',
    doc.heroTitle || '',
    doc.heroSubtitle || '',
    doc.eligibilityInfo || '',
    doc.description ? extractRichText(doc.description) : '',
    doc.location || '',
  ]

  // Grants use 'contentBlocks' field for blocks
  if (doc.contentBlocks) {
    parts.push(extractBlockContent(doc.contentBlocks))
  }

  return parts.filter(Boolean).join(' ')
}

// Extract content from Reports
function extractReportContent(doc: any): string {
  const parts = [
    doc.title || '',
    doc.heroTitle || '',
    doc.heroSubtitle || '',
    doc.summary ? extractRichText(doc.summary) : '',
  ]

  // Reports use 'contentBlocks' field for blocks
  if (doc.contentBlocks) {
    parts.push(extractBlockContent(doc.contentBlocks))
  }

  return parts.filter(Boolean).join(' ')
}

// Extract content from MMedia (Multimedia)
function extractMMediaContent(doc: any): string {
  const parts = [
    doc.title || '',
    doc.heroTitle || '',
    doc.heroSubtitle || '',
    doc.caption || '',
    doc.description ? extractRichText(doc.description) : '',
  ]

  // MMedia uses 'contentBlocks' field for blocks
  if (doc.contentBlocks) {
    parts.push(extractBlockContent(doc.contentBlocks))
  }

  return parts.filter(Boolean).join(' ')
}

// Extract searchable text from blocks
function extractBlockContent(blocks: any[]): string {
  return blocks
    .map((block) => {
      if (!block) return ''

      switch (block.blockType) {
        // Rich text blocks
        case 'richContent':
        case 'richContentBlock':
          return extractRichText(block.richText)

        // Hero and header blocks
        case 'hero':
          return `${block.title || ''} ${block.subtitle || ''}`

        // FAQ block
        case 'faqBlk': {
          const faqParts = [block.title || '', block.desc || '']
          if (block.link?.label) faqParts.push(block.link.label)
          if (block.link?.email) faqParts.push(block.link.email)
          if (block.faqs) {
            block.faqs.forEach((item: any) => {
              if (item.question) faqParts.push(item.question)
              if (item.answer) faqParts.push(extractRichText(item.answer))
            })
          }
          return faqParts.filter(Boolean).join(' ')
        }

        // Feature card
        case 'featCrd': {
          const featCrdParts = [block.title || '', block.subtitle || '', extractRichText(block.desc)]
          if (block.tags) {
            block.tags.forEach((t: any) => {
              if (t.tag) featCrdParts.push(t.tag)
            })
          }
          if (block.link?.label) featCrdParts.push(block.link.label)
          if (block.link?.email) featCrdParts.push(block.link.email)
          return featCrdParts.filter(Boolean).join(' ')
        }

        // Feature card accordion
        case 'featCrdAcc': {
          const featCrdAccParts = [block.title || '']
          if (block.featCrds) {
            block.featCrds.forEach((item: any) => {
              if (item.accTitle) featCrdAccParts.push(item.accTitle)
              if (item.accContent) featCrdAccParts.push(extractRichText(item.accContent))
              if (item.crdTag) featCrdAccParts.push(item.crdTag)
              if (item.crdContent) featCrdAccParts.push(extractRichText(item.crdContent))
            })
          }
          return featCrdAccParts.filter(Boolean).join(' ')
        }

        // Call to action blocks
        case 'callToAction':
          return `${block.title || ''} ${block.content || ''}`

        case 'secondarycta':
          return `${block.ctaTitle || ''} ${block.ctaSubtitle || ''} ${block.contact?.label || ''}`

        // Grant card grid
        case 'grantCardGridBlock':
          return `${block.title || ''} ${block.desc || ''}`

        // Form block
        case 'form':
          return block.title || ''

        // Testimonials
        case 'testimonialDeck': {
          const testimonialParts = [block.title || '']
          if (block.cards) {
            block.cards.forEach((card: any) => {
              if (card.quote_text) testimonialParts.push(card.quote_text)
              if (card.attrib_name) testimonialParts.push(card.attrib_name)
              if (card.attrib_dsg) testimonialParts.push(extractRichText(card.attrib_dsg))
            })
          }
          return testimonialParts.filter(Boolean).join(' ')
        }

        // Pillar card
        case 'pillarCard': {
          const pillarParts = [block.title || '', extractRichText(block.subtitle)]
          if (block.cards) {
            block.cards.forEach((card: any) => {
              if (card.title) pillarParts.push(card.title)
            })
          }
          return pillarParts.filter(Boolean).join(' ')
        }

        // Resource feature card (to be implemented)
        case 'resourceFeatureCard':
          return `${block.title || ''} ${block.description || ''}`

        // Resource gallery
        case 'resourceGallery':
          return block.resources
            ?.map((resource: any) => `${resource.title || ''} ${resource.description || ''}`)
            .join(' ') || ''

        // Multi-step process
        case 'mstepProcess': {
          const mstepParts = [block.title || '', block.subtitle || '']
          if (block.steps) {
            block.steps.forEach((step: any) => {
              if (step.stepTitle) mstepParts.push(step.stepTitle)
              if (step.title) mstepParts.push(step.title)
              if (step.details) {
                step.details.forEach((detail: any) => {
                  mstepParts.push(extractRichText(detail.bullet))
                })
              }
              if (step.tip) mstepParts.push(extractRichText(step.tip))
            })
          }
          return mstepParts.filter(Boolean).join(' ')
        }

        // Card decks
        case 'ylwDeck': {
          const ylwParts = [block.title || '', extractRichText(block.desc)]
          if (block.cards) {
            block.cards.forEach((card: any) => {
              if (card.title) ylwParts.push(card.title)
              if (card.subtitle) ylwParts.push(card.subtitle)
              if (card.desc) ylwParts.push(card.desc)
              if (card.links) {
                card.links.forEach((l: any) => {
                  if (l.desc) ylwParts.push(l.desc)
                  if (l.link?.label) ylwParts.push(l.link.label)
                })
              }
            })
          }
          return ylwParts.filter(Boolean).join(' ')
        }

        // Beige puffy callout
        case 'beigePuffy':
          const beigeParts = [block.title || '', block.subtitle || '']
          if (block.items) {
            beigeParts.push(
              block.items
                .map((item: any) => `${item.title || ''} ${item.subtitle || ''} ${item.description || ''}`)
                .join(' ')
            )
          }
          return beigeParts.join(' ')

        // Pink puffy callout
        case 'pinkPuffy': {
          const pinkParts = [block.title || '', block.subtitle || '']
          if (block.topRow) {
            block.topRow.forEach((item: any) => {
              if (item.title) pinkParts.push(item.title)
              if (item.subtitle) pinkParts.push(item.subtitle)
              if (item.description) pinkParts.push(item.description)
            })
          }
          if (block.botRow) {
            block.botRow.forEach((item: any) => {
              if (item.title) pinkParts.push(item.title)
              if (item.description) pinkParts.push(item.description)
            })
          }
          if (block.links) {
            block.links.forEach((l: any) => {
              if (l.link?.label) pinkParts.push(l.link.label)
              if (l.link?.email) pinkParts.push(l.link.email)
            })
          }
          return pinkParts.filter(Boolean).join(' ')
        }

        // Funding map
        case 'fundingMap': {
          const fundingParts = [block.title || '', block.subtitle || '', block.selectorLabel || '']
          if (block.items) {
            block.items.forEach((item: any) => {
              if (item.subitems) {
                item.subitems.forEach((sub: any) => {
                  if (sub.statnumber) fundingParts.push(sub.statnumber)
                  if (sub.description) fundingParts.push(sub.description)
                })
              }
            })
          }
          return fundingParts.filter(Boolean).join(' ')
        }

        // Block quote
        case 'blckquote':
          return `${block.quote_text || ''} ${block.attrib_name || ''} ${extractRichText(block.attrib_dsg)}`

        // Comparison block
        case 'comparisonBlk':
          const compParts = [block.title || '', block.desc || '']
          if (block.lftGrp) {
            compParts.push(block.lftGrp.title || '', block.lftGrp.desc || '')
            if (block.lftGrp.lftPoints) {
              compParts.push(block.lftGrp.lftPoints.map((p: any) => p.point || '').join(' '))
            }
          }
          if (block.rtGrp) {
            compParts.push(block.rtGrp.title || '', block.rtGrp.desc || '')
            if (block.rtGrp.rtPoints) {
              compParts.push(block.rtGrp.rtPoints.map((p: any) => p.point || '').join(' '))
            }
          }
          return compParts.join(' ')

        // Content block with columns
        case 'content':
          return block.columns
            ?.map((col: any) => extractRichText(col.richText))
            .join(' ') || ''

        // Fancy list block
        case 'fancyListBlock':
          return block.items
            ?.map((item: any) => `${item.title || ''} ${item.description || ''}`)
            .join(' ') || ''

        // Pill buttons block
        case 'pillButtonsBlock': {
          const pillParts: string[] = []
          if (block.buttons) {
            block.buttons.forEach((btn: any) => {
              if (btn.link?.label) pillParts.push(btn.link.label)
              if (btn.link?.email) pillParts.push(btn.link.email)
            })
          }
          return pillParts.join(' ')
        }

        // ID card gallery
        case 'idCardGallery':
          const idParts = [
            block.header?.title || '',
            block.header?.subtitle || '',
            block.header?.description || '',
          ]
          if (block.cards) {
            idParts.push(
              block.cards
                .map((card: any) => `${card.fullname || ''} ${card.designation || ''} ${card.pronouns || ''}`)
                .join(' ')
            )
          }
          return idParts.join(' ')

        // Listing card deck
        case 'listCrdDck': {
          const listParts = [block.title || '']
          if (block.cards) {
            block.cards.forEach((card: any) => {
              if (card.title) listParts.push(card.title)
              if (card.desc) listParts.push(card.desc)
              if (card.tags) {
                card.tags.forEach((t: any) => {
                  if (t.tag) listParts.push(t.tag)
                })
              }
              if (card.link?.label) listParts.push(card.link.label)
              if (card.link?.email) listParts.push(card.link.email)
            })
          }
          if (block.buttons) {
            block.buttons.forEach((btn: any) => {
              if (btn.link?.label) listParts.push(btn.link.label)
              if (btn.link?.email) listParts.push(btn.link.email)
            })
          }
          return listParts.filter(Boolean).join(' ')
        }

        // Minimal card gallery
        case 'minCardGallery':
          const minParts = [block.header?.title || '', block.header?.subtitle || '']
          if (block.cards) {
            minParts.push(
              block.cards
                .map((card: any) => `${card.title || ''} ${card.description || ''}`)
                .join(' ')
            )
          }
          return minParts.join(' ')

        // Multi-column info block
        case 'mcolInfoBlock':
          return block.multicols
            ?.map((col: any) => `${col.title || ''} ${col.colContent || ''}`)
            .join(' ') || ''

        // Single column info block
        case 'scolInfoBlk':
          return `${block.title || ''} ${block.desc || ''}`

        // Two column block
        case 'twoColumnBlock':
          return [
            block.title || '',
            block.subtitle || '',
            extractRichText(block.leftColumn),
            extractRichText(block.rightColumn),
          ].join(' ')

        // Three column table block
        case 'threeColumnTableBlock': {
          const threeColParts = [block.title || '', block.subtitle || '']
          if (block.rows) {
            block.rows.forEach((row: any) => {
              threeColParts.push(extractRichText(row.firstColumn))
              threeColParts.push(extractRichText(row.secondColumn))
              threeColParts.push(extractRichText(row.thirdColumn))
            })
          }
          return threeColParts.filter(Boolean).join(' ')
        }

        // Badge block
        case 'badgeBlock':
          return block.badgeText || ''

        // Media embed blocks
        case 'youtubeBlock':
        case 'vimeoBlock':
          return `${block.title || ''} ${block.desc || ''}`

        case 'spotifyTrack':
          return block.caption || ''

        case 'soundcloud-embed':
          return `${block.trackTitle || ''} ${block.caption || ''}`

        default:
          return ''
      }
    })
    .filter(Boolean)
    .join(' ')
}

// Extract text from Lexical rich text editor
function extractRichText(richText: any): string {
  if (!richText) return ''
  if (typeof richText === 'string') return richText

  // Handle various Lexical JSON structures
  // Structure 1: { root: { children: [...] } }
  if (richText.root?.children) {
    return extractFromLexicalNodes(richText.root.children)
  }

  // Structure 2: { children: [...] } (direct children)
  if (richText.children && Array.isArray(richText.children)) {
    return extractFromLexicalNodes(richText.children)
  }

  // Structure 3: Array of nodes directly
  if (Array.isArray(richText)) {
    return extractFromLexicalNodes(richText)
  }

  // Structure 4: Object with text property
  if (richText.text) {
    return richText.text
  }

  return ''
}

// Recursively extract text from Lexical nodes
function extractFromLexicalNodes(nodes: any[]): string {
  if (!nodes || !Array.isArray(nodes)) return ''

  return nodes
    .map((node) => {
      if (!node) return ''

      // Direct text content
      if (node.text) return node.text

      // Handle block nodes embedded in Lexical (BlocksFeature)
      if (node.type === 'block' && node.fields) {
        return extractBlockFields(node.fields)
      }

      // Handle list items
      if (node.type === 'listitem' && node.children) {
        return extractFromLexicalNodes(node.children)
      }

      // Handle other nodes with children
      if (node.children) {
        return extractFromLexicalNodes(node.children)
      }

      return ''
    })
    .filter(Boolean)
    .join(' ')
}

// Extract text from block fields embedded in Lexical
function extractBlockFields(fields: any): string {
  if (!fields) return ''

  const parts: string[] = []

  // Common text fields
  if (fields.quote_text) parts.push(fields.quote_text)
  if (fields.attrib_name) parts.push(fields.attrib_name)
  if (fields.attrib_dsg) parts.push(extractRichText(fields.attrib_dsg))
  if (fields.badgeText) parts.push(fields.badgeText)
  if (fields.title) parts.push(fields.title)
  if (fields.description) parts.push(fields.description)
  if (fields.desc) parts.push(fields.desc)
  // Media embed blocks (YouTube, Vimeo, Spotify, SoundCloud)
  if (fields.caption) parts.push(fields.caption)
  if (fields.trackTitle) parts.push(fields.trackTitle)

  // Handle items array (FancyListBlock, etc.)
  if (fields.items && Array.isArray(fields.items)) {
    fields.items.forEach((item: any) => {
      if (item.title) parts.push(item.title)
      if (item.description) parts.push(item.description)
    })
  }

  return parts.filter(Boolean).join(' ')
}
