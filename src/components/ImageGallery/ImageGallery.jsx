import { Component } from 'react';
import { getResponse } from '../../utils/api';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Container } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import noImg from '../../noimage.png'

export class ImageGallery extends Component {
state = {
    images: [],
    multiplierForPage: 1,
  status: 'pending',
    totalImages: 0
  };

  reset = () => {
    this.setState({ images: [], multiplierForPage: 1, totalImages: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      multiplierForPage: prevState.multiplierForPage + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchWord !== prevProps.searchWord) this.reset();
    if (
      this.props.searchWord !== prevProps.searchWord
      || this.state.multiplierForPage !== prevState.multiplierForPage
    ) {
 
      this.setState({ status: 'loading' });
 setTimeout(()=>{ getResponse(this.props.searchWord, this.state.multiplierForPage)
        .then(response => {
          if (response.data.total !== 0) {
            this.setState({ images: response.data.hits });
            this.setState({totalImages: response.data.total})
           
          } else {
            this.reset();
            
          }
        })
        .catch(error => {
          alert(error.message);
        }).finally(() => {
          this.setState({ status: 'pending' })
          console.log('final')
         
        }) },1500)
        ;
      
    }
  }

  render() {
    const isloadMore = this.state.multiplierForPage;
    const status = this.state.status;
    console.log(status)
    console.log(noImg)
    return (
      <Container>

         
{this.state.images.length === 0 && status==='pending' ? <img src={noImg}/> : 
       <ul className="gallery"> { this.state.images.map(image => {
          return <ImageGalleryItem image={image} key={image.id}/>;
        })} </ul>}
       
        
     
        {status === 'loading' ? (
          <Loader />
        ) : (isloadMore > 0 && isloadMore * 12 < this.state.totalImages) && <Button loadMore={this.loadMore}></Button>}
       
      </Container>
      
    );
  };
}
