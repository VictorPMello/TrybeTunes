import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    musicArray: [],
    isLoading: true,
  };

  componentDidMount() {
    this.handleMusic();
  }

  handleMusic = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getMusics(id);
    this.setState({ musicArray: response, isLoading: false });
  };

  render() {
    const { musicArray, isLoading } = this.state;
    return (
      <div
        className="flex"
        data-testid="page-album"
      >
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          musicArray.length > 0 && (
            <main
              className="
                text-center
                p-5
                w-full
                overflow-y-scroll
                max-h-screen
              "
            >
              <h2
                className="text-5xl text-white
                  font-bold mb-4"
                data-testid="artist-name"
              >
                {musicArray[0].artistName}
              </h2>

              <ul className="text-left flex flex-wrap justify-evenly">
                {musicArray
                  .filter((_el, idx) => idx !== 0)
                  .map((el) => (
                    <MusicCard key={ el.collectionViewUrl } el={ el } />
                  ))}
              </ul>
            </main>
          )
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
