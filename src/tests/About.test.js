import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import About from '../components/About';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

describe('Testa o componente <About.js />', () => {
  test('Testa o componente <About.js />', () => {
    renderWithRouter(<About />);

    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: /About Pokédex/i });
    expect(titlePokedex).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    const url = img.src;
    expect(url).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    const paragrafo1 = screen.getByText('This application simulates a Pokédex'
     + ', a digital encyclopedia containing all Pokémons');
    expect(paragrafo1).toBeInTheDocument();
    const paragrafo2 = screen.getByText('One can filter Pokémons by type, and'
    + ' see more details for each one of them');
    expect(paragrafo2).toBeInTheDocument();
  });
});
