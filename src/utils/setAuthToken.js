import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    //sss
    axios.defaults.headers.common['Authorization'] =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JmNjQ0YmQzYmFhN2ViZGZjMWY1ZCIsIm5hbWUiOiJ1ayBib2kiLCJlbWFpbCI6InVrQGdtYWlsLmNvbSIsImlhdCI6MTY1MjI5MTE0MSwiZXhwIjoxNjgzODQ4MDY3fQ.Uc6SRvAuHCxfIrc7pIjWTO9Pv5icReW6Y5forQ3QUSc';
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
