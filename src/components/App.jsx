import { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import { Contaner } from './App.styled';
import { getImages, PER_PAGE } from 'servises/api';
import { Loader } from './Loader/Loader';
import { toast, Toaster } from 'react-hot-toast';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 0,
    isLoading: false,
    totalHits: 0,
    error: '',
  };

  handleSearch = searchText => {
    this.setState({
      searchText,
      images: [],
      page: 1,
    });
  };

  onPagination = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      getImages(this.state.searchText, this.state.page)
        .then(resp =>
          !resp.totalHits
            ? toast.error(
                `Sorry, there are no images matching your search query: ${this.props.searchText}. Please try again. `
              )
            : this.setState({
                images: [...this.state.images, ...resp.hits],
                totalHits: resp.totalHits,
              })
        )

        .catch(err => {
          this.setState({
            error: err.response.data,
          });
          toast.error(`Ooops! Something went wrong: "${this.state.error}"`);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <Contaner>
        <Searchbar handleSearch={this.handleSearch} />
        {this.state.isLoading && <Loader />}
        {this.state.error ? (
          <p> </p>
        ) : (
          <ImageGallery images={this.state.images} />
        )}

        {this.state.page < Math.ceil(this.state.totalHits / PER_PAGE) && (
          <Button onPagination={this.onPagination} />
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </Contaner>
    );
  }
}

export default App;

App.propTypes = {
  searchText: PropTypes.string.isRequired,
  images: PropTypes.array,
  page: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalHits: PropTypes.number.isRequired,
  error: PropTypes.string,
  onPagination: PropTypes.func,
};
