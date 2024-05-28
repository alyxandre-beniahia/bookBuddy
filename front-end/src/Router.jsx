import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Collections from './pages/collections';
import Favorites from './pages/favorites';
import Account from './pages/account';
import { RouteLayout } from './route';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteLayout/>,
    children: [
      {path: '/',element: <Home/>},
      {path: '/collections',element: <Collections/>},
      {path: '/favorites',element: <Favorites/>},
      {path: '/account',element: <Account/>},
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;