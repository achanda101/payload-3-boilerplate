import type { Access } from 'payload'

/**
 * Access control for delete operations that prevents translators from deleting content.
 *
 * Access rules:
 * - Admins, Editors, Writers: Can delete content
 * - Translators: Cannot delete content (read and edit only)
 */
export const noDeleteForTranslators: Access = ({ req: { user } }) => {
  // No user logged in - deny access
  if (!user) {
    return false
  }

  // Admins, editors, and writers can delete
  if (user.role === 'admin' || user.role === 'editor' || user.role === 'writer') {
    return true
  }

  // Translators cannot delete
  if (user.role === 'translator') {
    return false
  }

  // Deny access for any other role
  return false
}
