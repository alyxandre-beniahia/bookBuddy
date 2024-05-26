import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <header>
            <h1>BookBuddy</h1>
            <nav>
            <Link to="/">Accueil</Link>
            <Link to="/form">Formulaire</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/favorites">Favoris</Link>
            <Link to="/account">Account</Link>
            <Link to="/collections">Collections</Link>
            </nav>
            <img src="" alt="" />
        </header>
    );
}

export default Navbar;