import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    isLoading: true,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  async componentDidMount() {
    const { name, email, description, image } = await getUser();

    this.setState({
      isLoading: false,
      name,
      email,
      description,
      image,
    });
  }

  render() {
    const { isLoading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile" className="flex">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <main
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
              text-white
            "
          >
            <section className="flex p-5 gap-4 items-center">
              {image ? (
                <>
                  <img
                    className="w-60 h-60 rounded-full border-4 border-blue"
                    data-testid="profile-image"
                    src={ image }
                    alt={ name }
                  />
                  <div>
                    <h1 className="text-3xl">{name}</h1>
                    <p className="text-xl">{description}</p>
                    <p className="text-xl">{email}</p>
                  </div>
                </>
              ) : (
                <div>
                  <h1 className="text-3xl">{name}</h1>
                </div>
              )}
            </section>
            <button
              className="
                bg-keppel
                p-4
                rounded-lg
                hover:bg-keppel/[.85]
                duration-300
              "
              type="button"
            >
              <Link to="/profile/edit">Editar perfil</Link>
            </button>
          </main>
        )}
      </div>
    );
  }
}

export default Profile;
