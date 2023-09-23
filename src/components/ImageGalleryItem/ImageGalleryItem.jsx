import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import { useState } from 'react';

export const ImageGalleryItem = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={data.webformatURL}
        className={css.ImageGalleryItemImage}
        onClick={toggleModal}
        alt=""
      />
      {showModal && (
        <Modal
          largeImageURL={data.largeImageURL}
          toggleModal={toggleModal}
        ></Modal>
      )}
    </li>
  );
};

export default ImageGalleryItem;
