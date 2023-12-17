import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';
import CommentItem from './CommentItem.jsx';

export default function PostItemContainer({ post }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
        navigate(`${post.id}`)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/')
    };

    return (
        <>
            <PostItem post={post} onOpenModal={handleOpenModal} />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <article className="bg-white rounded px-3">
                    <div className=" pt-4 text-d-grey">
                        <h5 className="pb-2">{post.title}</h5>
                        <p className="small">written by <b>{post.user.name}</b></p>
                        <p className="py-4">{post.body}</p>
                    </div>
                    <h6>{post.numComments} comments</h6>
                    <ul className="list-unstyled py-2">
                        {post.comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}                   
                    </ul>
                </article>
            </Modal>
        </>
    );
};
    
function PostItem({ post, onOpenModal }) {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
    };

    return (
        <li className="wrapper my-5">
            <article className="bg-light rounded shadow-sm">
                <div className="p-3 text-d-grey" onClick={onOpenModal}>
                    <h5 className="pb-2">{post.title}</h5>
                    <p>{post.body.slice(0, 70)} ...</p>
                </div>
                <div className="d-flex flex-wrap p-2 bg-lg-grey">
                    <p className="p-2 small me-auto my-auto text-d-grey">{post.user.name}</p>
                    <button
                        className="btn btn-md-grey btn-sm rounded-pill" 
                        onClick={onOpenModal}>
                            {post.numComments} comments
                    </button>
                    <button 
                        className={`mx-2 btn ${isLiked ? 'btn-like-active' : 'btn-like'}`}
                        onClick={handleLikeClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path stroke="#f9054a" d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                            </svg>
                    </button>
                </div>
            </article>
        </li>
    )
};
