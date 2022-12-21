import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: true,
    isDisabled: true,
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
    }, this.validation);
  }

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value }, this.validation);
  };

  validation = () => {
    const { name, email, description, image } = this.state;

    const isValid = name && description && image;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;

    this.setState({ isDisabled: !(isValid && regexEmail.test(email)) });
  };

  handleClick = async () => {
    const { name, email, description, image } = this.state;
    const { history: { push } } = this.props;

    this.setState({
      isLoading: true,
    }, async () => {
      await updateUser({
        name, email, description, image });
      push('/profile');
    });
  };

  render() {
    const { isLoading, name, email, description, image, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit" className="flex">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <form
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
              text-white
              gap-4
            "
          >
            <label
              className="text-2xl"
              htmlFor="name"
            >
              Nome:
              <input
                className="
                  text-base
                  ml-4
                  rounded-xl
                  px-3
                  text-onyx
                "
                type="text"
                name="name"
                id="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label
              className="text-2xl"
              htmlFor="email"
            >
              Email:
              <input
                className="
                  text-base
                  ml-4
                  rounded-xl
                  px-3
                  text-onyx
                "
                type="email"
                name="email"
                id="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label
              className="text-2xl"
              htmlFor="image"
            >
              Image
              <input
                className="
                  text-base
                  ml-4
                  rounded-xl
                  px-3
                  text-onyx
                "
                type="text"
                name="image"
                id="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <img
              className="w-60 h-60 rounded-full border-4 border-blue"
              src={ image }
              alt={ name }
            />
            <label
              className="text-2xl flex items-center"
              htmlFor="description"
            >
              Descrição:
              <textarea
                className="
                  text-base
                  ml-4
                  rounded-xl
                  px-3
                  text-onyx
                  resize-none
                "
                name="description"
                id="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="
                bg-keppel
                p-2
                text-xl
                rounded-lg
                hover:bg-keppel/[.85]
                duration-300
              "
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
