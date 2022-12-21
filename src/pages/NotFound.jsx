import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div
        data-testid="page-not-found"
        className="h-screen flex justify-center items-center"
      >
        <h1
          className="
          text-white
            uppercase
            text-4xl
            font-bold
          "
        >
          Página não encontrada!

        </h1>
      </div>
    );
  }
}

export default NotFound;
