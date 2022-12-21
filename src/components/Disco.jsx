import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Disco extends Component {
  render() {
    const {
      artistName,
      collectionName,
      artworkUrl100,
      trackCount,
    } = this.props;

    return (
      <section className="flex justify-evenly items-center text-right">
        <img
          src={ artworkUrl100 }
          alt={ collectionName }
          className="w-28 rounded-full"
        />
        <div>
          <h2 className="text-xl">
            Nome do artista/banda:
            {' '}
            <span className="text-cinnabar font-bold">{artistName}</span>
          </h2>
          <p>
            Nome do disco:
            {' '}
            <span className="text-cinnabar">{collectionName}</span>

          </p>
          <p>
            Quantidade de músicas:
            {' '}
            <span className="text-cinnabar">{trackCount}</span>

          </p>
        </div>
      </section>
    );
  }
}

Disco.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  trackCount: PropTypes.number,
}.isRequired;

export default Disco;
