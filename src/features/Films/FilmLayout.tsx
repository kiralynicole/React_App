import { Route, Routes } from 'react-router-dom';
import { FilmList } from './FilmList';
import { FilmDetails } from './FilmDetails';

export function FilmLayout() {
  return (
    <>
      <h1>Films</h1>
      <Routes>
        <Route index element={<FilmList />} />
        <Route path=":id" element={<FilmDetails />} />
      </Routes>
    </>
  );
}
