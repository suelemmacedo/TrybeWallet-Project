// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_EMAIL } from '../actions';

const initialState = {
  user: {
    email: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.state.email,
    };
  default:
    return state;
  }
};

export default userReducer;
