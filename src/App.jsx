import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Posts from './components/Posts.jsx';

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
        <Posts sortOption={sortOption} searchTerm={searchTerm}/>
      </div>
    </Router>
  );
}

export default App;