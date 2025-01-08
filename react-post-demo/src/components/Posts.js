import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/postService';

export default function Post() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        //getPost returns a promise, we are sending a HTTP GET request to the api(it takes time to process the request->async)
        //Once the request got fullfilled, then the result will be stored in the result variable
        getPosts().then(result => {
            console.log(result)
        })
            .catch(err => {
                console.log(err)
            })

    }, []); //it renders twice, because of the index.js React.StrictMode

    return (<></>);
}