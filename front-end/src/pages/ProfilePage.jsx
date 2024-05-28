import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '../components/withAuth';
import { useNavigate } from'react-router-dom';
import book from '../../../back-end/models/book';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: '',
    favoriteBooks: [],
    id: ''
  });

  const navigate = useNavigate()

  const { username, email, password, newPassword, id } = formData;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const res = await axios.get('http://localhost:5000/api/me', {
          headers: {
            'x-auth-token': token
          }
        });
        setFormData({ ...formData, username: res.data.username, email: res.data.email, favoriteBooks: res.data.favoriteBooks, id: res.data._id });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await axios.put('http://localhost:5000/api/users/', formData, {
        headers: {
          'x-auth-token': token
        }
      });

      alert('Profile updated successfully:');
    } catch (error) {
      alert('Error updating profile, wrong password:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem('token');
  
      await axios.delete('http://localhost:5000/api/me', {
        headers: {
          'x-auth-token': token,
        },
      });

      alert('Profile deleted successfully');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };
  

  return (
    <div className="container">
      <h1 className="mb-4">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Current Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your current password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
          />
        </div>
        <div className="mb-3">
          <h3>Mes Favoris</h3>
          <div className="fav__container">
            {formData.favoriteBooks.map((book) => (
              <div className="fav__item" key={book._id}>
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <p>{book.genre}</p>
                <button onClick={() => handleDeleteBookFromFav(book._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
        
      </form>
      <button onClick={handleDeleteProfile} className="btn btn-danger">
        Delete Profile
      </button>
    </div>
  );
};

export default withAuth(ProfilePage);
