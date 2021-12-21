// This function processes a Response object returned from a fetch request.
// It rejects the Promise if there are errors (400-500 level) and allows these
// errors to be capture by .catch
// https://jasonwatmore.com/post/2021/10/09/fetch-error-handling-for-failed-http-responses-and-network-errors
export const processResponse = async response => {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errors = data || {"Error code": response.status};
    return Promise.reject(errors);
  } else {
    return data;
  }
}