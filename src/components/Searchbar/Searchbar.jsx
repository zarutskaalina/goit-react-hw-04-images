import { Component } from 'react';
import { SearchbarContainer } from './SearchbarStyles';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChangeInput = e => {
    const value = e.target.value;

    this.setState({
      search: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = e.currentTarget.elements.search.value;
    this.props.handleSearchInput(query);

    this.setState({
      search: '',
    });
  };

  render() {
    return (
      <SearchbarContainer>
        <form className="form" onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className="button"
            disabled={!this.state.search}
          >
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleChangeInput}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </SearchbarContainer>
    );
  }
}
