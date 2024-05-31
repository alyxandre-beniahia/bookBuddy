import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const Collections = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (search === '') {
            const res = await axios.get('http://localhost:5000/api/books/books');
            setBooks(res.data);
        }else {
            const res = await axios.get(`http://localhost:5000/api/books/search?query=${search}`);
            setBooks(res.data);
        }
        
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    fetchBooks();
  }, [search]);



  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={handleSearch}
      />
      {books.map((book) => (
        <Card book={book} key={book._id} />
      ))}
    </div>
  );
};

export default Collections;
