import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById, setLocalItems } from '../services/api';

class CardPage extends React.Component {
  state = {
    produtos: [],
  };

  componentDidMount() {
    const data = async () => {
      await this.handleProduct();
    };
    data();
  }

  handleProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const ipData = await getProductById(id);
    this.setState({ produtos: [ipData] });
  };

  handleCart = (event) => {
    const { carrinho } = this.state;
    const has = carrinho.some((element) => element.id === event.id);
    if (has) {
      event.quantidade += 1;
      const existente = carrinho.findIndex((elemento) => elemento.id === event.id);
      carrinho.splice(existente, 1);
      carrinho.push(event);
      setLocalItems(carrinho);
    } else {
      event.quantidade = Number(1);
      carrinho.push(event);
      setLocalItems(carrinho);
    }
  };

  render() {
    const { produtos } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <div>
          {
            produtos.length > 0 && (produtos.map((element) => (
              <div key={ element.id }>
                <div>
                  <div>
                    <img
                      data-testid="product-detail-image"
                      src={ element.thumbnail }
                      alt={ element.title }
                    />
                  </div>
                  <p data-testid="product-detail-name">
                    {element.title}
                  </p>
                  <p data-testid="product-detail-price">
                    {`Price: ${element.price}`}
                  </p>
                </div>
                <button
                  data-testid="product-detail-add-to-cart"
                  type="button"
                  onClick={ () => this.handleCart(element) }
                >
                  add carrinho
                </button>
                <div />

              </div>
            )))
          }
        </div>
      </div>
    );
  }
}

CardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default CardPage;
