export const selectCSRFToken = () => (
  document.querySelector('meta[name="csrf-token"]').content
);

export const CSRFRequestHeaders = () => (
  {
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
    'Content-Type': 'application/json'
  }
);