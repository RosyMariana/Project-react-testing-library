import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

describe('routes', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      userEvent.click(screen.getByText(/Home/i));
      const linkHome = screen.getByText(/Encountered pokémons/i);
      expect(linkHome).toBeInTheDocument();

      userEvent.click(screen.getByText(/About/i));
      const linkAbout = screen.getByText(/About Pokédex/i);
      expect(linkAbout).toBeInTheDocument();

      userEvent.click(screen.getByText(/Favorite Pokémons/i));
      const linkFavorite = screen.getAllByText(/Favorite pokémons/i);
      expect(linkFavorite).toHaveLength(2);
    });
});
