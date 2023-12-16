import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 8080;

const USERS = 'https://jsonplaceholder.typicode.com/users';
const POSTS = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`)
        }
        return res.json();
    } catch (err) {
        console.error(`Error fetching data. `, err.message)
        return [];
    }
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/posts', async (req, res) => {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchData(USERS),
            fetchData(POSTS),
            fetchData(COMMENTS),
        ]);

        const postsData = posts.map((post) => {
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

        res.json(postsData);
    } catch (err) {
        console.error('Error processing request: ', err.message);
        res.status(500).json({ error: 'Server Error' })
    }
});

app.listen(port);
