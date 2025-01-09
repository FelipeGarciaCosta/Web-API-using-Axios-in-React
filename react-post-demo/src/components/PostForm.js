import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";

//Once the user clicked on edit post, the useEffect will be called and the title and body of the post will be set to the title and body state variables
//Then in the handleSubmit we are checking if the editingPost is not null, then we are calling the editPost function, else we are calling the addPost function


export default function PostForm({ posts, setPosts, editingPost, setEditingPost }) {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingPost) {
            editPost();
        } else {
            addPost();
        }
        setTitle('');
        setBody('');
        setEditingPost(null);
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

    const editPost = () => {
        updatePost(editingPost.id, { title, body })
            .then(result => {
                setPosts(posts.map(post => post.id === editingPost.id ? result.data : post));
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setBody(editingPost.body);
        } else {
            setTitle('');
            setBody('');
        }
    }, [editingPost]);

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
                <button type="submit">{editingPost ? "Edit Post" : "Add Post"}</button>
            </div>
        </form>
    );
}
