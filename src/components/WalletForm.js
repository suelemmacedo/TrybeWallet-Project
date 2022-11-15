import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCoins, responseExpensive, editExpenseSucess } from '../redux/actions';
import '../styles/WalletForm.css';

const initialState = {
  /* id: 0, */
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
    const { dispatch, expenses } = this.props;
    /* console.log(expenses.length); */
    const idState = {
      id: expenses.length,
      ...this.state,
    };
    console.log(idState);
    dispatch(responseExpensive(idState));
    this.setState(
      initialState,
    );
  };

  editExpense = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, method, tag, currency } = this.state;
    const newExpenses = expenses.map((element, index) => {
      if (element.id === +idToEdit) {
        return {
          id: +idToEdit,
          value,
          description,
          method,
          tag,
          currency,
          exchangeRates: expenses[index].exchangeRates,
        };
      }
      return element;
    });
    dispatch(editExpenseSucess(newExpenses));
  };

  render() {
    const { coins, editor } = this.props;
    const { value, currency, method, tag,
      description } = this.state;
    return (
      <form className="form-wallet">
        <label htmlFor="inputValue">
          {/*  Valor: */}
          <input
            className="input-value"
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputDescription">
          {/* Descrição: */}
          <input
            className="input"
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição da Despesa"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          className="select-currency"
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
          className="select-method"
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
          className="select"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentacao">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {
          editor
            ? (
              <button
                type="button"
                onClick={ this.editExpense }
              >
                Editar despesa

              </button>)
            : (
              <button
                className="add-expense"
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
        }
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  coins: store.wallet.currencies,
  expenses: store.wallet.expenses,
  editor: store.wallet.editor,
  idToEdit: store.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
