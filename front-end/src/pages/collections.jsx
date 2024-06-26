import React from 'react';
import Card from '../components/card.jsx'
import { useState } from 'react';

function Collections(){
    const [books, setBooks] = useState('');
    //ICI fonction pour fetch les livres
    async function getBooks() {
        const data = await fetch ('http://localhost:3000/api/books/books');
        const books = data.json();
        console.log(books);
    }
    getBooks();

    return(
        <main>
            <h1 className="title">All Collections</h1>
            <div className='container__card'>
            <Card data="books" />
            <Card />
            <Card />
            <Card />
            </div>
            <div className='container__card'>
            <Card />
            <Card />
            <Card />
            <Card />
            </div>
            <div className='container__card'>
            <Card />
            <Card />
            <Card />
            <Card />
            </div>
            
        </main>
    );
}

export default Collections;