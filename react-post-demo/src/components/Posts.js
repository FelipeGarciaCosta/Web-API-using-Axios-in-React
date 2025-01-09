import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../services/postService';
import PostForm from './PostForm';


//For editing a post we create a new state variable editingPost, and drill it to PostForm component
//When the user clicks on the Edit Post button, we set the editingPost state variable to the  {post object} which the user wants to edit


export default function Post() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

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
        setPosts(posts.filter(post => post.id !== id)); //filtering out the post with the given id Optimistic UI because we are not waiting for the response from the server
        deletePost(id)
            .then(() => {
                console.log('Post Deleted Successfully');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const startEditing = (post) => {
        setEditingPost(post);
    }

    return (
        <div className='posts'>
            <h1>Posts</h1>
            <PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost} />
            <ul>
                {posts.map(post => (
                    <li className='post' key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
                        <button onClick={() => startEditing(post)}>Edit Post</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}