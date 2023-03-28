import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ContainerModal } from './Modal.styled';

export const Modal = ({ closeModal, largeImage }) => {
  const handleKeyESC = useCallback(
    ({ code }) => {
      if (code === 'Escape') closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyESC);
  }, [handleKeyESC]);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyESC);
    };
  }, [handleKeyESC]);

  const handleClick = ({ target: { nodeName } }) => {
    if (nodeName === 'DIV') closeModal();
  };

  return (
    <ContainerModal className="overlay" onClick={handleClick}>
      <div className="modal">
        <img src={largeImage} alt="bigger" />
      </div>
    </ContainerModal>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
