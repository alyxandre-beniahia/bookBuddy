import { Link } from 'react-router-dom';
import './styles.css';

function Home(){
    return (
        <div>
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

            <footer>
                <div class="space">
                <div class="phrase2">
                <h1>Explore Our Gallery : See<br></br> Our Sunscreen In Action</h1>
                </div>
                <div class="phrase">
                <label for="email"></label>
                <input type="email" id="email" name="email" placeholder='Email Adress'></input>
                </div>
                <div class="phrase">
                <button class="bouton">Back to the Top</button>
                </div>
                </div>
                <div class="liens">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/form">Formulaire</Link>
                    <Link to="/collections">Collections</Link>
                    <Link to="/favorites">Favoris</Link>
                </nav>
                </div>
            </footer>
        </div>
    );
}

export default Home;