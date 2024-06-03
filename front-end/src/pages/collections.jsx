import React, { useState, useEffect, useCallback} from 'react';
import '../scss/main.css';
import Card from '../components/Card';

const Collections = () => {
  const [books, setBooks] = useState([]);

  const fetchApiBook = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books/books');
      const data = await response.json();
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

      <div className='headCollection'>
        <button>Ajouter une livre</button>
        <h1>Collections</h1>
        <button>Recherche</button>
      </div>

      <div className='wrapperCard'>
        {books.map((book) => (
          console.log(book),
          <Card key={book._id} book={book} />
        ))}
      </div>

    </section>
  )
}

export default Collections;