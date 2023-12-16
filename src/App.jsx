import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Posts from './components/Posts.jsx';

function App() {
  const [sortOption, setSortOption] = useState(null);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <Router>
      <div>
        <Header onSortChange={handleSortChange}/>
        <Posts sortOption={sortOption}/>
      </div>
    </Router>
  );
}

export default App;