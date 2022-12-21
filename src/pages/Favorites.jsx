import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: true,
    favoriteList: [],
  };

  async componentDidMount() {
    await this.getList();
    this.setState({ isLoading: false });
  }

  getList = async () => {
    const favoriteList = await getFavoriteSongs();
    this.setState({ favoriteList });
  };

  favoriteRemoveSong = (id) => {
    const { favoriteList } = this.state;

    const newArray = favoriteList.filter(({ trackId }) => trackId !== id);
    this.setState({ favoriteList: newArray });
  };

  render() {
    const { isLoading, favoriteList } = this.state;
    return (
      <div
        data-testid="page-favorites"
        className="flex"
      >
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <ul
            className="
              text-left
              flex
              flex-wrap
              justify-evenly
              items-center
              p-5
              w-full
              overflow-y-scroll
              max-h-screen
            "
          >
            {favoriteList.map((el) => (
              <MusicCard
                key={ el.trackId }
                el={ el }
                favoriteRemoveSong={ this.favoriteRemoveSong }
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Favorites;
