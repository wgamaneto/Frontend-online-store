import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
// import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    categorias: [],
    search: '',
    list: [],
    searched: false,
  };

  // ximbalaieweeeewewe

  async componentDidMount() {
    this.handleCategorias();
  }

  handleCategorias = async () => {
    const info = await getCategories();
    this.setState({ categorias: info });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleHandle = async (event) => {
    const produtos = await getProductsFromCategoryAndQuery(event.target.name, null);
    this.setState({ list: produtos.results, searched: true });
  };

  handleSearch = async () => {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(undefined, search);
    this.setState({ list: products.results, searched: true });
  };

  render() {
    const { categorias, search, list, searched } = this.state;
    return (
      <>
        <input
          data-testid="query-input"
          type="text"
          name="search"
          placeholder="digite aqui"
          value={ search }
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleSearch }
        >
          Pesquisar
        </button>
        <div>
          {
            list.length === 0 && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
          }
        </div>
        <div>
          {
            searched && list.length === 0
              ? <p>Nenhum produto foi encontrado</p> : (
                list.map((element) => (
                  <div
                    data-testid="product"
                    key={ element.id }
                  >
                    <img src={ element.thumbnail } alt={ element.title } />
                    <p>{element.title}</p>
                    <p>{`Valor: ${element.price}`}</p>
                  </div>
                ))
              )
          }
        </div>
        <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
        <ul>
          {
            categorias.map((elemento) => (
              <>
                <div
                  key={ elemento.id }
                />
                <button
                  data-testid="category"
                  type="button"
                  name={ elemento.id }
                  onClick={ this.handleHandle }

                >
                  { elemento.name }
                </button>
                <Link
                  data-testid="product-detail-link"
                  to={ `/cardpage/${elemento.id}` }
                />
              </>
            ))
          }
        </ul>
      </>
    );
  }
}

export default Home;
