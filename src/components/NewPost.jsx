export default function NewPost() {
    return (
        <form>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label htmlFor="inputFirstName">First name</label>
                        <input type="text" className="form-control" id="inputFirstName" placeholder="First name" />
                    </div>
                    <div className="col">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" placeholder="Last name" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="name@email.com" />
            </div>
            <div className="form-group">
                <label htmlFor="inputTitle">Title of post</label>
                <input type="text" className="form-control" id="inputTitle" />
            </div>
            <div className="form-group">
                <label htmlFor="inputText">Text</label>
                <textarea className="form-control" id="inputText" rows="3"></textarea>
            </div>
            <div className="form-group mt-4 pb-2">
                <button className="btn btn-bright rounded-pill mx-auto">NEW POST</button>
            </div>
        </form>
    )
};
