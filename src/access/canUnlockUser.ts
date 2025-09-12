import type { Access } from 'payload'

export const canUnlockUser: Access = ({ req: { user } }) => {
  // Allow users with a role of 'admin' or 'editor' to be able to unlock
  // other users who may be blocked from authenticating successfully 
  // due to failing too many login attempts
  if (!user) {
    return false
  }
  return user.role === 'admin' || user.role === 'editor'
}