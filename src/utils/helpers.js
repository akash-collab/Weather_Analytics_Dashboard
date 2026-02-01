export const formatXAxis = (dateString, range) => {
  const date = new Date(dateString)

  if (range === 8) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return date.toLocaleDateString([], {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  })
}