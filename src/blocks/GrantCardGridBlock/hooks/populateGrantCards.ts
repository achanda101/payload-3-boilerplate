import type { FieldHook } from 'payload'

export const populateGrantCards: FieldHook = async ({ req, value }) => {
  const { payload } = req

  // If the field already has values, preserve them (user has manually modified the list)
  if (value && Array.isArray(value) && value.length > 0) {
    return value
  }

  try {
    // Only populate when empty - fetch all active grant cards (excludes closed grants)
    const grantCards = await payload.find({
      collection: 'grantcards',
      where: {
        _status: { equals: 'published' },
        activePeriod: {
          not_equals: 'closed'
        }
      },
      limit: 1000, // Set a reasonable limit
      sort: 'title', // Sort by title
    })

    // Return array of grant card IDs
    return grantCards.docs.map(doc => doc.id)
  } catch (error) {
    payload.logger.error('Error populating grant cards:', error)
    return value || [] // Return existing value or empty array on error
  }
}
