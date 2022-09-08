import React from 'react';

class Home extends React.Component {
  state = {
    // itens: '',
  };

  render() {
    // const { itens } = this.state;
    return (
      <>
        <input
          type="text"
          placeholder="digite aqui"
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}

export default Home;
