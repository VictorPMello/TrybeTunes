import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoHeadsetSharp } from 'react-icons/io5';
import Disco from '../components/Disco';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const INITIAL_STATE = {
  artistName: '',
  isDisabled: true,
  isLoading: false,
};

class Search extends Component {
  state = {
    typedName: '',
    ...INITIAL_STATE,
    artistArray: [],
  };

  handleChange = ({ target: { value, name } }) => {
    const validation = value.length >= 2;
    this.setState({
      [name]: value,
      typedName: value,
      isDisabled: !(validation),
    });
  };

  handleClick = () => {
    const { artistName } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      const artistArray = await searchAlbumsAPI(artistName);
      this.setState({
        artistArray,
        ...INITIAL_STATE,
      });
    });
  };

  render() {
    const { artistName, isDisabled, artistArray, typedName, isLoading } = this.state;
    const { history: { push } } = this.props;
    return (
      <div
        className="flex"
        data-testid="page-search"
      >
        <Header />
        {isLoading ? <Loading /> : (

          <main
            className="
              flex
              flex-col
              h-screen
              w-full
            "
          >
            <section
              className="
                h-1/6
                border-b-2
                border-b-white
                p-3
                flex
                justify-center
                items-center
              "
            >
              <form className="flex">
                <input
                  className="pl-2 h-10 rounded-tl-xl rounded-bl-xl"
                  type="text"
                  id="artistName"
                  name="artistName"
                  value={ artistName }
                  onChange={ this.handleChange }
                  data-testid="search-artist-input"
                  placeholder="Nome do artista ou banda"
                />

                <button
                  className="
                  bg-blue
                  text-white
                  cursor-pointer
                  px-4
                  h-10
                  rounded-tr-xl
                  rounded-br-xl
                  ease-in-out
                  duration-300
                  hover:bg-blue/[.8]
                  disabled:bg-onyx
                  disabled:hover:bg-onyx/[.8]
                  disabled:hover:cursor-not-allowed
                "
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </form>
            </section>

            <section className="h-screen text-center p-4 overflow-y-scroll">
              <h1
                className="
              text-white
                text-xl
                mb-5
              "
              >
                Resultado de álbuns de:
                {' '}
                <span className="uppercase font-bold text-onyx">{typedName}</span>

              </h1>

              {artistArray.length === 0 ? (
                <h2
                  className="
              text-white
                text-2xl
              "
                >
                  Nenhum álbum foi encontrado
                </h2>
              )
                : (
                  artistArray.map((artist) => (
                    <div
                      className="
                      bg-white/[.55]
                        mb-4
                        p-5
                        rounded-lg
                      "
                      key={ artist.collectionId }
                    >
                      <Disco
                        { ...artist }
                      />

                      <button
                        className="
                        bg-keppel
                        text-white
                          p-3
                          rounded-md
                          hover:bg-keppel/[.75]
                          duration-300
                          m-auto
                          flex
                          gap-2
                          justify-center
                          items-center
                        "
                        type="button"
                        data-testid={ `link-to-album-${artist.collectionId}` }
                        onClick={ () => push(`/album/${artist.collectionId}`) }
                      >
                        Escute aqui!
                        {' '}
                        <IoHeadsetSharp />
                      </button>
                    </div>
                  )))}
            </section>
          </main>
        )}

      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Search;
