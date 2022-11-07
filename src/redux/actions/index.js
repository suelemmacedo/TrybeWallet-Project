import charApi from '../../services/charApi';
// Actions Types
export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST = 'REQUEST';
export const RESPONSE_COINS = 'RESPONSE_COINS';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';
export const REQUEST_ADD = 'REQUEST_ADD';
export const RESPONSE_SUCESS = 'RESPONSE_SUCESS';
export const EXPENSE_ERROR = 'EXPENSE_ERROR';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const user = (email) => ({
  type: USER_EMAIL,
  email,
});

export const request = () => ({
  type: REQUEST,
});

export const responseCoins = (payload) => ({
  type: RESPONSE_COINS,
  payload,
});

export const responseError = (error) => ({
  type: RESPONSE_ERROR,
  error,
});

export const requestAdd = () => ({
  type: REQUEST_ADD,
});

export const responseSucess = (expensive) => ({
  type: RESPONSE_SUCESS,
  expensive,
});

export const expensesError = (error) => ({
  type: EXPENSE_ERROR,
  error,
});

export const deleteExpenseBtn = (deleteExpenses) => ({
  type: DELETE_EXPENSE,
  deleteExpenses,
});

export function requestCoins() {
  return async (dispatch) => {
    dispatch(request());
    try {
      const dataCoins = await charApi();
      dispatch(responseCoins(dataCoins));
    } catch (error) {
      dispatch(responseError(error));
    }
  };
}

export function responseExpensive(expenses) {
  return async (dispatch) => {
    try {
      dispatch(requestAdd());
      const data = await charApi();
      const newExpenses = {
        ...expenses,
        exchangeRates: data,
      };
      console.log(newExpenses);
      dispatch(responseSucess(newExpenses));
    } catch (error) {
      /* console.log(error); */
      dispatch(expensesError(error));
    }
  };
}
