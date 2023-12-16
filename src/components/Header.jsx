import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm.jsx';
import Modal from './Modal.jsx';
import NewPost from './NewPost.jsx';

export default function Header({ onSortChange, onSearch }) {
    const [selectedSort, setSelectedSort] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const navigate = useNavigate();

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
        onSortChange(sortOption);
        navigate(`/?sort=${sortOption}`);
    };

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };
    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-sm text-d-grey bg-white p-3">
            <div className="container">
                <a href="/posts"><h2>PostsBoard</h2></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li>
                            <SearchForm onSearch={onSearch}/>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <button
                                        className={`dropdown-item ${selectedSort === 'asc' ? 'active' : ''}`}
                                        onClick={() => handleSortChange('asc')}
                                        >
                                        A-Z
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`dropdown-item ${selectedSort === 'desc' ? 'active' : ''}`}
                                        onClick={() => handleSortChange('desc')}
                                        >
                                        Z-A
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-bright rounded-pill" onClick={handleOpenForm}>
                                <svg className="pen-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                </svg>
                                POST
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <Modal isOpen={isFormOpen} onClose={handleCloseForm}>
                <NewPost />
            </Modal>
        </nav>
    )
};
