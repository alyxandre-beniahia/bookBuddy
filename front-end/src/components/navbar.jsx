import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <header>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/form">Formulaire</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/favorites">Favoris</Link>
            </nav>
            <img src="" alt="" />
        </header>
    );
}

export default Navbar;