import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    accept: 'application/json'
  },
});

export default Api;
