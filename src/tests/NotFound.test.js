import React from 'react';
import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se a página contém um heading h2 com o texto "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading', { name: 'Page requested not found' });
    expect(h2).toBeInTheDocument();
  });

  test('Testa se a página mostra a imagem', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
