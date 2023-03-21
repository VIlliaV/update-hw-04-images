import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageUL } from './ImageGallery.styled';

export const ImageGallery = ({ images, children }) => {
  return (
    <ImageUL className="gallery">
      {images.map(image => {
        return <ImageGalleryItem image={image} key={image.id} />;
      })}
    </ImageUL>
  );
};
