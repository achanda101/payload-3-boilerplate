/**
 * Format bytes to a human-readable file size string
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB", "512 KB")
 */
export const formatFileSize = (bytes: number | undefined | null): string => {
  if (!bytes) return ''

  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}
