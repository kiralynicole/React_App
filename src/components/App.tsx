import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Counter } from '../features/Counter/Counter';
import { Weather } from '../features/Weather/Weather';
import { Auth } from '../features/Auth/Auth';
import { Nav } from './Nav/Nav';
import { AuthContextProvider } from '../features/Auth/AuthContext';
import { FilmLayout } from '../features/Films/FilmLayout';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Todos } from '../features/Todos/Todos';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="counter" element={<Counter initialCount={6} />} />
          <Route path="todos" element={<Todos />} />
          <Route path="weather" element={<Weather />} />
          <Route path="films/*" element={<FilmLayout />} />
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

//default export
export default App;

// named export
export { App };
