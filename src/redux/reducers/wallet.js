import { RESPONSE_COINS } from '../actions';

const initialState = {
  currencies: [], // array de string
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
  default:
    return state;
  }
};

export default wallet;
