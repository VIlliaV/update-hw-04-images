import PropTypes from 'prop-types';

import { ButtonStyle } from './Button.styled';

export const ButtonLoad = ({ loadMore }) => {
  return <ButtonStyle onClick={loadMore}>Load More...</ButtonStyle>;
};

ButtonLoad.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
