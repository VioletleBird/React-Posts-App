import { useState, useEffect } from 'react';
import PostItem from './PostItem.jsx';

export default function Posts() {
    const [loadedPosts, setLoadedPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('http://localhost:8080/posts');
            if (!res.ok) {
                throw new Error(`Error fetching posts: ${res.status}`)
            }

            const posts = await res.json();
            setLoadedPosts(posts);
        }

        fetchPosts();
    }, []);
    
    return (
        <ul class="list-unstyled">
            {loadedPosts.map((post) => (
                 <PostItem key={post.id} post={post} />
            ))} 
        </ul>
    );
};
