import { useState, useEffect } from 'react';
import { getResponse } from '../../utils/api';
import PropTypes from 'prop-types';

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
  const [totalImages, setTotalImages] = useState(0);
  const [isModal, setIsModal] = useState(null);
  const [status, setStatus] = useState(STATUS.pending);

  // shouldComponentUpdate(_, nextState) {
  //   if (nextState.multiplierForPage < this.state.multiplierForPage)
  //     return false;
  //   else return true;
  // }

  const fetchImages = useCallback((searchWord, multiplierForPage) => {
    getResponse(searchWord, multiplierForPage)
      .then(response => {
        const { hits: arrImages, total: totalImages } = response.data;
        if (totalImages !== 0) {
          setImages(prevState => [...prevState, ...arrImages]);
          setTotalImages(totalImages);
        } else {
          reset();
        }
      })
      .catch(error => {
        alert(error.message);
      })
      .finally(() => {
        setStatus(STATUS.pending);
      });
  }, []);

  useEffect(() => {
    if (searchWord === '') return;

    console.log('object :>> RENDER');
    setStatus(STATUS.loading);
    reset();

    fetchImages(searchWord);
  }, [fetchImages, searchWord]);

  useEffect(() => {
    if (multiplierForPage === 1) return;
    console.log('multi');
  }, [multiplierForPage]);

  function reset() {
    setMultiplierForPage(1);
    setImages([]);
    setTotalImages(0);
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
                handleModal={handleModal}
              />
            );
          })}
        </ul>
      )}

      {status === STATUS.loading ? (
        <Loader />
      ) : (
        isMoreImages && <ButtonLoad loadMore={loadMore} />
      )}

      {isModal && <Modal largeImage={isModal} closeModal={closeModal} />}
    </Container>
  );
};

ImageGallery.propTypes = {
  searchWord: PropTypes.string,
};

// import { Component } from 'react';
// import { getResponse } from '../../utils/api';
// import PropTypes from 'prop-types';

// import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
// import { Container } from './ImageGallery.styled';
// import { ButtonLoad } from '../Button/Button';
// import { Loader } from '../Loader/Loader';
// import noImg from '../../image/noimage.png';
// import { Modal } from '../Modal/Modal';

// const STATUS = {
//   pending: 'pending',
//   loading: 'loading',
// };

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     multiplierForPage: 1,
//     status: STATUS.pending,
//     totalImages: 0,
//     isModal: null,
//   };

//   shouldComponentUpdate(_, nextState) {
//     if (nextState.multiplierForPage < this.state.multiplierForPage)
//       return false;
//     else return true;
//   }
//   componentDidUpdate(prevProps, prevState) {
//     const { searchWord } = this.props;
//     const prevSearchWord = prevProps.searchWord;
//     const { multiplierForPage } = this.state;
//     const prevMultiplierForPage = prevState.multiplierForPage;

//     if (
//       searchWord !== prevSearchWord ||
//       multiplierForPage !== prevMultiplierForPage
//     ) {
//       this.setState({ status: STATUS.loading });
//     }

//     if (searchWord !== prevSearchWord) {
//       this.reset();
//       this.fetchImages(searchWord);
//     }
//     if (multiplierForPage !== prevMultiplierForPage)
//       this.fetchImages(searchWord, multiplierForPage);
//   }

//   fetchImages = (searchWord, multiplierForPage) => {
//     getResponse(searchWord, multiplierForPage)
//       .then(response => {
//         const { hits: arrImages, total: totalImages } = response.data;
//         if (totalImages !== 0) {
//           this.setState(prevState => {
//             return {
//               images: [...prevState.images, ...arrImages],
//               totalImages,
//             };
//           });
//         } else {
//           this.reset();
//         }
//       })
//       .catch(error => {
//         alert(error.message);
//       })
//       .finally(() => {
//         this.setState({ status: STATUS.pending });
//       });
//   };

//   reset = () => {
//     this.setState({ images: [], multiplierForPage: 1, totalImages: 0 });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       multiplierForPage: prevState.multiplierForPage + 1,
//     }));
//   };

//   handleModal = largeImageURL => {
//     this.setState({ isModal: largeImageURL });
//   };

//   closeModal = () => {
//     this.setState({ isModal: null });
//   };

//   render() {
//     const { status, isModal, multiplierForPage, images, totalImages } =
//       this.state;
//     const isNoImages = images.length === 0 && status === STATUS.pending;
//     const isMoreImages =
//       multiplierForPage > 0 && multiplierForPage * 12 < totalImages;

//     return (
//       <Container>
//         {isNoImages ? (
//           <img src={noImg} alt="no images" />
//         ) : (
//           <ul className="gallery">
//             {images.map(image => {
//               return (
//                 <ImageGalleryItem
//                   image={image}
//                   key={image.id}
//                   handleModal={this.handleModal}
//                 />
//               );
//             })}
//           </ul>
//         )}

//         {status === STATUS.loading ? (
//           <Loader />
//         ) : (
//           isMoreImages && <ButtonLoad loadMore={this.loadMore} />
//         )}

//         {isModal && <Modal largeImage={isModal} closeModal={this.closeModal} />}
//       </Container>
//     );
//   }
// }

// ImageGallery.propTypes = {
//   searchWord: PropTypes.string,
// };
