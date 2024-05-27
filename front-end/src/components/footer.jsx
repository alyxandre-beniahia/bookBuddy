import NavBar from '../components/navbar';
import "../scss/base/reset.scss";

function Footer(){
    return(
        <footer>
            <div className="liens">
                <NavBar />
            </div>
            <div className="container">
                <div className="explore">
                    <h1>Explore Our Gallery : See<br></br> Our Sunscreen In Action</h1>
                </div>
                <div className="phrase">
                    <label htmlFor="email"></label>
                    <input type="email" id="email" name="email" placeholder='Email Adress'></input>
                </div>
                <div className="phrase">
                    <button className="bouton">Back to the Top</button>
            </div>
            </div>
        </footer>
    );
}

export default Footer;