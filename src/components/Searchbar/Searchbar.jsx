import { Component } from 'react';
import PropTypes from 'prop-types';

import { Header } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value.trim());
  };

  render() {
    const { value } = this.state.value;
    return (
      <Header className="searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handleInput}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
          />
        </form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
