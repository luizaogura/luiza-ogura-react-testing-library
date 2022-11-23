import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa o componente <PokemonDetails.js />', () => {
  const pikachu = pokemonList[0];
  const moreDetails = 'More details';

  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const eletricCategory = getByRole('button', { name: 'Electric' });
    const pikachuLink = getByRole('link', { name: moreDetails });
    userEvent.click(eletricCategory);
    userEvent.click(pikachuLink);

    const h2Details = getByRole('heading', { name: `${pikachu.name} Details` });
    const h2Summary = getByRole('heading', { name: 'Summary' });
    expect(h2Details).toBeInTheDocument();
    expect(h2Summary).toBeInTheDocument();

    const textSummary = getByText(pikachu.summary);
    expect(textSummary).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const eletricCategory = getByRole('button', { name: 'Electric' });
    const pikachuLink = getByRole('link', { name: moreDetails });
    userEvent.click(eletricCategory);
    userEvent.click(pikachuLink);

    const h2 = getByRole('heading', { name: `Game Locations of ${pikachu.name}` });
    expect(h2).toBeInTheDocument();

    const srcPikachu = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    const locations = getAllByAltText(`${pikachu.name} location`);
    locations.forEach(
      (types, index) => expect(types.src).toBe(srcPikachu[index]),
    );
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { getByRole } = renderWithRouter(<App />);

    const eletricCategory = getByRole('button', { name: 'Electric' });
    const pikachuLink = getByRole('link', { name: moreDetails });
    userEvent.click(eletricCategory);
    userEvent.click(pikachuLink);

    const favPikachu = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favPikachu);
    expect(favPikachu).toBeChecked();
  });
});
