import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalBlock } from './Modal.styled';

class Modal extends Component {
  state = {
    // isShowModal: false,
  };

  handleEsc = ({ code }) => {
    if (code === 'Escape') this.props.onCloseModal();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  onClose = evt => {
    evt.currentTarget === evt.target && this.props.onCloseModal();
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <Overlay onClick={this.onClose}>
        <ModalBlock>
          <img src={largeImageURL} alt="" />
        </ModalBlock>
      </Overlay>
    );
  }
}

export default Modal;

Modal.propTypes = { onCloseModal: PropTypes.func };
