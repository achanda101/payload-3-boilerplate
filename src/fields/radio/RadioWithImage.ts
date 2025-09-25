import type { RadioField } from 'payload'

interface RadioOptionWithImage {
  label: string;
  value: string;
  image: string;
}

export interface RadioFieldWithImage extends Omit<RadioField, 'options'> {
  options: RadioOptionWithImage[];
}

export const createRadioFieldWithImages = (
  name: string, 
  label: string, 
  options: RadioOptionWithImage[]
): RadioFieldWithImage => ({
  name,
  label,
  type: 'radio',
  options,
  admin: {
    components: {
      Field: {
        path: 'src/fields/radio/RadioWithImage.tsx',
      }
    }
  },
})