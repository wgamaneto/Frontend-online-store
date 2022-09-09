import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

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

  render() {
    const { produtos } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        {
          produtos.length > 0 && (produtos.map((element) => (
            <>
              <div key={ element.id }>
                <img
                  data-testid="product-detail-image"
                  src={ element.thumbnail }
                  alt={ element.title }
                />
              </div>
              <div>
                <p data-testid="product-detail-name">
                  { element.title }
                </p>
                <p data-testid="product-detail-price">
                  {`Price: ${element.price}`}
                </p>
              </div>
            </>
          )))
        }
        {'}'}
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
