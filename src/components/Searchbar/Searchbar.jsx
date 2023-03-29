import { useState } from 'react';
// import PropTypes from 'prop-types';

import { Header } from './Searchbar.styled';
import { useContextQuery } from '../Context';

export const Searchbar = () => {
  const [query, setQuery] = useState('');
  const { setQueryContext } = useContextQuery();
  const handleInput = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setQueryContext(query.trim());
  };

  return (
    <Header className="searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleInput}
          className="SearchForm-input"
          type="text"
          name="searchWord"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
        />
      </form>
    </Header>
  );
};
