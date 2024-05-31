import React, { useState } from 'react';
import { useNavigate } from'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log(formData);
      const res = await axios.post('http://localhost:3000/api/users/login', formData);
      const {token} = res.data;
  
      if (token) {
        alert('Vous êtes connecté !');
        localStorage.setItem('token', token);
        navigate('/profilePage');
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Connexion</h4>
            </div>
            <div className="card-body text-center">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Courriel</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block m-4 ">
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
