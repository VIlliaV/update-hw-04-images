// import { useState } from 'react';

import { Container } from './App.styled';
import { Context } from './Context';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  return (
    <Context>
      <Container>
        <Searchbar />
        <ImageGallery />
      </Container>
    </Context>
  );
};
