import { Component } from 'react';

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
            value={this.state.value}
          />
        </form>
      </Header>
    );
  }
}
