import type { Access } from 'payload'

export const canUpdateUser: Access = ({ req: { user }, id }) => {
  // Allow users with a role of 'admin' or 'editor' or the author of their own record
  if (!user) {
    return false
  }
  return user.role === 'admin' || user.role === 'editor' || user.id === id
}