import { Component } from 'react';
import PropTypes from 'prop-types';

import { ContainerModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyESC);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyESC);
  }

  handleClick = e => {
    if (e.target.nodeName === 'DIV') this.props.closeModal();
  };
  handleKeyESC = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  render() {
    const { largeImage } = this.props;
    return (
      <ContainerModal className="overlay" onClick={this.handleClick}>
        <div className="modal">
          <img src={largeImage} alt="bigger" />
        </div>
      </ContainerModal>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
