const LS_KEY_THEME = 'theme';
const LS_KEY_SEARCH_PARAMS = 'search-params';
const API_URL = 'http://localhost:8080';
const PAGE_SIZE = 20;

const API_URLS = {
  users_service: {
    get: `${API_URL}/user`,
    loginWithCredentials: '/login',
    loginWithCookie: '/login-with-cookie',
    loginWithSaml: '/login-with-saml',
    logout: '/logout',
    users: '/users',
  },
};

export { API_URLS, LS_KEY_SEARCH_PARAMS, LS_KEY_THEME, API_URL, PAGE_SIZE };
