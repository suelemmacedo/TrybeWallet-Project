import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(user(email));
    history.push('/carteira');
  };

  validateBtn = () => {
    const { password, email } = this.state;
    const minPasswordLength = 6;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = regex.test(email);

    if (password.length >= minPasswordLength && validateEmail) {
      this.setState({
        isDisabled: false,

      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateBtn());
  };

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Digite seu e-mail"
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
