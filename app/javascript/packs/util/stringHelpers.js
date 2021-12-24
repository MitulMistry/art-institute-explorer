export const formatDateTime = dateTime => (
  new Date(dateTime).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
);