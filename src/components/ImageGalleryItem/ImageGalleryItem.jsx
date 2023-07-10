import PropTypes from 'prop-types';
import { Item, ImgItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = props => {
  const { imageId, webformatURL, tags } = props;
  // console.log(props);

  const handleOpenModal = () => {
    props.onOpenModal(imageId);
  };

  return (
    <Item>
      <ImgItem
        key={imageId}
        src={webformatURL}
        alt={tags}
        onClick={handleOpenModal}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  imageId: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onOpenModal: PropTypes.func,
};
