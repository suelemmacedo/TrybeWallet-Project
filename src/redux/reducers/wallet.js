// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_WALLET } from '../actions';

const initialState = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_WALLET:
    return {
      ...state,
      wallet: {
        currencies: action.state.currencies,
        expenses: action.state.expenses,
        editor: action.state.editor,
        idToEdit: action.state.idToEdit,
      },
    };
  default:
    return state;
  }
};

export default walletReducer;
