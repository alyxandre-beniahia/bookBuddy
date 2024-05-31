import React from "react";
import PropTypes from "prop-types";


function Card({ book }) {
    const { titre, auteur, pages, categorie, image, lastReadPage, status } = book;
  
    return (
      <div className="card">
        {image && <img src={image} alt={`Cover of ${titre}`} className="card-img-top" />}
        <div className="card-body">
          <h5 className="card-title">Titre: {titre}</h5>
          <p className="card-text">Auteur: {auteur}</p>
          <p className="card-text">Nb de pages: {pages}</p>
          <p className="card-text">Catégorie: {categorie}</p>
          <p className="card-text">Last Read Page: {lastReadPage}</p>
          <p className="card-text">Status: {status}</p>
        </div>
      </div>
    );
  }
  
  Card.propTypes = {
    book: PropTypes.shape({
      titre: PropTypes.string.isRequired,
      auteur: PropTypes.string.isRequired,
      pages: PropTypes.number.isRequired,
      categorie: PropTypes.string.isRequired,
      image: PropTypes.string,
      lastReadPage: PropTypes.number,
      status: PropTypes.string
    }).isRequired
  };
  

export default Card;