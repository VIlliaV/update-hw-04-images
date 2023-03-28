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
  const [multiplierForPage, setMultiplierForPage] = useState(1);
  const [isModal, setIsModal] = useState(null);
  const [status, setStatus] = useState(STATUS.pending);

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
        } else {
          reset();
        }
      })
      .catch(error => {
        toast.error(`${error.message}`);
      })
      .finally(() => {
        setStatus(STATUS.pending);
      });
  }, []);

  useEffect(() => {

    if (searchWord === '') return;
    reset();
    fetchImages(searchWord, 1);
  }, [fetchImages, searchWord]);

  useEffect(() => {
    console.log('1 render Mult', multiplierForPage);
    if (multiplierForPage === 1) return;
    console.log('11111 render Mult', multiplierForPage);
  }, [multiplierForPage]);

  function reset() {
    isMoreImages.current = false;
    isNoImages.current = true;

    setMultiplierForPage(1);
    setImages([]);
  }

  const loadMore = () => {
    const nextMulti = multiplierForPage + 1;
    setMultiplierForPage(nextMulti);
    fetchImages(searchWord, nextMulti);
  };

  const handleModal = largeImageURL => {
    setIsModal(largeImageURL);
  };

  const closeModal = () => {
    setIsModal(null);
  };

  return (
    <Container>
      {console.log('Render')}
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
