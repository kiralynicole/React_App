import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Film } from './FilmTypes';

export function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [characters, setCharacters] = useState<Array<{ name: string }> | null>(
    null
  );

  useEffect(() => {
    async function getFilm() {
      const data = await fetch(`http://localhost:3000/films/${id}`).then(
        (res) => res.json()
      );
      setFilm(data);
      const chPromises = [];
      for (const ch of data.characters) {
        chPromises.push(
          fetch(`http://localhost:3000/characters/${ch}`).then((res) =>
            res.json()
          )
        );
      }
      const chArray = await Promise.all<{ name: string }>(chPromises);
      setCharacters(chArray);
    }
    getFilm();
  }, [id]);
  return (
    <>
      <h2>{film?.title}</h2>
      <h3>Characters</h3>
      <ul>
        {characters?.map((ch) => (
          <li key={ch.name}>{ch.name}</li>
        ))}
      </ul>
    </>
  );
}
