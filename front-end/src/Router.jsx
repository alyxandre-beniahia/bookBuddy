import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Collections from './pages/collections';
import Favorites from './pages/favorites';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import './scss/main.scss'

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/collections',
    element: <Collections/>
  },
  {
    path: '/favorites',
    element: <Favorites/>
  },
  {
    path: '/profilePage',
    element: <ProfilePage/>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;