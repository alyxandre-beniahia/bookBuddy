import React, { useState, useEffect, useCallback} from 'react';
import '../scss/main.css';
import Card from '../components/Card';

const Favorites = () => {
  const [books, setBooks] = useState([]);

  const fetchApiBook = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/books/books');
      const data = await response.json();
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
  }, []);

  useEffect(() => {
    fetchApiBook();
  }, [fetchApiBook]);

  return (

    <section>

      <div className='headFavorites'>
        <button>Ajouter une livre</button>
        <h1>Favoris</h1>
        <button>Recherche</button>
      </div>

      <div className='wrapperCard'>
        {books.map((book) => (
          <Card key={book._id} book={book} />
        ))}
      </div>

    </section>
  )
}

export default Favorites;