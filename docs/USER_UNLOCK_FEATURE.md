# User Unlock Feature

## Overview

The User Unlock feature is a security mechanism in Payload CMS that protects user accounts from brute-force attacks while allowing authorized administrators to restore access to legitimate locked accounts.

## How It Works

### Automatic Account Lockout

Payload CMS includes built-in brute-force protection that automatically locks user accounts after too many failed login attempts. When an account is locked:

- The user cannot log in, even with correct credentials
- A `loginAttempts` counter is tracked on the user document
- The account remains locked until manually unlocked by an authorized user

This prevents attackers from repeatedly attempting to guess passwords.

### Manual Unlock

Authorized users (Admins and Editors) can manually unlock locked accounts through the Payload Admin UI. Unlocking an account:

- Resets the failed login attempt counter
- Removes the lockout restriction
- Allows the user to attempt logging in again

## Access Control

The unlock permission is controlled by the `canUnlockUser` access function:

**Location:** `src/access/canUnlockUser.ts`

```typescript
export const canUnlockUser: Access = ({ req: { user } }) => {
  // Allow users with a role of 'admin' or 'editor' to be able to unlock
  // other users who may be blocked from authenticating successfully
  // due to failing too many login attempts
  if (!user) {
    return false
  }
  return user.role === 'admin' || user.role === 'editor'
}
```

### Permission Matrix

| Role | Can Unlock Users? |
|------|-------------------|
| Admin | ✅ Yes |
| Editor | ✅ Yes |
| Writer | ❌ No |
| Translator | ❌ No |
| Unauthenticated | ❌ No |

## Implementation

The unlock access control is configured in the Users collection:

**Location:** `src/collections/Users/index.ts`

```typescript
export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: canUpdateUser,
    delete: canUpdateUser,
    read: authenticated,
    update: canUpdateUser,
    unlock: canUnlockUser,  // ← Controls who can unlock accounts
  },
  // ... rest of configuration
}
```

## How to Unlock a User

### Via Admin UI

1. Log in to the admin panel at `/admin` with an Admin or Editor account
2. Navigate to **Users** collection
3. Find the locked user account
4. Look for the "Unlock" option in the user document interface
5. Click to unlock the account

The user will immediately be able to attempt logging in again.

### Programmatic Unlock

While the admin UI is the primary method, you can also unlock users programmatically via the Payload API:

```typescript
await payload.update({
  collection: 'users',
  id: userId,
  data: {
    loginAttempts: 0, // Reset attempt counter
  },
})
```

## Security Best Practices

1. **Verify Identity**: Before unlocking an account, verify the user's identity through alternative means (email, phone, etc.)
2. **Password Reset**: After unlocking, encourage users to reset their password if they've forgotten it
3. **Investigate Patterns**: Multiple lockouts for the same account may indicate an attack attempt
4. **Monitor Unlock Actions**: Track who unlocks accounts and when (can be extended with audit logging)
5. **Educate Users**: Inform users about password requirements and account security

## Related Features

- **Two-Factor Authentication (2FA)**: This project uses `@clocklimited/payload-2fa` for additional security
- **Role-Based Access Control (RBAC)**: See `docs/rbac-translator-roles-audit-trail.md` for more on roles
- **User Management**: See `docs/COLLECTIONS.md` for full Users collection documentation

## Technical Details

### Database Fields

The lockout mechanism uses the following field on user documents:

- `loginAttempts` (number, nullable): Tracks the number of failed login attempts

### Payload Version

This feature is built-in to Payload CMS and is available in:
- Payload CMS v3.70.0 (current project version)
- All Payload v3.x versions (built-in auth feature)

## Future Enhancements

Potential improvements to the unlock feature:

- [ ] Audit logging for unlock actions
- [ ] Email notifications when accounts are locked/unlocked
- [ ] Configurable lockout thresholds
- [ ] Automatic unlock after time period
- [ ] Lockout history tracking

## Troubleshooting

### "I can't unlock a user"

**Solution**: Verify you have Admin or Editor role. Writers and Translators cannot unlock users.

### "User still can't log in after unlock"

**Solution**: Ensure:
1. The unlock action completed successfully
2. The user is using the correct password
3. The user account is not disabled for other reasons (check user document status)

### "How do I configure lockout thresholds?"

**Note**: Payload's built-in lockout thresholds are not currently configurable through the Users collection. This is managed internally by Payload CMS. To customize lockout behavior, you would need to implement custom authentication hooks.

## Summary

The User Unlock feature provides a balance between security (preventing brute-force attacks) and usability (allowing legitimate users to regain access). By restricting unlock permissions to Admins and Editors, the system ensures that only trusted personnel can restore access to locked accounts.
