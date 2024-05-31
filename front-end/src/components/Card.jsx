import React from "react";

function Card ({book}){
    const {title, author, pages, category} = book;
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Titre: {title}</h5>
                <p className="card-text">Auteur: {author}</p>
                <p className="card-text">Nb de pages: {pages}</p>
                <p className="card-text">Catégorie: {category}</p>
            </div>
        </div>
    );
}

export default Card;