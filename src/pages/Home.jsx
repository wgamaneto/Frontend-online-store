import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
// import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    categorias: [],
  };

  async componentDidMount() {
    const handleCategorias = await getCategories();
    this.setState({ categorias: handleCategorias });
  }

  render() {
    const { categorias } = this.state;
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
        <div>
          {categorias.map((element) => (
            <label
              key={ element.id }
              htmlFor={ element.name }
              data-testid="category"
            >
              <input
                name="categorias"
                type="radio"
                id={ element.name }
              />
            </label>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
