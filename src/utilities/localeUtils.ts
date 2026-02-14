import languageOptions from '@/globals/Header/languageOptions.json'

export const VALID_LOCALES = languageOptions.map(lang => lang.value)

export const DEFAULT_LOCALE = 'en'

export function isValidLocale(locale: string): boolean {
  return VALID_LOCALES.includes(locale)
}

export function getLocaleFromUrl(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return segments[0]
  }
  return null
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromUrl(pathname)
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/'
  }
  return pathname
}

export function getLocalizedUrl(pathname: string, locale: string): string {
  const cleanPath = stripLocaleFromPathname(pathname)
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}
