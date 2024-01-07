import { useState } from 'react';
import { SearchbarContainer } from './SearchbarStyles';

export const Searchbar = ({ handleSearchInput }) => {
  const [search, setSearch] = useState('');

  const handleChangeInput = e => {
    const value = e.target.value;

    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const query = e.currentTarget.elements.search.value;
    handleSearchInput(query);

    setSearch('');
  };

  return (
    <SearchbarContainer>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button" disabled={!search}>
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          name="search"
          value={search}
          onChange={handleChangeInput}
          placeholder="Search images and photos"
        />
      </form>
    </SearchbarContainer>
  );
};
