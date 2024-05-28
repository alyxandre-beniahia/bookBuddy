import '../scss/main.scss'
import React, { useState } from 'react';

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookData = {
      title,
      author,
      pages,
      category
    };
    console.log(bookData);

const token = localStorage.getItem('jwtToken');

const fetchApiMovie = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/books/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData),
        });

        if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du livre');
        }

        const result = await response.json();
        console.log('Livre ajouté avec succès:', result);
    } catch (error) {
        console.error('Erreur:', error);
    }
    };
};

    return (
        <>
        <div className='headerForm'>
            <div className='divHeadLeft'>
                <h2>Ajouter votre livre Collection en toute sécurité</h2>
            </div>
            <div className='divHeadCenter'>
                <h2>Formulaire d’ajout De livre :</h2>
            </div>
            <div className='divHeadRight'>
                <h2>Rentrer tout les champs de formulaire pour pouvoir envoyer confirmer l’envoie</h2>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Titre :</label>
            <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            />
        </div>
        <div>
            <label htmlFor="author">Auteur :</label>
            <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
            />
        </div>
        <div>
            <label htmlFor="pages">Pages :</label>
            <input
            type="number"
            id="pages"
            value={pages}
            onChange={(event) => setPages(event.target.value)}
            required
            />
        </div>
        <div>
            <label htmlFor="category">Catégorie :</label>
            <input
            type="text"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
            />
        </div>
        <button type="submit">Soumettre</button>
        </form>
        </>
    )
}

export default Home;