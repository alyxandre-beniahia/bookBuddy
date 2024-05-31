import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const Collections = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books/books');
        console.log(res.data)
        setBooks(res.data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      {books.map((book) => (
        <Card book={book} key={book._id} />
      ))}
    </div>
  )
}

export default Collections;