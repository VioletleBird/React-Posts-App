import { useState, useEffect } from 'react';
import PostItem from './PostItem.jsx';

export default function Posts({ sortOption, searchTerm }) {
    const [loadedPosts, setLoadedPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
                const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');

                if (!postsResponse.ok || !usersResponse.ok || !commentsResponse.ok) {
                    throw new Error('Error fetching data');
                }

                const [posts, users, comments] = await Promise.all([
                    postsResponse.json(),
                    usersResponse.json(),
                    commentsResponse.json(),
                ]);

                let postsData = posts.map((post) => {
                    const user = users.find((user) => user.id === post.userId);

                    const postComments = comments
                        .filter((comment) => comment.postId === post.id)
                        .map(({ id, name, email, body }) => ({ id, name, email, body }));

                    return {
                        id: post.id,
                        title: post.title,
                        body: post.body,
                        user: user
                            ? { id: user.id, name: user.name }
                            : { id: null, name: 'Unknown User' },
                        numComments: postComments.length,
                        comments: postComments,
                    };
                });

                // Sorting
                if (sortOption === 'asc') {
                    postsData.sort((a, b) => a.title.localeCompare(b.title));
                } else if (sortOption === 'desc') {
                    postsData.sort((a, b) => b.title.localeCompare(a.title));
                }

                // Searching
                if (searchTerm) {
                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                    postsData = postsData.filter(
                        (post) =>
                            post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                            post.body.toLowerCase().includes(lowerCaseSearchTerm)
                    );
                }

                setLoadedPosts(postsData);
            } catch (err) {
                console.error('Error fetching data: ', err.message);
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
}
