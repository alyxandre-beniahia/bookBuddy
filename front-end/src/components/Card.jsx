import React, { useState } from "react";
import PropTypes from "prop-types";
import likeImg from "../assets/like-50.png";
import likedImg from "../assets/liked-50.png";
import jamesImg from "../assets/james-baldwin.png";

function Card({ book }) {
    const { _id, title, author, image } = book;
    const [isFavoris, setIsFavoris] = useState(false);

  
    const handleFavorisClick = async () => {
      try {
        let url = `/api/books/book/favorite/${_id}`;
        let method = isFavoris ? "DELETE" : "POST";
  
        await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        setIsFavoris(!isFavoris);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
  
    return (
      <div className="card">
        <div className="card-head">
        <img
          src={isFavoris ? likedImg : likeImg}
          alt="Description de l'image"
          className="favoris"
          onClick={handleFavorisClick}
          style={{ cursor: "pointer" }}
        />
          <img src={`http://localhost:5000/uploads/${image}`} alt={`Cover of ${title}`} className="img-head"/>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{author}</p>
        </div>
      </div>
    );
  }
  
  Card.propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired
  };
  

export default Card;