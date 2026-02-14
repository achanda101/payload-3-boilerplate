import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { VALID_LOCALES } from '@/utilities/localeUtils'

interface RevalidateCollectionOptions {
  collectionSlug: string
  basePath: string
  tagName: string
}

export function createRevalidateHook(
  options: RevalidateCollectionOptions,
): CollectionAfterChangeHook {
  return async ({ doc, req, previousDoc }) => {
    const path = options.basePath ? `${options.basePath}/${doc.slug}` : `/${doc.slug}`

    req.payload.logger.info(`Revalidating ${options.collectionSlug} at path: ${path}`)

    try {
      // Determine which locales were actually changed
      const changedLocales = new Set<string>()

      // If this is a new document, revalidate all locales
      if (!previousDoc) {
        VALID_LOCALES.forEach((locale) => changedLocales.add(locale))
      } else {
        // For now, revalidate all locales on any change
        // TODO: Implement smart locale detection based on actual content changes
        VALID_LOCALES.forEach((locale) => changedLocales.add(locale))
      }

      req.payload.logger.info(`Changed locales: ${Array.from(changedLocales).join(', ')}`)

      // Revalidate only changed locales (all locales get /{locale}/ prefix)
      for (const locale of changedLocales) {
        revalidatePath(`/${locale}${path}`)
        req.payload.logger.info(`Revalidated: /${locale}${path}`)
      }

      // Always revalidate the tag for collection-wide queries
      revalidateTag(options.tagName)

      req.payload.logger.info(
        `Successfully revalidated ${changedLocales.size} locale(s) for: ${path}`,
      )
    } catch (error) {
      req.payload.logger.error(`Error revalidating ${options.collectionSlug} ${path}: ${error}`)
    }

    return doc
  }
}

export function createRevalidateDeleteHook(
  options: RevalidateCollectionOptions,
): CollectionAfterDeleteHook {
  return async ({ doc, req }) => {
    const path = options.basePath ? `${options.basePath}/${doc.slug}` : `/${doc.slug}`

    req.payload.logger.info(`Revalidating deleted ${options.collectionSlug} at path: ${path}`)

    try {
      // For deletions, revalidate ALL locales since the content is gone
      for (const locale of VALID_LOCALES) {
        revalidatePath(`/${locale}${path}`)
      }

      // Revalidate collection tag
      revalidateTag(options.tagName)

      req.payload.logger.info(`Successfully revalidated deleted ${options.collectionSlug}: ${path}`)
    } catch (error) {
      req.payload.logger.error(
        `Error revalidating deleted ${options.collectionSlug} ${path}: ${error}`,
      )
    }

    return doc
  }
}

// Special revalidation hook for Homepage global
export function createRevalidateHomepageHook(): GlobalAfterChangeHook {
  return async ({ doc, req }) => {
    req.payload.logger.info(`Revalidating homepage`)

    try {
      // Revalidate all locale homepages
      for (const locale of VALID_LOCALES) {
        revalidatePath(`/${locale}`)
      }

      // Revalidate homepage tag
      revalidateTag('global_homepage')

      req.payload.logger.info(`Successfully revalidated homepage for all locales`)
    } catch (error) {
      req.payload.logger.error(`Error revalidating homepage: ${error}`)
    }

    return doc
  }
}
