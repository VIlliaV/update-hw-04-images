import { Component } from 'react';

import { Container } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';


export class App extends Component {
  state = {
    searchWord: '',
  };

  onSubmit = searchWord => {
    this.setState({ searchWord });
  };

  render() {
    const { searchWord } = this.state
     return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} /> 
  <ImageGallery searchWord={searchWord}/>
          
</Container>
    );
  }
}
