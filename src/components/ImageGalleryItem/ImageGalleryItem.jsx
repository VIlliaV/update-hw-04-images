import { ImageLi } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image: { webformatURL, tags } }) => {
  return (
    <ImageLi className="gallery-item">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </ImageLi>
  );
};
