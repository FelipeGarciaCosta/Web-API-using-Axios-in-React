import React, { useState } from "react";
import { createPost } from "../services/postService";

export default function PostForm({ posts, setPosts }) {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addPost();
        setTitle('');
        setBody('');
    }

    const addPost = () => {
        createPost({ title, body })
            .then(result => {
                setPosts([...posts, result.data]);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                title
            </div>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <div>
                body
            </div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <div>
                <button type="submit">Add Post</button>
            </div>
        </form>
    );
}
