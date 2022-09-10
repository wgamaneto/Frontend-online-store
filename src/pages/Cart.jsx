import React, { Component } from 'react';
import { setLocalItems } from '../services/api';

export default class ShopCart extends Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      carrinho: local,
    });
  };

  handleSum = (element) => {
    const { carrinho } = this.state;
    const has = carrinho.some((elemento) => elemento.id === element.id);
    if (has) {
      element.quantidade += 1;
      const existente = carrinho.findIndex((elemento) => elemento.id === element.id);
      carrinho.splice(existente, 1);
      carrinho.push(element);
      setLocalItems(carrinho);
    }
    this.getLocalStorage();
  };

  HandleSub = (element) => {
    const { carrinho } = this.state;
    const has = carrinho.some((elemento) => elemento.id === element.id);
    if (has) {
      element.quantidade -= 1;
      const existente = carrinho.findIndex((elemento) => elemento.id === element.id);
      carrinho.splice(existente, 1);
      carrinho.push(element);
      setLocalItems(carrinho);
    }
    if (element.quantidade <= 0) {
      this.remove(element);
    }
    this.getLocalStorage();
  };

  remove = (element) => {
    const { carrinho } = this.state;
    const existente = carrinho.findIndex((elemento) => elemento.id === element.id);
    carrinho.splice(existente, 1);
    setLocalItems(carrinho);
    this.getLocalStorage();
    //
  };

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        <h1>Carrinho de compras</h1>
        {
          carrinho.length === 0
            ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
            : (
              carrinho.map((element) => (
                <div data-testid="product" key={ element.id }>
                  <div>
                    <img src={ element.thumbnail } alt={ element.title } />
                    <p data-testid="shopping-cart-product-name">{element.title}</p>
                    <p>{`Valor: ${element.price}`}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ () => this.handleSum(element) }
                    >
                      +
                    </button>
                    <p data-testid="shopping-cart-product-quantity">
                      {element.quantidade}
                    </p>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.HandleSub(element) }
                    >
                      -
                    </button>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.remove(element) }
                    >
                      remove item
                    </button>
                  </div>
                </div>
              ))
            )
        }
      </div>
    );
  }
}
