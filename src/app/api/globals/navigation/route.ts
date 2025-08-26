import { getCachedGlobal } from '@/utilities/getGlobals'
import { NextRequest, NextResponse } from 'next/server'
import type { Nav } from '@/payload-types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale') || 'en'
  const depth = parseInt(searchParams.get('depth') || '2')

  try {
    const navData = await getCachedGlobal('nav', depth, locale)() as Nav
    
    return NextResponse.json(navData)
  } catch (error) {
    console.error('Failed to fetch navigation data:', error)
    return NextResponse.json({ error: 'Failed to fetch navigation data' }, { status: 500 })
  }
}