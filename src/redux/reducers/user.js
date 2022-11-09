import { USER_EMAIL } from '../actions';

const initialState = {
  email: '',
};
const user = (state = initialState, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
