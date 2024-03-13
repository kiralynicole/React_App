import { Link } from 'react-router-dom';
import { Film } from './FilmTypes';

import styles from './Film.module.css';

export function FilmCard({ film }: { film: Film }) {
  return (
    <article className={styles.card}>
      <Link to={film.id.toString()}>
        <img src={film.poster} alt={`Poster for ${film.title}`} />
        <h1>{film.title}</h1>
      </Link>
    </article>
  );
}
