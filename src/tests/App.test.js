// iniciando novo projeto!
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste do componente <App.js />', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonLink).toBeInTheDocument();
  });

  test('Ao clicar no link "Home", direciona para a página inicial, na URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Ao clicar no link "About", direciona para a página inicial, na URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Ao clicar no link "Favorite Pokémon", direciona para a página inicial, na URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favPokemonLink).toBeInTheDocument();
    userEvent.click(favPokemonLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Ao entrar em uma URL desconhecida, é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    const INVALID_URL = '/xablau';
    act(() => {
      history.push(INVALID_URL);
    });

    const notFoundTitle = screen.getByText(/Not Found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
