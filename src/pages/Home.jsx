import React from 'react';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    // itens: '',
    // click: false,
  };

  // handleClick = (event) => {
  //   this.setState({ click: true });
  //   const { target } = event;
  // };

  render() {
    // const { click } = this.state;
    return (
      <>
        <input
          type="text"
          placeholder="digite aqui"
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
      </>
    );
  }
}

export default Home;
