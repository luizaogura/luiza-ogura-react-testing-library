import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  test('Testa se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { name: 'Encountered Pokémon' });
    expect(h2).toBeInTheDocument();
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filter = getAllByTestId('pokemon-type-button');
    const elementsName = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    filter.forEach(
      (types, index) => expect(types.innerHTML).toBe(elementsName[index]),
    );
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const allBtn = getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    expect(allBtn).not.toHaveAttribute('data-testid', 'pokemon-type-button');
    userEvent.click(allBtn);
  });
});
