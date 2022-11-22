import React from 'react';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Testa o componente <FavoritePokemon.js />', () => {
  test('Caso a pessoa não tenha Pokémon favoritos, é exibida na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);

    const noFavText = getByText(/No favorite pokémon found/i);
    expect(noFavText).toBeInTheDocument();
  });

/* test('Testa se são exibidos todos os cards de Pokémon favoritados', () => {
   const { history } = renderWithRouter(<FavoritePokemon />);

    history.push('/');
  }); */
});
