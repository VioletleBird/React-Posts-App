import { useState, useEffect } from 'react';
import PostItem from './PostItem.jsx';

export default function Posts({ sortOption, searchTerm }) {
    const [loadedPosts, setLoadedPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('http://localhost:8080/posts');
                if (!res.ok) {
                    throw new Error(`Error fetching posts: ${res.status}`)
                }

                let posts = await res.json();
                //sorting
                if (sortOption === 'asc') {
                    posts = posts.sort((a, b) => a.title.localeCompare(b.title));
                } else if (sortOption === 'desc') {
                    posts = posts.sort((a, b) => b.title.localeCompare(a.title));
                }
                //searching
                if (searchTerm) {
                    posts = posts.filter(
                        (post) =>
                            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.body.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                };

                setLoadedPosts(posts);
            } catch (err) {
                console.error('Error fetching posts: ', err.message);
            }
        }
        fetchPosts();
    }, [sortOption, searchTerm]);
    
    return (
        <ul className="list-unstyled">
            {loadedPosts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))} 
        </ul>
    );
};
