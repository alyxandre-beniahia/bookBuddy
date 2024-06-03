import { Link } from 'react-router-dom';
import '../assets/user.png'

function Navbar(){
    return(
            <nav className='navBar'>
                <div className='divLeft'>
                    <h1>Bookbuddy</h1>
                </div>
                <div className='divCenter'>
                <Link to="/">Accueil</Link>
                <Link to="/formulaire">Formulaire</Link>
                <Link to="/collections">Collections</Link>
                <Link to="/favorites">Favoris</Link>
                </div>
                <div className='divRight'>
                    <Link to="/login"><div className='logo'></div></Link>
                    <Link to="/login"><div className='logoTwo'></div></Link>
                </div>
            </nav>
    );
}

export default Navbar;