import { Component } from 'react';
import { getResponse } from '../../utils/api';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Container } from './ImageGallery.styled';
import { ButtonLoad } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import noImg from '../../image/noimage.png';
import { Modal } from '../Modal/Modal';

const STATUS = {
  pending: 'pending',
  loading: 'loading',
};

export class ImageGallery extends Component {
  state = {
    images: [],
    multiplierForPage: 1,
    status: STATUS.pending,
    totalImages: 0,
    isModal: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchWord } = this.props;
    const prevSearchWord = prevProps.searchWord;
    const { multiplierForPage } = this.state;
    const prevMultiplierForPage = prevState.multiplierForPage;

    if (searchWord !== prevSearchWord) this.reset();
    if (
      searchWord !== prevSearchWord ||
      multiplierForPage !== prevMultiplierForPage
    ) {
      this.setState({ status: STATUS.loading });
      // setTimeout  - для тесту, чи все працює
      setTimeout(() => {
        getResponse(searchWord, multiplierForPage)
          .then(response => {
            const { hits: arrImages, total: totalImages } = response.data;
            if (totalImages !== 0) {
              this.setState({ images: arrImages, totalImages });
            } else {
              this.reset();
            }
          })
          .catch(error => {
            alert(error.message);
          })
          .finally(() => {
            this.setState({ status: STATUS.pending });
          });
      }, 1000);
    }
  }

  reset = () => {
    this.setState({ images: [], multiplierForPage: 1, totalImages: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      multiplierForPage: prevState.multiplierForPage + 1,
    }));
  };
  handleModal = largeImageURL => {
    this.setState({ isModal: largeImageURL });
  };

  closeModal = () => {
    this.setState({ isModal: null });
  };

  render() {
    const { status, isModal, multiplierForPage, images, totalImages } =
      this.state;
    const isNoImages = images.length === 0 && status === STATUS.pending;
    const isMoreImages =
      multiplierForPage > 0 && multiplierForPage * 12 < totalImages;
    return (
      <Container>
        {isNoImages ? (
          <img src={noImg} alt="no images" />
        ) : (
          <ul className="gallery">
            {images.map(image => {
              return (
                <ImageGalleryItem
                  image={image}
                  key={image.id}
                  handleModal={this.handleModal}
                />
              );
            })}
          </ul>
        )}

        {status === STATUS.loading ? (
          <Loader />
        ) : (
          isMoreImages && <ButtonLoad loadMore={this.loadMore} />
        )}
        {isModal && <Modal largeImage={isModal} closeModal={this.closeModal} />}
      </Container>
    );
  }
}

ImageGallery.propTypes = {
  searchWord: PropTypes.string,
};
