import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const idPikachu = 25;

describe('Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pegarTipo = screen.getByTestId('pokemon-type');
    expect(pegarTipo).toBeDefined();
    expect(pegarTipo).toHaveTextContent(/Electric/i);
    const pegarName = screen.getByTestId('pokemon-name');
    expect(pegarName).toBeDefined();
    expect(pegarName).toHaveTextContent(/Pikachu/i);
    const pegarPeso = screen.getByTestId('pokemon-weight');
    expect(pegarPeso).toBeDefined();
    const pesoTexto = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pesoTexto).toBeDefined();
    const pokemonImage = screen.getByRole('img', { name: /Pikachu Sprite/i });
    expect(pokemonImage).toBeDefined();
    const url = pokemonImage.src;
    expect(url).toEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveProperty('alt', 'Pikachu sprite');
  });
  test('Testa o link de navegação', () => {
    renderWithRouter(<App />);

    const linkPokemon = screen.getByRole('link', { name: /More details/i });
    // console.log(linkPokemon.href);
    expect(linkPokemon).toBeDefined();
    expect(linkPokemon).toHaveAttribute('href');
    expect(linkPokemon.href).toBe(`http://localhost/pokemons/${idPikachu}`);

    userEvent.click(linkPokemon);
    const teste = screen.getByRole('heading',
      { level: 2, name: /Pikachu Details/i });
    expect(teste).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { customHistory } = renderWithRouter(<App />);
    const diretorio = `/pokemons/${idPikachu}`;
    customHistory.push(diretorio);

    const check = screen.getByRole('checkbox');
    userEvent.click(check);
    const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(img).toBeInTheDocument();
    const url = img.src;
    // console.log(url);
    expect(url).toBe('http://localhost/star-icon.svg');
  });
});
