import '../scss/main.scss'
import React, { useState } from 'react';
// import Card from '../components/card.jsx'

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookData = {
      title,
      author,
      pages,
      category,
      img
    };
    console.log(bookData);

const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }

  fetchApiBook(bookData, token);
};

const fetchApiBook = async (bookData, token) => {
  try {
    const response = await fetch('http://localhost:3000/api/books/addBook', {
      method: 'POST',
      headers: {
        'Authorization': token,
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
              <div className='divInput' >
                  <input
                  type="text"
                  id="title"
                  placeholder='What is the Title ?'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  />
              </div>
              <div className='divInput' >
                  <input
                  type="text"
                  id="author"
                  placeholder='What is the Auteur ?'
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  required
                  />
              </div>
              <div className='divInput' >
                  <input
                  type="number"
                  id="pages"
                  placeholder='How Many Pages Are There ?'
                  value={pages}
                  onChange={(event) => setPages(event.target.value)}
                  required
                  />
              </div>
              <div className='divInput' >
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
                  value={img}
                  onChange={(event) => setImg(event.target.value)}
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
            {/* <Card/>
            <Card/>
            <Card/>
            <Card/> */}
          </div>

          <div className='exploreOurGallery'>
            <h2>Explore our Gallery : See our sunscreen in action</h2>
            <p>Explore your sunscren in action</p>
          </div>
        </section>
        </>
    )
}

export default Home;