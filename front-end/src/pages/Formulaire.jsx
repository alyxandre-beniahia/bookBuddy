import React, { useState } from 'react';

    const Form = () => {
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [status, setStatus] = useState('à lire');
        const [pages, setPages] = useState(0);
        const [category, setCategory] = useState('');
        const [lastReadPage, setLastReadPage] = useState(0);
        const [image, setImg] = useState('');
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          
          const bookData = {
            title,
            author,
            status,
            pages,
            category,
            lastReadPage,
            image,
          };
      
          const token = localStorage.getItem('token');
      
          if (!token) {
            console.error('No token found. Please log in.');
            return;
          }
    
          console.log(token);
      
          try {
            const response = await fetch('http://localhost:3000/api/books/addBook', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(bookData),
            });
      
            if (response.ok) {
              const result = await response.json();
              console.log('Book added successfully:', result);
            } else {
              console.error('Failed to add book:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };

    return(
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
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="à lire">À lire</option>
              <option value="en cours de lecture">En cours de lecture</option>
              <option value="lu">Lu</option>
            </select>

            <input type="number" value={lastReadPage} onChange={(e) => setLastReadPage(e.target.value)} placeholder="Last Read Page" />

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
    );
}

export default Form;