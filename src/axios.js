import axios from 'axios';

const instance = axios.create(
{
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common[ 'Authorization' ] = 'AUTH_TOKEN FROM INSTANCE';

instance.interceptors.request.use( request =>
{
  console.log( request );

  return request;
});

export default instance;