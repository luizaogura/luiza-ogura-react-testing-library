import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa o componente <Pokemon.js />', () => {
  const pikachu = pokemonList[0];

  test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pikachu;

    const eletricCategory = getByRole('button', { name: 'Electric' });
    userEvent.click(eletricCategory);

    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const img = getByRole('img');

    expect(name.innerHTML).toBe(pikachu.name);
    expect(type.innerHTML).toBe(pikachu.type);
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(img).toHaveAttribute('src', pikachu.image);
    expect(img).toHaveAttribute('alt', `${pikachu.name} sprite`);
  });

  test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { getByRole, getByAltText } = renderWithRouter(<App />);

    const eletricCategory = getByRole('button', { name: 'Electric' });
    const pikachuLink = getByRole('link', { name: 'More details' });
    userEvent.click(eletricCategory);
    userEvent.click(pikachuLink);

    const favPikachu = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favPikachu);
    expect(favPikachu).toBeChecked();

    const homeLink = getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const img = getByAltText(`${pikachu.name} is marked as favorite`);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });

  test('Testa se é exibido na tela um link com o href /pokemon/<id>', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pikachu.id}`);
  });
});
