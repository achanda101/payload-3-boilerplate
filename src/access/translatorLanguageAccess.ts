import type { Access } from 'payload'

/**
 * Access control for content collections with language-based restrictions for translators.
 *
 * Access rules:
 * - Admins, Editors, Writers: Full access to all content in all languages
 * - Translators: Can only edit content in their assigned languages
 */
export const translatorLanguageAccess: Access = ({ req: { user, locale } }) => {
  // No user logged in - deny access
  if (!user) {
    return false
  }

  // Admins, editors, and writers get full access
  if (user.role === 'admin' || user.role === 'editor' || user.role === 'writer') {
    return true
  }

  // Translators can only access content in their assigned languages
  if (user.role === 'translator') {
    const currentLocale = locale || 'en'
    const assignedLanguages = user.assignedLanguages || []

    // Check if the current locale is in their assigned languages
    if ((assignedLanguages as string[]).includes(currentLocale)) {
      return true
    }

    // Deny access if current locale is not assigned to this translator
    return false
  }

  // Deny access for any other role
  return false
}
