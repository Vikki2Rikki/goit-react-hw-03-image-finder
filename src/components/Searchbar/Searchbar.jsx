import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.handleSearch(this.state.value);
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn>
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  value: PropTypes.string,
  handleSearch: PropTypes.func,
};
