import axios from 'axios';
import { store, authActions } from '_store';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url)
    };
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.data = JSON.stringify(body);
    }
    console.log(url,requestOptions)
    return axios(url, requestOptions).then(handleResponse);
  };
}

// Helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = authToken();
  const isLoggedIn = !!token;
  const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
  console.log(isLoggedIn,isApiUrl)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function authToken() {
  // console.log( store.getState().auth.value.data[0].token,"dath")
  return store.getState().auth.value?.data?.token;
}

async function handleResponse(response) {
  const isJson = response.headers?.['content-type']?.includes('application/json');
  const data = isJson ? response.data : null;

  // check for error response
  if (!response.status >= 200 && response.status < 300) {
    if ([401, 403].includes(response.status) && authToken()) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      const logout = () => store.dispatch(authActions.logout());
      logout();
    }

    // get error message from body or default to response status
    const error = (data && data.message) || response.status;
    return Promise.reject(error);
  }

  return data;
}
