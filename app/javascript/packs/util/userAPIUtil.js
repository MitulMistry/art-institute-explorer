export const fetchUsers = () => (
  fetch('/api/v1/users')
);

export const fetchUser = id => (
  fetch(`/api/v1/users/${id}`)
);