import axios from 'axios';

//Creating an axios instance
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

const getPosts = () => api.get('/posts'); //GET request to baseURL/posts
const deletePost = (id) => api.delete(`/posts/${id}`);
//a Request can have a body, in this case the body is a post object  
const createPost = (post) => api.post('/posts', post);


export { getPosts, deletePost, createPost };