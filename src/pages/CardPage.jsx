import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setLocalItems, getProduct } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    arrayProduct: [],
    carrinho: [],
  };

  componentDidMount() {
    const store = async () => {
      await this.getProduct();
    };
    store();
    const produtos = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
    this.setState({
      carrinho: produtos,
    });
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProduct(id);
    product.quantidade = Number(1);
    this.setState({
      arrayProduct: [product],
    });
  };

  addCarrinho = (element) => {
    const { carrinho } = this.state;
    const has = carrinho.some((elemento) => elemento.id === element.id);
    if (has) {
      element.quantidade += 1;
      const existente = carrinho.findIndex((elemento) => elemento.id === element.id);
      carrinho.splice(existente, 1);
      carrinho.push(element);
      setLocalItems(carrinho);
    } else {
      element.quantidade = Number(1);
      carrinho.push(element);
      setLocalItems(carrinho);
    }
  };

  render() {
    const { arrayProduct } = this.state;
    return (
      <>
        <div>
          <p>
            <Link to="/cart" data-testid="shopping-carrinho-button">
              carrinho
            </Link>
          </p>
        </div>
        <div>
          {
            arrayProduct.length > 0 && (arrayProduct.map((element) => (
              <div key={ element.id }>
                <div>
                  <img
                    data-testid="product-detail-image"
                    src={ element.thumbnail }
                    alt={ element.title }
                  />
                </div>
                <div>
                  <p data-testid="product-detail-name">{element.title}</p>
                  <p data-testid="product-detail-price">{`Price: ${element.price}`}</p>
                </div>
                <button
                  data-testid="product-detail-add-to-carrinho"
                  type="button"
                  onClick={ () => this.addCarrinho(element) }
                >
                  Adicionar
                </button>
                <Link to={ `/cart/${element.id}` }>
                  <input
                    data-testid="product-detail-link"
                    type="button"
                    value="Test"
                  />
                </Link>
              </div>
            )))
          }
        </div>

      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
