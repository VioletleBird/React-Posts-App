import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';
import CommentItem from './CommentItem.jsx';

export default function SinglePost() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPostDetails() {
            try {
                const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const postData = await postRes.json();
                setPost(postData);

                const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                const commentsData = await commentsRes.json();
                setComments(commentsData);

                const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
                const userData = await userRes.json();
                setUser(userData);
            } catch (err) {
                console.error('Error fetching post details: ', err.message);
            }
        }

        fetchPostDetails();
    }, [postId]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/')
    };

    if (!post || !user) {
        return null;
    }

    return (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <article className="bg-white rounded px-3">
                <div className="pt-4 text-d-grey">
                    <h5 className="pb-2">{post.title}</h5>
                    <p className="small">written by <b>{user.name}</b></p>
                    <p className="py-4">{post.body}</p>
                </div>
                <h6>{comments.length} comments</h6>
                <ul className="list-unstyled py-2">
                    {comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </ul>
            </article>
        </Modal>
    );
};
