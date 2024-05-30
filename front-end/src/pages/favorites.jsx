import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Favorites() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchFavBooks();
  }, []);

  const fetchFavBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: {
          'x-auth-token': token
        }
      });
      const favoriteBooksId = res.data.favoriteBooks;
      const favBooks = await Promise.all(favoriteBooksId.map(async (id) => {
        const res = await axios.get(`http://localhost:5000/api/books/book/${id}`);
        return res.data;
      }));
      setBooks(favBooks);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      {books.map((book) => (
        <Card book={book} key={book._id} />
      ))}
    </div>
  );
}
export default Favorites;