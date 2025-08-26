import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)() as Header
  // console.log('Nav Menu Data:', navMenuData.menuItems[0].navItems)

  return <HeaderClient data={{
       ...headerData,
       languages: 
     headerData.languages || []}} />
}