import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

class Loading extends Component {
  render() {
    const { position, color } = this.props;
    return (
      <ReactLoading
        className={ ` absolute ${position}` }
        type="bars"
        color={ `${color}` }
      />
    );
  }
}

Loading.defaultProps = {
  position: 'inset-2/4',
  color: 'white',
};

Loading.propTypes = {
  position: PropTypes.string,
  color: PropTypes.string,
};

export default Loading;
