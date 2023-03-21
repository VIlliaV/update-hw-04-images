import PropTypes from 'prop-types';

import { ImageLi } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, tags, largeImageURL },
  handleModal,
}) => {
  return (
    <ImageLi
      className="gallery-item"
      onClick={() => handleModal(largeImageURL)}
    >
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </ImageLi>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  handleModal: PropTypes.func.isRequired,
};
