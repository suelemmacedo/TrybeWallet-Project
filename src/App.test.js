import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import App from './App';
import Wallet from './pages/Wallet';

describe('Testa a Page Login', () => {
  test('1. Testa se a página contém um heading h1 com o texto "login"', () => {
    renderWithRouterAndRedux(<App />);
    const headingH1 = screen.getByRole('heading', { name: /login/i });
    expect(headingH1.tagName).toBe('H1');
    expect(headingH1.textContent).toBe('Login');
    expect(headingH1).toBeInTheDocument();
  });

  test('2. Testa se a página contém um botão com o nome "entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button.tagName).toBe('BUTTON');
    expect(button.textContent).toBe('Entrar');
    expect(button).toBeInTheDocument();
  });

  test('3. Testa se a página contém elementos email e senha renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Digite seu e-mail');
    expect(email).toBeInTheDocument();

    const password = screen.getByPlaceholderText('Digite sua senha');
    expect(password).toBeInTheDocument();
  });

  test('4. Testa se a aplicação é renderizada para a próxima página', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText('Digite seu e-mail');
    expect(email).toBeInTheDocument();

    const password = screen.getByPlaceholderText('Digite sua senha');
    expect(password).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    userEvent.type(email, 'suelemmacedo_@hotmail.com');
    expect(button).toBeDisabled();

    userEvent.type(password, '123456');
    expect(button).toBeEnabled();

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');

    expect(screen.getByText('suelemmacedo_@hotmail.com')).toBeInTheDocument();
  });
  test('5. Testa se a aplicação contém um parágrafo na página login', () => {
    renderWithRouterAndRedux(<App />);
    const paragraph = screen.getByText('Hello, TrybeWallet!');
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Testa a Page Wallet', () => {
  test('1. Testa se a aplicação contém os elementos renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    expect(value).toBeInTheDocument();

    const description = screen.getByTestId('description-input');
    expect(description).toBeInTheDocument();

    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    const submit = screen.getByText('Adicionar despesa');
    expect(submit).toBeInTheDocument();
  });
  test('2. Testa o funcionamento da table', () => {
    renderWithRouterAndRedux(<Wallet />);
    const value = screen.getByTestId('value-input');
    expect(value).toBeInTheDocument();

    const description = screen.getByTestId('description-input');
    expect(description).toBeInTheDocument();

    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    const submit = screen.getByText('Adicionar despesa');
    expect(submit).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    userEvent.type(description, 'Suco');
    userEvent.type(value, '15,00');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Alimentação');

    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpense);
    expect(table).toBeVisible();
  });
});
