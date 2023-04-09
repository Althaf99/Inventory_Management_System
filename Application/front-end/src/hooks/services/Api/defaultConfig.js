// noinspection JSUnresolvedVariable
const config = {
  baseUrl: `${process.env.REACT_APP_DIRECTOR_API_GATEWAY_URL}`,
  mode: 'cors',
  cache: 'default',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {},
  timeout: `${process.env.REACT_APP_DIRECTOR_REQUEST_TIMEOUT}`,
};

export default config;
