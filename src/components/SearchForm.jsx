import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchForm({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        navigate(`/?search=${searchTerm}`);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}
