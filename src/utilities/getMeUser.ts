import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '../payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token: string
  user: User
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    if (nullUserRedirect) {
      redirect(nullUserRedirect)
    }
    throw new Error('No authentication token found')
  }

  try {
    // Use Payload's local API with overrideAccess to bypass 2FA access control
    const payload = await getPayload({ config })

    // Create a proper Headers instance
    const headers = new Headers()
    headers.set('Authorization', `JWT ${token}`)

    // Verify the token and get user using Payload's auth
    const authResult = await payload.auth({ headers })

    if (process.env.NODE_ENV === 'development') {
      console.log('getMeUser - Auth result:', {
        hasUser: !!authResult?.user,
        userId: authResult?.user?.id,
        userEmail: authResult?.user?.email,
      })
    }

    if (!authResult?.user) {
      if (nullUserRedirect) {
        redirect(nullUserRedirect)
      }
      throw new Error('User not found or invalid token')
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('getMeUser - Fetching full user with depth: 1 and overrideAccess: true')
    }

    // Fetch user with populated avatar, bypassing ALL access control
    const fullUser = await payload.findByID({
      collection: 'users',
      id: authResult.user.id,
      depth: 1,
      overrideAccess: true, // Bypass 2FA and other access control
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('getMeUser - Full user fetched:', {
        id: fullUser.id,
        email: fullUser.email,
        hasAvatar: !!fullUser.avatar,
      })
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('getMeUser - User:', fullUser.email)
      console.log('getMeUser - Avatar:', fullUser.avatar ? 'populated' : 'null')
    }

    if (validUserRedirect && fullUser) {
      redirect(validUserRedirect)
    }

    return {
      token,
      user: fullUser as User,
    }
  } catch (error) {
    console.error('getMeUser - Error:', error)

    if (nullUserRedirect) {
      redirect(nullUserRedirect)
    }

    throw error
  }
}
