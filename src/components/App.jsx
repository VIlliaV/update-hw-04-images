import { Component } from 'react';
import { getResponse } from 'utils/api';

import { Container } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    multiplierForPage: 1,
    searchword: '',
    status: 'pending',
  };
  reset = () => {
    this.setState({ images: [], multiplierForPage: 1, searchword: '' });
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchword !== prevState.searchword ||
      this.state.multiplierForPage !== prevState.multiplierForPage
    ) {
      this.setState({ status: 'loading' });
      getResponse(this.state.searchword, this.state.multiplierForPage)
        .then(response => {
          if (response.data.total !== 0) {
            this.setState({ images: response.data.hits });
            this.setState({ status: 'pending' });
          } else {
            this.reset();
            alert('No images');
          }
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

  getImages = (searchword, multiplierForPage) => {};

  onSubmit = searchword => {
    this.setState({ searchword });
    this.setState({ multiplierForPage: 2 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      multiplierForPage: prevState.multiplierForPage + 1,
    }));
  };

  render() {
    const loadMore = this.state.multiplierForPage;
    const status = this.state.status;
    console.log('🚀 ~ status:', status);

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {status === 'loading' ? (
          <Loader />
        ) : (
          <ImageGallery images={this.state.images}></ImageGallery>
        )}

        {loadMore !== 1 && <Button loadMore={this.loadMore}></Button>}
      </Container>
    );
  }
}
