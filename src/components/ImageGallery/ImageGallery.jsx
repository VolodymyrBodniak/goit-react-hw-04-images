import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data }) => {
  return (
    <ul className={css.gallery}>
      {data.map(item => (
        <ImageGalleryItem key={item.id} data={item} />
      ))}
    </ul>
  );
};
