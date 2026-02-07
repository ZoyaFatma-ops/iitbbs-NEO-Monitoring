import axios from 'axios';
import { ValidationError } from '../errors/appError.js';

const NASA_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

const getApiKey = () => {
  const key = process.env.NASA_API_KEY;
  if (!key) {
    throw new ValidationError('NASA_API_KEY is not configured');
  }
  return key;
};

const fetchFeed = async ({ start_date, end_date }) => {
  const apiKey = getApiKey();
  const { data } = await axios.get(`${NASA_BASE_URL}/feed`, {
    params: {
      api_key: apiKey,
      start_date,
      end_date,
    },
  });
  return data;
};

const fetchLookup = async (id) => {
  const apiKey = getApiKey();
  const { data } = await axios.get(`${NASA_BASE_URL}/neo/${id}`, {
    params: {
      api_key: apiKey,
    },
  });
  return data;
};

export {
  fetchFeed,
  fetchLookup,
};
