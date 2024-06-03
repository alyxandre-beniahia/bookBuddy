import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('à lire');
  const [pages, setPages] = useState(0);
  const [category, setCategory] = useState('');
  const [lastReadPage, setLastReadPage] = useState(0);
  const [image, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('status', status);
    formData.append('pages', pages);
    formData.append('category', category);
    formData.append('lastReadPage', lastReadPage);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/books/addBook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className='headerForm'>
        {/* ... */}
      </div>

      <div className='formHome'>
        <form className='inputTextWrapper' onSubmit={handleSubmit}>
          <div className='divInput'>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder='Enter the book title'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className='divInput'>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              className="form-control"
              placeholder='Enter the author name'
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
          </div>
          <div className='divInput'>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="form-control"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="à lire">À lire</option>
              <option value="en cours de lecture">En cours de lecture</option>
              <option value="lu">Lu</option>
            </select>
          </div>
          <div className='divInput'>
            <label htmlFor="pages">Pages</label>
            <input
              type="number"
              id="pages"
              className="form-control"
              placeholder='Enter the number of pages'
              value={pages}
              onChange={(event) => setPages(event.target.value)}
              required
            />
          </div>
          <div className='divInput'>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              className="form-control"
              placeholder='Enter the book category'
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </div>
          <div className='divInput'>
            <label htmlFor="lastReadPage">Last Read Page</label>
            <input
              type="number"
              id="lastReadPage"
              className="form-control"
              placeholder='Enter the last read page'
              value={lastReadPage}
              onChange={(event) => setLastReadPage(event.target.value)}
            />
          </div>
          <div className='divInput'>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className="inputFile"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">Soumettre</button>
        </form>

        <div className='uploadImgWrapper'>
          <div className='divBackground'>
            <div className='imgUpload'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;