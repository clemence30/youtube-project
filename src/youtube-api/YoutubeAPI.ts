import axios from "axios";

const API_KEY = 'AIzaSyCOxboT5azx6bNwbEfkqgIM-ER82eowcv8';
const YT_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

// Create an Axios instance with default configuration for YouTube Data API
export default axios.create({
    baseURL: YT_API_BASE_URL,
    params: {
    part: 'snippet', 
    maxResults: 10,
    key: API_KEY
    },
    headers : {}
});
