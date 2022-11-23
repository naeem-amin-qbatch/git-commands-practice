import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : <h2>PORT not found</h2>;
export default axios;
