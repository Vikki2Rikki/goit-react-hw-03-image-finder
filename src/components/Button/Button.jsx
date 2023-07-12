import { Component } from 'react';
import PropTypes from 'prop-types';

import { Btn } from './Button.styled';

import React from 'react';

class Button extends Component {
  state = {};

  handlePagination = e => {
    this.props.onPagination();
  };

  render() {
    return (
      <>
        <Btn onClick={this.handlePagination} type="button">
          Load more
        </Btn>
      </>
    );
  }
}

export default Button;

Button.propTypes = { handlePagination: PropTypes.func };
