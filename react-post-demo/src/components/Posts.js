import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../services/postService';

export default function Post() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        //getPost returns a promise, we are sending a HTTP GET request to the api(it takes time to process the request->async)
        //Once the request got fullfilled, then the result will be stored in the result variable
        getPosts().then(result => {
            setPosts(result.data);//result.data is an array of objects
        })
            .catch(err => {
                console.log(err)
            })

    }, []); //it renders twice, because of the index.js React.StrictMode

    const handleDelete = (id) => {
        deletePost(id)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id)); //filtering out the post with the given id
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='posts'>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li className='post' key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}