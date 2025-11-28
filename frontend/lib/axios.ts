import axios from 'axios';
import { ENV } from './env';

export const api = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
