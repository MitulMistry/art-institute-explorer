import { CSRFRequestHeaders } from "./CSRFTokenUtil";

export const login = user => (
  fetch('/api/v1/sessions', {
    method: 'POST',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(user)
  })
);

export const signUp = user => (
  fetch('/api/v1/users', {
    method: 'POST',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(user)
  })
);

export const editProfile = user => (
  fetch(`/api/v1/users/${user.user.id}`, {
    method: 'PATCH',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(user)
  })
);

export const logout = () => (
  fetch('/api/v1/sessions', {
    method: 'DELETE',
    headers: CSRFRequestHeaders()
  })
);

export const deleteAccount = id => (
  fetch(`/api/v1/users/${id}`, {
    method: 'DELETE',
    headers: CSRFRequestHeaders()
  })
);