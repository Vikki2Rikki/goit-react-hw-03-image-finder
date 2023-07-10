import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';

class ImageGallery extends Component {
  state = {
    isShowModal: false,
    imageModalURL: '',
  };

  onOpenModal = imageId => {
    const findImg = this.props.images.filter(image => {
      return imageId === image.id;
    });
    this.setState({
      isShowModal: true,
      imageModalURL: findImg[0].largeImageURL,
    });
  };

  onCloseModal = () => {
    this.setState({
      isShowModal: false,
      imageModalURL: '',
    });
  };
  render() {
    return (
      <>
        <Gallery>
          {this.props.images.map(img => (
            <ImageGalleryItem
              imageId={img.id}
              key={img.id}
              alt={img.tags}
              webformatURL={img.webformatURL}
              largeImageURL={img.largeImageURL}
              onOpenModal={this.onOpenModal}
            />
          ))}
        </Gallery>
        {this.state.isShowModal && (
          <Modal
            largeImageURL={this.state.imageModalURL}
            onCloseModal={this.onCloseModal}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  isShowModal: PropTypes.bool,
  imageModalURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onCloseModal: PropTypes.func,
};
