import React from 'react';
import renderWithRouter from './utils/renderWithRouter';
import About from '../pages/About';

describe('Testa o componente <About.js />', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const text1 = getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const text2 = getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading', { name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });

  test('Testa  se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const p = getAllByText(/Pokémon/i);
    expect(p.length).toBe(2);
  });

  test('Testa  se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
