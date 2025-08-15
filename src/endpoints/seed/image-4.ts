import type { Media } from '@/payload-types'

export const image4: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Vendure on railway Cover',
  caption: 'Graphic by Payload',
}
