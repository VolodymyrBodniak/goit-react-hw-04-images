import { useState } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import { GrSearch } from 'react-icons/gr';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearch = ({ target }) => {
    setQuery(target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return Notiflix.Notify.failure('Please enter valid value...');
    }
    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}></span>
          <GrSearch size={25} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleSearch}
        />
      </form>
    </header>
  );
};
