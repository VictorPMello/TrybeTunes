import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
    isButtonDisabled: true,
    isLoading: false,
    isSent: false,
  };

  onInputChange = ({ target: { name, value } }) => {
    const validation = value.length > 2;

    this.setState({
      [name]: value,
      isButtonDisabled: !(validation),
    });
  };

  handleSubmit = async () => {
    this.setState({ isSent: true });
    const { userName } = this.state;
    const response = await createUser({ name: userName });
    if (response) {
      this.setState({ isLoading: true });
    }
  };

  render() {
    const { isButtonDisabled, userName, isLoading, isSent } = this.state;

    if (isSent) {
      return (
        <div>
          { isLoading ? <Redirect to="/search" /> : <Loading /> }
        </div>
      );
    }

    return (
      <div
        className="flex justify-center w-full h-screen items-center"
        data-testid="page-login"
      >
        <form
          className="
            p-24
            rounded-2xl
            bg-white/[.125]
          "
          onSubmit={ this.handleSubmit }
        >
          <h1 className="text-center text-white mb-20 text-5xl">TrybeTunes</h1>
          <input
            type="text"
            name="userName"
            id="userName"
            value={ userName }
            placeholder="Nome de usuário"
            onChange={ this.onInputChange }
            data-testid="login-name-input"
            className="pl-2 h-10 rounded-tl-xl rounded-bl-xl"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            className="
              bg-keppel
              text-white
              cursor-pointer
              px-4
              h-10
              rounded-tr-xl
              rounded-br-xl
              ease-in-out
              duration-300
              hover:bg-keppel/[.8]
              disabled:bg-cinnabar
              disabled:hover:bg-cinnabar/[.8]
              disabled:hover:cursor-not-allowed
            "
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
