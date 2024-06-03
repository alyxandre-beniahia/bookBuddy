import NavbarFooter from '../components/navbarFooter';

function Footer(){
    return(
        <footer>
            <div className="liens">
                <NavbarFooter />
            </div>
            <div className="space">
                <div className="phrase2">
                    <h1>Explore Our Gallery : See Our Sunscreen In Action</h1>
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