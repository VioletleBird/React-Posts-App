export default function CommentItem({ comment }) {
    return (
        <li className="mb-3 px-3 pt-2 pb-1 bg-lg-grey rounded">
            <div>
                <h6>{comment.name}</h6>
                <p className="small">{comment.email}</p>
            </div>
            <p className="small">{comment.body}</p>
        </li>
    )
};
