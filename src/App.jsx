import './App.css';
import Maze from './Maze';
import Map from './Map.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';

// Créer le routeur avec les routes configurées
const router = createBrowserRouter([

  {
    path : '/',
    element :<Home/>,
  },

  {
    path: "/maze", // Route pour le composant Maze
    element: <Maze />,
  },
  {
    path: "/map", // Route pour le composant Map
    element: <Map />,
  },
]);

function App() {
  return (
    // Utilisation de RouterProvider pour rendre les routes
    <RouterProvider router={router} />
  );
}

export default App;
