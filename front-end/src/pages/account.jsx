import { Link } from 'react-router-dom';

function Account(){
    return(
        <header>
            <nav>
            <Link to="/">Accueil</Link>
            <Link to="/form">Formulaire</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/favorites">Favoris</Link>
            <Link to="/account">Account</Link>
            <Link to="/collections">Collections</Link>
            </nav>
            <h1>Account</h1>
        </header>
    );
}

export default Account;