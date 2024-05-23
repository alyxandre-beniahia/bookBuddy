import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Collections from './pages/collections';
import Favorites from './pages/favorites';
import Account from './pages/account';

const router = createBrowserRouter([
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
    path: '/account',
    element: <Account/>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;