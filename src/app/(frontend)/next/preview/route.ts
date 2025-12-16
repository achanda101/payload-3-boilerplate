import jwt from 'jsonwebtoken'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionSlug } from 'payload'

const payloadToken = 'payload-token'

export async function GET(req: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const token = req.headers.get('cookie')?.split(`${payloadToken}=`)[1]?.split(';')[0]
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug | 'homepage'
  const slug = searchParams.get('slug')
  const locale = searchParams.get('locale')

  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  } else {
    if (!path) {
      return new Response('No path provided', { status: 404 })
    }

    if (!collection) {
      return new Response('No collection provided', { status: 404 })
    }

    if (!slug) {
      return new Response('No slug provided', { status: 404 })
    }

    if (!token) {
      return new Response('You are not allowed to preview this page', { status: 403 })
    }

    if (!path.startsWith('/')) {
      return new Response('This endpoint can only be used for internal previews', { status: 500 })
    }

    let user

    try {
      user = jwt.verify(token, payload.secret)
    } catch (error) {
      payload.logger.error('Error verifying token for live preview:', error)
    }

    const draft = await draftMode()

    // You can add additional checks here to see if the user is allowed to preview this page
    if (!user) {
      draft.disable()
      return new Response('You are not allowed to preview this page', { status: 403 })
    }

    // Verify the given slug exists
    try {
      // Handle homepage global separately
      if (collection === 'homepage') {
        const homepage = await payload.findGlobal({
          slug: 'homepage',
          draft: true,
          depth: 0,
          ...(locale && { locale: locale as any }),
        })

        if (!homepage) {
          return new Response('Homepage not found', { status: 404 })
        }
      } else {
        // Handle regular collections
        const docs = await payload.find({
          collection: collection as CollectionSlug,
          draft: true,
          limit: 1,
          // pagination: false reduces overhead if you don't need totalDocs
          pagination: false,
          depth: 0,
          select: {},
          ...(locale && { locale: locale as any }),
          where: {
            slug: {
              equals: slug,
            },
          },
        })

        if (!docs.docs.length) {
          return new Response('Document not found', { status: 404 })
        }
      }
    } catch (error) {
      payload.logger.error('Error verifying document for live preview:', error)
    }

    draft.enable()

    redirect(path)
  }
}
