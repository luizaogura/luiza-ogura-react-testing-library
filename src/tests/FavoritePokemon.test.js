import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Testa o componente <FavoritePokemon.js />', () => {
  test('Caso a pessoa não tenha Pokémon favoritos, é exibida na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);

    const noFavText = getByText(/No favorite pokémon found/i);
    expect(noFavText).toBeInTheDocument();
  });

  test('Testa se são exibidos todos os cards de Pokémon favoritados', () => {
    const {
      getByRole,
      getByText,
      getAllByText } = renderWithRouter(<App />);

    const homeLink = getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const eletricCategory = getByRole('button', { name: 'Electric' });
    const pikachuLink = getByRole('link', { name: 'More details' });
    userEvent.click(eletricCategory);
    userEvent.click(pikachuLink);

    const favPikachu = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favPikachu);
    expect(favPikachu).toBeChecked();

    userEvent.click(homeLink);

    const fireCategory = getByRole('button', { name: 'Fire' });
    const charmanderLink = getByRole('link', { name: 'More details' });
    userEvent.click(fireCategory);
    userEvent.click(charmanderLink);

    const favCharmander = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favCharmander);
    expect(favCharmander).toBeChecked();

    const favPokemonLink = getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favPokemonLink);

    const pikachuFavPage = getByText('Pikachu');
    const charmanderFavPage = getByText('Charmander');
    const favorites = getAllByText(/Average weight/i);
    expect(favorites.length).toBe(2);
    expect(pikachuFavPage).toBeInTheDocument();
    expect(charmanderFavPage).toBeInTheDocument();
  });
});
