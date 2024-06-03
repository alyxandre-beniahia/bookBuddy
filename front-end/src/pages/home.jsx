import React, { useState, useEffect, useCallback } from 'react';
import '../scss/main.css';
import Card from '../components/Card';

  const AddBookForm = () => {
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
    <>
      <section className='bookList'>
        <div className='headBookList'>
          <div className='divHeadLeft'>
            <h2>Votre liste de livre : Profiter de votre moment</h2>
          </div>
          <div className='divHeadCenter'>
            <h2>Votre liste de livre : Profiter de votre moment</h2>
          </div>
          <button className='custom-file-upload'>View all</button>
        </div>

        <div className='wrapperCard'>
          {books.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>

        <div className='exploreOurGallery'>
          <h2>Explore our Gallery : See our sunscreen in action</h2>
          <p>Explore your sunscreen in action</p>
        </div>
      </section>
    </>
  )
}

export default AddBookForm;