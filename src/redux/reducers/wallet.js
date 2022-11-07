import { RESPONSE_COINS, RESPONSE_SUCESS, DELETE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case RESPONSE_COINS:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((event) => event !== 'USDT'),
    };
  case RESPONSE_SUCESS:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.expensive,
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id
      !== action.deleteExpenses),
    };
  default:
    return state;
  }
};

export default wallet;
