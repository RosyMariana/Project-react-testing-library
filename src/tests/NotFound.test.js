import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com Page requested not found', () => {
    const { customHistory } = renderWithRouter(<NotFound />);

    customHistory.push('/xulambes');

    const titleNotFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(titleNotFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getAllByRole('img');
    const url = img[1].src;
    expect(url).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
