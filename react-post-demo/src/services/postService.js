import axios from 'axios';

//Creating an axios instance
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

const getPosts = () => api.get('/posts'); //GET request to baseURL/posts

export { getPosts };