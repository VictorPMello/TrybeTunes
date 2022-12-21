import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser = async () => {
    const userName = await getUser();
    this.setState({
      name: userName.name,
      isLoading: false,
    });
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header
        data-testid="header-component"
        className="
        bg-ivory
          w-1/6
          h-screen
          flex
          flex-col
          items-center
          pt-5
          gap-y-40
          relative
        "
      >
        {isLoading ? <Loading color="#393E41" position="inset-y-2/4" /> : (
          <h1
            data-testid="header-user-name"
            className="
              text-onyx
              font-bold
              text-2xl
              uppercase
            "
          >
            {name}
          </h1>
        )}

        <nav>
          <ul
            className="
            flex
            flex-col
            justify-between
            items-center
            h-52
            w-full
            text-center
            "
          >
            <li
              className="
              w-28
              uppercase
              relative
              cursor-pointer

              after:absolute
              after:content-['']
              after:w-0
              after:h-0.5
              after:bottom-0
              after:left-0
              after:z-10
              after:duration-300

              hover:after:bg-cinnabar
              hover:after:w-full
            "
            >
              <Link
                className="cursor-pointer"
                to="/search"
                data-testid="link-to-search"
              >
                Search

              </Link>
            </li>
            <li
              className="
              w-28
              uppercase
              relative
              cursor-pointer

              after:absolute
              after:content-['']
              after:w-0
              after:h-0.5
              after:bottom-0
              after:left-0
              after:z-10
              after:duration-300

              hover:after:bg-cinnabar
              hover:after:w-full
            "
            >
              <Link
                className="cursor-pointer"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites

              </Link>
            </li>
            <li
              className="
              w-28
              uppercase
              relative
              cursor-pointer

              after:absolute
              after:content-['']
              after:w-0
              after:h-0.5
              after:bottom-0
              after:left-0
              after:z-10
              after:duration-300

              hover:after:bg-cinnabar
              hover:after:w-full
            "
            >
              <Link
                className="cursor-pointer"
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
