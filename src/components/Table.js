import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseBtn, editExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  deleteButton = (deleteExpenses) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenseBtn(deleteExpenses));
  };

  editButton = (event) => {
    const { id } = event.target;
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (element.exchangeRates[element.currency].ask * element.value)
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="edit-btn"
                    type="button"
                    data-testid="edit-btn"
                    id={ element.id }
                    onClick={ this.editButton }
                  >
                    Editar

                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteButton(element.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(Table);
