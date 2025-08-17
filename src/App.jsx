import { HashRouter as Router } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './App.css'

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'NPvecHeYqK-4o88gB54byrAVhLdUTk2W1_ziTY4SpZw';

function App() {
   const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhotos = async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const endpoint = searchTerm 
        ? `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=20&client_id=${accessKey}`
        : `https://api.unsplash.com/photos/random?count=20&client_id=${accessKey}`;

      const response = await axios.get(endpoint);
      setPhotos(searchTerm ? response.data.results : response.data);
    } catch (err) {
      setError('Failed to fetch photos. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPhotos(query);
  };

  return (
    
    <div className="App">
      <h1 className='Heading'>Vivek's Image Gallery</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="gallery">
        {photos.map((photo) => (
          <div className="image-card" key={photo.id}>
            <img src={photo.urls.small} alt={photo.alt_description} />
          
          </div>
        ))}
      </div>
    </div>
    
  );
}


export default App
