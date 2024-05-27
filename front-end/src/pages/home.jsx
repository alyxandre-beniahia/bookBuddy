import NavBar from '../components/navbar';
import Footer from '../components/footer';
import '../scss/main.scss'

function Home(){
    return(
    <body>
        <header>
            <NavBar/>
            <h1>Home</h1>
        </header>

        <Footer />
    </body>
    );
}

export default Home;