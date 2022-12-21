import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdFavorite } from 'react-icons/md';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isChecked: await this.handleLocalStore(),
    });
  }

  handleLocalStore = async () => {
    const { el: { trackId } } = this.props;
    const response = await getFavoriteSongs();
    return response.map((el) => el.trackId).includes(trackId);
  };

  handleChange = ({ target: { checked, name } }) => {
    this.handleAddSong(checked);
    this.setState({ [name]: checked, isLoading: true });
  };

  handleAddSong = async (checked) => {
    const { el, favoriteRemoveSong } = this.props;
    if (checked) {
      await addSong(el);
      this.setState({ isLoading: false });
    } else {
      await removeSong(el);
      this.setState({ isLoading: false });
      if (favoriteRemoveSong) {
        favoriteRemoveSong(el.trackId);
      }
    }
  };

  render() {
    const { el } = this.props;
    const { isChecked, isLoading } = this.state;
    return (
      <li className="mb-4 bg-onyx/[.55] p-4 rounded-xl w-5/12 relative h-40 text-center">
        <h3 className="text-xl text-white mb-6">{el.trackName}</h3>
        <div className="flex gap-2 items-center">
          <audio
            className="bg-blue p-1 rounded-3xl"
            src={ el.previewUrl }
            data-testid="audio-component"
            controls
          >
            <track kind="captions" />
          </audio>

          {isLoading ? (
            <Loading absolute="absolute" position="inset-x-3/4" />
          ) : (
            <label htmlFor={ `input-checked-${el.trackId}` }>
              <input
                className="hidden peer"
                type="checkbox"
                name="isChecked"
                id={ `input-checked-${el.trackId}` }
                checked={ isChecked }
                onChange={ this.handleChange }
                data-testid={ `checkbox-music-${el.trackId}` }
              />
              <MdFavorite
                className="
                  cursor-pointer
                  ml-8
                  text-5xl
                  text-white
                  peer-checked:text-cinnabar
                "
              />
            </label>
          )}
        </div>
      </li>
    );
  }
}

MusicCard.propTypes = {
  el: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
  favoriteRemoveSong: PropTypes.func.isRequired,
};

export default MusicCard;
