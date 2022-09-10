import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories,
  getProductsFromCategoryAndQuery, setLocalItems } from '../services/api';
// import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    localState: [],
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

  handleCart = async (element) => {
    const { list, localState } = this.state;
    const produto = list.find((elemento) => elemento.id === element);
    const has = localState.some((e) => e.id === produto.id);
    if (has) {
      produto.quantidade += 1;
      const valor = localState.findIndex((ee) => ee.id === produto.id);
      localState.splice(valor, 1);
      localState.push(produto);
      setLocalItems(localState);
    } else {
      produto.quantidade = Number(1);
      localState.push(produto);
      setLocalItems(localState);
    }
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
                    <div>
                      <img src={ element.thumbnail } alt={ element.title } />
                      <p>{element.title}</p>
                      <p>{`Valor: ${element.price}`}</p>
                    </div>
                    <button
                      name={ element.id }
                      type="button"
                      data-testid="product-add-to-cart"
                      onClick={ () => this.handleCart(element.id) }
                    >
                      Adicionar ao Carrinho!
                    </button>
                  </div>
                ))
              )
          }
        </div>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho de compras
        </Link>
        <ul>
          {
            categorias.map((element) => (
              <div
                key={ element.id }
              >
                <button
                  data-testid="category"
                  type="button"
                  name={ element.id }
                  onClick={ this.handleHandle }

                >
                  { element.name }
                </button>
                <Link
                  data-testid="product-detail-link"
                  to={ `/cardpage/${element.id}` }
                />
              </div>
            ))
          }
        </ul>
      </>
    );
  }
}

export default Home;
