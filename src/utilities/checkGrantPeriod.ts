interface GrantPeriodStatus {
  shouldDisableApply: boolean
  message: string | null
}

export function checkGrantPeriodStatus(
  activePeriod: string | undefined,
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  msg: string | null | undefined,
): GrantPeriodStatus {
  // Default: don't disable (open_all_year or closed handled elsewhere)
  if (activePeriod !== 'specific_period') {
    return { shouldDisableApply: false, message: null }
  }

  // If specific_period but no dates, don't disable
  if (!startDate || !endDate) {
    return { shouldDisableApply: false, message: null }
  }

  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Set start date to beginning of day
  start.setHours(0, 0, 0, 0)
  // Set end date to end of day for inclusive comparison
  end.setHours(23, 59, 59, 999)

  // Check if current date falls within the period
  const isWithinPeriod = now >= start && now <= end

  // Disable Apply buttons when OUTSIDE the period
  // (Applications are only open during the specified period)
  const isOutsidePeriod = !isWithinPeriod

  return {
    shouldDisableApply: isOutsidePeriod,
    message: isOutsidePeriod ? msg || null : null,
  }
}
