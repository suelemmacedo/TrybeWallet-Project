import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCoins, responseExpensive } from '../redux/actions';

const initialState = {
  id: 0,
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  exchangeRates: [],
};

class WalletForm extends Component {
  state = initialState;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestCoins());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(responseExpensive(this.state));
    this.setState(
      initialState,
    );
  };

  render() {
    const { coins } = this.props;
    const { value, currency, method, tag,
      description } = this.state;
    return (
      <form>
        <label htmlFor="inputValue">
          Valor:
          <input
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputDescription">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição da Despesa"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {coins.map((event) => (
            <option key={ event }>
              {event}
            </option>))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentacao">Alimentação</option>
          <option value="Lazer">lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (store) => ({
  coins: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
