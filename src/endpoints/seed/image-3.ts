import type { Media } from '@/payload-types'

export const image3: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Medusa 2.0 on railway Cover',
  caption: 'Book Cover by Payload',
}
