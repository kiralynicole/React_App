import { useEffect, useState } from 'react';
import { FilmCard } from './FilmCard';
import { Film } from './FilmTypes';

import styles from './Film.module.css';

export function FilmList() {
  const [films, setFilms] = useState<Film[] | null>(null);
  useEffect(() => {
    fetch('http://localhost:3000/films')
      .then((res) => res.json())
      .then((data) => setFilms(data));
  });

  return (
    <section className={styles.list}>
      {films?.map((film: Film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </section>
  );
}
