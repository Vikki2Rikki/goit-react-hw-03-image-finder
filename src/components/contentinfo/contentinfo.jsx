import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Component } from 'react';
import { getImages, PER_PAGE } from 'servises/api';

class ContentInfo extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    totalHits: 0,
    error: '',
  };

  onPagination = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchText !== this.props.searchText ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      getImages(this.props.searchText, this.state.page)
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
    const { images, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {this.state.error ? <p> </p> : <ImageGallery images={images} />}

        {this.state.page < Math.ceil(this.state.totalHits / PER_PAGE) && (
          <Button onPagination={this.onPagination} />
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </>
    );
  }
}

export default ContentInfo;

ContentInfo.propTypes = {
  images: PropTypes.array,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  totalHits: PropTypes.number,
  error: PropTypes.string,
  onPagination: PropTypes.func,
};
