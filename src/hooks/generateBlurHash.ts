import type { CollectionBeforeValidateHook } from 'payload'
import { getPlaiceholder } from 'plaiceholder'

/**
 * Shared hook to automatically generate blurhash placeholder for uploaded images
 * Can be used with any upload collection (MediaCloud, AssetCloud, etc.)
 * Runs on media create/update operations
 */
export const generateBlurHash: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  // Only process on create or update operations
  if (operation === 'create' || operation === 'update') {
    const buffer = req?.file?.data

    if (buffer) {
      try {
        // Generate 32px base64 placeholder
        const { base64 } = await getPlaiceholder(buffer, { size: 32 })

        return {
          ...data,
          blurhash: base64,
        }
      } catch (error) {
        console.error('Failed to generate blurhash:', error)
        // Return data without blurhash on failure
        return data
      }
    }
  }

  return data
}
