/**
 * Safely constructs URLs from link data, preventing invalid URLs like /undefined/undefined
 */

type LinkReference = {
  relationTo?: string
  value?: {
    slug?: string
  } | string
}

type LinkButton = {
  type: string
  url?: string | null
  email?: string | null
  newTab?: boolean | null
  reference?: LinkReference | null
  doc?: {
    relationTo?: string
    value?: {
      url?: string
    }
  } | null
}

/**
 * Validates and constructs a safe URL from link button data
 * @param button - The button/link configuration object
 * @returns A valid URL string or '#' as a safe fallback
 */
export function getValidUrl(button: LinkButton): string {
  // Handle reference type links
  if (button.type === 'reference' && button.reference) {
    const relationTo = button.reference.relationTo
    const value = button.reference.value

    // Extract slug from value (handle both object and string types)
    const slug = typeof value === 'object' && value !== null ? value.slug : undefined

    // Validate both relationTo and slug exist and are non-empty strings
    if (!relationTo || typeof relationTo !== 'string' || relationTo.trim() === '') {
      console.warn('Invalid reference: missing or invalid relationTo', button.reference)
      return '#'
    }

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.warn('Invalid reference: missing or invalid slug', button.reference)
      return '#'
    }

    // Pages collection should not have a prefix
    if (relationTo === 'pages') {
      return `/${slug}`
    }

    // All other collections have their collection name as prefix
    return `/${relationTo}/${slug}`
  }

  // Handle email links
  if (button.type === 'email') {
    if (!button.email || typeof button.email !== 'string' || button.email.trim() === '') {
      console.warn('Invalid email link: missing email', button)
      return '#'
    }
    return `mailto:${button.email}`
  }

  // Handle document links
  if (button.type === 'document' && button.doc) {
    const docUrl = button.doc.value?.url

    if (!docUrl || typeof docUrl !== 'string' || docUrl.trim() === '') {
      console.warn('Invalid document link: missing URL', button.doc)
      return '#'
    }

    return docUrl
  }

  // Handle custom URL links
  if (button.type === 'custom') {
    if (!button.url || typeof button.url !== 'string' || button.url.trim() === '') {
      console.warn('Invalid custom URL: missing or invalid URL', button)
      return '#'
    }
    return button.url
  }

  // Handle eligibility test (always returns #, handled by modal)
  if (button.type === 'etest') {
    return '#'
  }

  // Fallback for unknown types
  console.warn('Unknown link type or invalid link data', button)
  return '#'
}

/**
 * Validates if a link button has all required data to generate a valid URL
 * Useful for validating data before saving or for conditional rendering
 * @param button - The button/link configuration object
 * @returns true if the button can generate a valid URL, false otherwise
 */
export function isValidLink(button: LinkButton | null | undefined): boolean {
  if (!button || !button.type) {
    return false
  }

  switch (button.type) {
    case 'reference':
      return !!(
        button.reference?.relationTo &&
        button.reference?.value &&
        (typeof button.reference.value === 'object'
          ? button.reference.value.slug
          : button.reference.value)
      )

    case 'email':
      return !!(button.email && button.email.trim() !== '')

    case 'document':
      return !!(button.doc?.value?.url && button.doc.value.url.trim() !== '')

    case 'custom':
      return !!(button.url && button.url.trim() !== '')

    case 'etest':
      return !!(button as any).etestlink // Eligibility tests need etestlink data

    default:
      return false
  }
}
