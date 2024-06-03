import React, { useState } from "react";
import PropTypes from "prop-types";
import likeImg from "../assets/like-50.png";
import likedImg from "../assets/liked-50.png";
import jamesImg from "../assets/james-baldwin.png";

function Card({ book }) {
    const { _id, titre, auteur } = book;
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
          <img src={jamesImg} alt={`Cover of ${titre}`} className="img-head"/>
        </div>
        <div className="card-body">
          <h5 className="card-title">{titre}</h5>
          <p className="card-text">{auteur}</p>
        </div>
      </div>
    );
  }
  
  Card.propTypes = {
    book: PropTypes.shape({
      titre: PropTypes.string.isRequired,
      auteur: PropTypes.string.isRequired,
    }).isRequired
  };
  

export default Card;