import { useState } from 'react';

import { Container } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchWord, setSearchWord] = useState('');

  const onSubmit = searchWord => {
    setSearchWord(searchWord);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery searchWord={searchWord} />
    </Container>
  );
};
