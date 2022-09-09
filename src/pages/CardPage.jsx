import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class CardPage extends React.Component {
  state = {
    produtos: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const apiData = await getProductById(id);
    this.setState({ produtos: [apiData] });
  }

  //   getProduct = async () => {
  //     ;
  //   };

  render() {
    const { produtos } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{produtos.title}</h1>
        <img data-testid="product-detail-image" src={}></img>
        <p data-testid="product-detail-price" />
        <button data-testid="shopping-cart-button" />
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
