import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload }) => {
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

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
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
  ]

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
        case 'faq':
          return block.items
            ?.map((item: any) => `${item.question || ''} ${item.answer || ''}`)
            .join(' ') || ''

        // Feature cards
        case 'featureCard':
        case 'featureCardAccordion':
          return `${block.title || ''} ${block.description || ''}`

        // Call to action blocks
        case 'callToAction':
          return `${block.title || ''} ${block.content || ''}`

        case 'secondarycta':
          return `${block.ctaTitle || ''} ${block.ctaSubtitle || ''} ${block.contact?.label || ''}`

        // Grant card grid
        case 'grantCardGrid':
          return block.cards
            ?.map((card: any) => `${card.title || ''} ${card.description || ''}`)
            .join(' ') || ''

        // Form block
        case 'form':
          return block.title || ''

        // Testimonials
        case 'testimonialCardDeck':
          return block.testimonials
            ?.map((testimonial: any) => `${testimonial.quote || ''} ${testimonial.author || ''}`)
            .join(' ') || ''

        // Pillar and resource cards
        case 'pillarCard':
        case 'resourceFeatureCard':
          return `${block.title || ''} ${block.description || ''}`

        // Resource gallery
        case 'resourceGallery':
          return block.resources
            ?.map((resource: any) => `${resource.title || ''} ${resource.description || ''}`)
            .join(' ') || ''

        // Multi-step process
        case 'multiStepProcess':
          return block.steps
            ?.map((step: any) => `${step.title || ''} ${step.description || ''}`)
            .join(' ') || ''

        // Card decks
        case 'yellowCardDeck':
          return block.cards
            ?.map((card: any) => `${card.title || ''} ${card.description || ''}`)
            .join(' ') || ''

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
        case 'pinkPuffy':
          const pinkParts = [block.title || '', block.subtitle || '']
          if (block.topRow) {
            pinkParts.push(
              block.topRow
                .map((item: any) => `${item.title || ''} ${item.subtitle || ''} ${item.description || ''}`)
                .join(' ')
            )
          }
          if (block.botRow) {
            pinkParts.push(
              block.botRow
                .map((item: any) => `${item.title || ''} ${item.description || ''}`)
                .join(' ')
            )
          }
          return pinkParts.join(' ')

        // Block quote
        case 'blckquote':
          return `${block.quote_text || ''} ${block.attrib_name || ''} ${block.attrib_dsg || ''}`

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
        case 'listCrdDck':
          const listParts = [block.title || '']
          if (block.cards) {
            listParts.push(
              block.cards
                .map((card: any) => `${card.title || ''} ${card.desc || ''}`)
                .join(' ')
            )
          }
          return listParts.join(' ')

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
        case 'threeColumnTableBlock':
          return [
            block.title || '',
            block.subtitle || '',
            extractRichText(block.firstColumn),
            extractRichText(block.secondColumn),
            extractRichText(block.thirdColumn),
          ].join(' ')

        // Badge block
        case 'badgeBlock':
          return block.badgeText || ''

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
  if (fields.attrib_dsg) parts.push(fields.attrib_dsg)
  if (fields.badgeText) parts.push(fields.badgeText)
  if (fields.title) parts.push(fields.title)
  if (fields.description) parts.push(fields.description)

  // Handle items array (FancyListBlock, etc.)
  if (fields.items && Array.isArray(fields.items)) {
    fields.items.forEach((item: any) => {
      if (item.title) parts.push(item.title)
      if (item.description) parts.push(item.description)
    })
  }

  return parts.filter(Boolean).join(' ')
}
