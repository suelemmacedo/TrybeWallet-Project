import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCoins } from '../redux/actions';

const initialState = {
  value: '',
  currency: '',
  method: '',
  category: '',
  tag: '',
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

  render() {
    const { coins } = this.props;
    console.log(this.props);
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
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
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
});

export default connect(mapStateToProps)(WalletForm);
