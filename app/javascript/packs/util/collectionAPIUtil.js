export const fetchCollections = () => (
  fetch('/api/v1/collections')
);

export const fetchCollection = id => (
  fetch(`/api/v1/collections/${id}`)
);