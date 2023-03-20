import { Container } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  return (
    <Container>
      <Searchbar />
      <ImageGallery></ImageGallery>
    </Container>
  );
};
