import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostItem from './PostItem.jsx';

export default function Posts({ sortOption: initialSortOption, searchTerm: initialSearchTerm }) {
    const [loadedPosts, setLoadedPosts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
                const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
                const commentsRes = await fetch('https://jsonplaceholder.typicode.com/comments');

                if (!postsRes.ok || !usersRes.ok || !commentsRes.ok) {
                    throw new Error('Error fetching data');
                }

                const [posts, users, comments] = await Promise.all([
                    postsRes.json(),
                    usersRes.json(),
                    commentsRes.json(),
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
                let sortOption = initialSortOption;

                const urlSearchParams = new URLSearchParams(location.search);
                const urlSortOption = urlSearchParams.get('sort');
                if (urlSortOption) {
                    sortOption = urlSortOption;
                }

                if (sortOption === 'asc') {
                    postsData.sort((a, b) => a.title.localeCompare(b.title));
                } else if (sortOption === 'desc') {
                    postsData.sort((a, b) => b.title.localeCompare(a.title));
                }

                // Searching
                let searchTerm = initialSearchTerm;

                const urlSearchTerm = urlSearchParams.get('search');
                if (urlSearchTerm) {
                    searchTerm = urlSearchTerm;
                };

                if (searchTerm) {
                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                    postsData = postsData.filter(
                        (post) =>
                        post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                        post.body.toLowerCase().includes(lowerCaseSearchTerm)
                    );
                };

                setLoadedPosts(postsData);
            } catch (err) {
                console.error('Error fetching data: ', err.message);
            }
        }

        fetchPosts();
    }, [initialSortOption, initialSearchTerm, location.search]);

    return (
        <ul className="list-unstyled">
            {loadedPosts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    );
};
