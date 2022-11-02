import charApi from '../../services/charApi';

// Actions Types

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST = 'REQUEST';
export const RESPONSE_COINS = 'RESPONSE_COINS';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';

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
