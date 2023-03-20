import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageUL } from './ImageGallery.styled';

export const ImageGallery = () => {
  return (
    <ImageUL className="gallery">
      <ImageGalleryItem></ImageGalleryItem>
    </ImageUL>
  );
};
