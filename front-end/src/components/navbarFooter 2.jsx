import { Link } from 'react-router-dom';

function Navbar(){
    return(
            <nav className='navBarFooter'>
            <Link to="/">Accueil</Link>
            <Link to="/form">Formulaire</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/favorites">Favoris</Link>
            </nav>
    );
}

export default Navbar;