import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/game/:id', element: <Game /> },
  { path: '/result', element: <Result /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
