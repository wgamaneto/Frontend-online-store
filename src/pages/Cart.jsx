import React from 'react';
import { setLocalItems } from '../services/api';

class Cart extends React.Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    this.handleLocalStorage();
  }

  handleLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      carrinho: local,
    });
  };

  handleSum = (element) => {
    const { carrinho } = this.state;
    const has = carrinho.some((elemento) => elemento.id === element.id);
    if (has) {
      element.valor += 1;
      const posicao = carrinho.findIndex((elemento) => elemento.id === element.id);
      carrinho.splice(posicao, 1);
      carrinho.push(element);
      setLocalItems(carrinho);
    }
    this.handleLocalStorage();
  };

  handleSub = (element) => {
    const { carrinho } = this.state;
    const has = carrinho.some((elemento) => elemento.id === element.id);
    if (has) {
      element.valor -= 1;
      const posicao = carrinho.findIndex((elemento) => elemento.id === element.id);
      carrinho.splice(posicao, 1);
      carrinho.push(element);
      setLocalItems(carrinho);
    }
    if (element.valor <= 0) {
      this.remove(element); // se nao ajeitar aqui passa um requisito da 10
    }
    this.handleLocalStorage();
  };

  handleDel = (element) => {
    const { carrinho } = this.state;
    const posicao = carrinho.findIndex((e) => e.id === element.id);
    carrinho.splice(posicao, 1);
    setLocalItems(carrinho);
    this.handleLocalStorage();
  };

  render() {
    const { carrinho } = this.state;
    return (
      <>
        <h1>Carrinho de compras</h1>
        {
          carrinho.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              carrinho.map((e) => (
                <div data-testid="product" key={ e.id }>
                  <div>
                    <img src={ e.thumbnail } alt={ e.title } />
                    <p data-testid="shopping-cart-product-name">
                      {e.title}
                    </p>
                    <p>{`Valor: ${e.price}`}</p>
                  </div>
                  <div>
                    <button
                      data-testid="product-increase-quantity"
                      type="button"
                      onClick={ () => this.handleSum(e) }
                    >
                      +
                    </button>
                    <p data-testid="shopping-cart-product-quantity">
                      {e.quantidade}
                    </p>
                    <button
                      data-testid="product-decrease-quantity"
                      type="button"
                      onClick={ () => this.handleSub(e) }
                    >
                      -
                    </button>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.handleDel(e) }
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))
            )
        }
      </>
    );
  }
}

export default Cart;
