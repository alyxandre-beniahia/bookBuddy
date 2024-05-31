import '../scss/main.scss';
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState(null);
  const [books, setBooks] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Titre:', title);
    console.log('Auteur:', author);
    console.log('Pages:', pages);
    console.log('Catégorie:', category);
    console.log('Image:', img);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter pour ajouter un livre.');
      return;
    }

    console.log('Token:', token);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('pages', parseInt(pages, 10));
    formData.append('category', category);
    formData.append('image', img);
    formData.append('lastReadPage', 0);
    formData.append('status', 'à lire');

    try {
      const response = await fetch('http://localhost:3000/api/books/addBook', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const newBook = await response.json();
        setBooks([...books, newBook]);
        console.log('Book added successfully:', newBook);
      } else {
        const errorText = await response.text();
        console.error('Erreur lors de l\'ajout du livre', response.status, errorText);
        alert('Erreur lors de l\'ajout du livre: ' + errorText);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
      alert('Une erreur s\'est produite: ' + error.message);
    }
  };

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
      <section>
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

        <div className='formHome'>
          <form className='inputTextWrapper' onSubmit={handleSubmit}>
            <div className='divInput'>
              <input
                type="text"
                id="title"
                placeholder='What is the Title ?'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div className='divInput'>
              <input
                type="text"
                id="author"
                placeholder='What is the Auteur ?'
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                required
              />
            </div>
            <div className='divInput'>
              <input
                type="number"
                id="pages"
                placeholder='How Many Pages Are There ?'
                value={pages}
                onChange={(event) => setPages(event.target.value)}
                required
              />
            </div>
            <div className='divInput'>
              <input
                type="text"
                id="category"
                placeholder='What is the Catagorie ?'
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              />
            </div>
            <button type="submit">Soumettre</button>
          </form>

          <div className='uploadImgWrapper'>
            <div className='divBackground'>
              <div className='imgUpload'></div>
              <input 
                type="file" 
                id="fileInput" 
                className="inputFile" 
                onChange={(event) => setImg(event.target.files[0])}
                required
                style={{ display: 'none' }}
              />
              <label htmlFor="fileInput" className="custom-file-upload">
                Add File
              </label>
            </div>
          </div>
        </div>
      </section>

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

export default Home;