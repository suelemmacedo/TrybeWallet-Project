import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalValues = () => {
    const { values } = this.props;
    console.log(values);
    const calc = values.reduce((acc, curr) => {
      console.log(curr.currency);
      const valueTaxa = curr.exchangeRates[curr.currency].ask;
      acc += Number(valueTaxa) * Number(curr.value);
      return acc;
    }, 0);
    return calc.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          {this.totalValues()}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>

      </>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  values: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
