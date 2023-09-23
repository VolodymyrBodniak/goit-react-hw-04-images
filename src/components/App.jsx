import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import PixabayAPI from 'api/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from 'App.module.css';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const pixabayAPI = new PixabayAPI();

export const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    pixabayAPI.resetPage();
    pixabayAPI.query = query;
    setHits([]);
    setShowButton(false);
    setLoading(true);

    pixabayAPI
      .fetchImages()
      .then(({ data: { hits, totalHits } }) => {
        if (hits.length < 1) {
          Notiflix.Notify.error('Found nothing on your request');
          setLoading(false);
          return;
        }
        Notiflix.Notify.success(`On your request found ${totalHits} pictures`);
        if (hits.length >= pixabayAPI.per_page) {
          setShowButton(true);
        }
        pixabayAPI.changePage();
        setHits(hits);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [query]);

  const onSubmit = query => {
    setQuery(query);
  };

  const loadMore = () => {
    setShowButton(false);
    setLoading(true);
    pixabayAPI
      .fetchImages()
      .then(({ data: { hits } }) => {
        if (hits.length < pixabayAPI.per_page) {
          Notiflix.Notify.warning('end...');
          setShowButton(false);
        }
        setHits(prev => [...prev, ...hits]);
        setShowButton(true);
        setLoading(false);
        pixabayAPI.changePage();
      })
      .catch(error => console.log(error));
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery data={hits} />
      <></>
      {showButton && <Button loadMore={loadMore} />}
      {loading && <Loader />}
    </div>
  );
};
