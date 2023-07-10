import { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import ContentInfo from './contentinfo/contentinfo';
import { Contaner } from './App.styled';

class App extends Component {
  state = {
    searchText: '',
  };

  handleSearch = searchText => {
    this.setState({ searchText });
  };

  render() {
    return (
      <Contaner>
        <Searchbar handleSearch={this.handleSearch} />
        <ContentInfo searchText={this.state.searchText} />
      </Contaner>
    );
  }
}

export default App;

App.propTypes = {
  searchText: PropTypes.string,
};
