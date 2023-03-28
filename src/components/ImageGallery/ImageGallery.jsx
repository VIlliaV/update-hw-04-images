import { useState, useEffect, useRef } from 'react';
import { getResponse } from '../../utils/api';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Container } from './ImageGallery.styled';
import { ButtonLoad } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import noImg from '../../image/noimage.png';
import { Modal } from '../Modal/Modal';
import { useCallback } from 'react';

const STATUS = {
  pending: 'pending',
  loading: 'loading',
};

export const ImageGallery = ({ searchWord }) => {
  const [images, setImages] = useState([]);
  const [isModal, setIsModal] = useState(null);
  const [status, setStatus] = useState(STATUS.pending);

  const multiplierForPage = useRef(1);
  const isNoImages = useRef(true);
  const isMoreImages = useRef(false);

  const fetchImages = useCallback((searchWord, multiplier) => {
    setStatus(STATUS.loading);
    getResponse(searchWord, multiplier)
      .then(response => {
        const { hits: arrImages, total: totalImages } = response.data;
        if (totalImages !== 0) {
          if (totalImages > 12 && multiplier * 12 < totalImages) {
            isMoreImages.current = true;
          }
          isNoImages.current = false;
          setImages(prevState => [...prevState, ...arrImages]);
        } else reset();
      })
      .catch(error => {
        toast.error(`${error.message}`);
      })
      .finally(() => {
        setStatus(STATUS.pending);
      });
  }, []);

  useEffect(() => {
    reset();
    if (searchWord === '') return;
    fetchImages(searchWord, 1);
  }, [fetchImages, searchWord]);

  const reset = () => {
    isMoreImages.current = false;
    isNoImages.current = true;
    multiplierForPage.current = 1;
    setImages([]);
  };

  const loadMore = () => {
    multiplierForPage.current += 1;
    fetchImages(searchWord, multiplierForPage.current);
  };

  const handleModal = largeImageURL => {
    setIsModal(largeImageURL);
  };

  const closeModal = () => {
    setIsModal(null);
  };

  return (
    <Container>
      <Toaster />
      {isNoImages.current ? (
        <img src={noImg} alt="no images" />
      ) : (
        <ul className="gallery">
          {images.map(image => {
            return (
              <ImageGalleryItem
                image={image}
                key={image.id}
                handleModal={handleModal}
              />
            );
          })}
        </ul>
      )}

      {status === STATUS.loading ? (
        <Loader />
      ) : (
        isMoreImages.current && <ButtonLoad loadMore={loadMore} />
      )}

      {isModal && <Modal largeImage={isModal} closeModal={closeModal} />}
    </Container>
  );
};

ImageGallery.propTypes = {
  searchWord: PropTypes.string,
};
