import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="headerContainer">
        <h1 className="trybeWallet">TrybeWallet</h1>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
