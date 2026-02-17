import type { MediaCloud } from '@/payload-types'
import { getMeUser } from '@/utilities/getMeUser'
import { getServerSideURL } from '@/utilities/getURL'
import Image from 'next/image'

const DefaultAvatarSVG = () => (
  <svg
    className="graphic-account"
    height="25"
    viewBox="0 0 25 25"
    width="25"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle className="graphic-account__bg" cx="12.5" cy="12.5" r="11.5"></circle>
    <circle className="graphic-account__head" cx="12.5" cy="10.73" r="3.98"></circle>
    <path
      className="graphic-account__body"
      d="M12.5,24a11.44,11.44,0,0,0,7.66-2.94c-.5-2.71-3.73-4.8-7.66-4.8s-7.16,2.09-7.66,4.8A11.44,11.44,0,0,0,12.5,24Z"
    ></path>
  </svg>
)

export const Avatar = async () => {
  try {
    const { user } = await getMeUser()
    const avatar = user?.avatar as MediaCloud
    const relativeUrl = avatar?.sizes?.thumbnail?.url || avatar?.url
    const userName = user?.name || user?.email || 'User'

    if (avatar && relativeUrl) {
      // Convert relative URL to absolute URL
      const avatarUrl = relativeUrl.startsWith('http')
        ? relativeUrl
        : `${getServerSideURL()}${relativeUrl}`

      return (
        <Image
          style={{
            borderRadius: '50%',
          }}
          src={avatarUrl}
          alt={avatar.alt || ''}
          height={25}
          width={25}
        />
      )
    }

    // Default avatar with name
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <DefaultAvatarSVG />
        <span
          style={{
            fontSize: '11px',
            color: '#666',
            maxWidth: '400px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            textAlign: 'center',
          }}
        >
          {userName}
        </span>
      </div>
    )
  } catch (error) {
    // Log error but don't break the page - fall through to default avatar
    console.error('Error loading user avatar:', error)
    return <DefaultAvatarSVG />
  }
}

export default Avatar
