export const login = user => (
  fetch('/api/v1/sessions', {
    method: 'POST',
    body: JSON.stringify(user)
  })
);

export const signup = user => (
  fetch('/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })
);

export const logout = () => (
  fetch('/api/v1/sessions', {
    method: 'DELETE'
  })
);