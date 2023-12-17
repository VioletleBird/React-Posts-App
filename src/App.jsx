import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Posts from './components/Posts.jsx';
import SinglePost from './components/SinglePost.jsx';

function App() {
    const [sortOption, setSortOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    return (
        <Router>
        <div>
            <Header onSortChange={handleSortChange} onSearch={handleSearch}/>
            <Routes>
            <Route path="" element={<Posts sortOption={sortOption} searchTerm={searchTerm}/>} />
            <Route path=":postId" element={<SinglePost />} />
            <Route path="search?=:searchTerm" element={<Posts sortOption={sortOption} searchTerm={searchTerm}/>} />
            </Routes>
        </div>
        </Router>
    );
};

export default App;