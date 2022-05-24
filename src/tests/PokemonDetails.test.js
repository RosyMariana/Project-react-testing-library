// rosy
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const diretorio = '/pokemons/25';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { customHistory } = renderWithRouter(<App />);
    const linkPokemon = screen.getByRole('link', { name: /More details/i });
    customHistory.push(diretorio);

    userEvent.click(linkPokemon);
    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: /Pikachu Details/i });
    expect(titlePokedex).toBeInTheDocument();
    expect(linkPokemon).not.toBeInTheDocument();

    const sumario = screen.getByRole('heading',
      { level: 2, name: /Summary/i });
    expect(sumario).toBeInTheDocument();

    const paragrafo = screen.getByText('This intelligent Pokémon roasts hard berries '
    + 'with electricity to make them tender enough to eat.');
    expect(paragrafo).toBeInTheDocument();
  });
  test('Testa se existe na página mapas contendo as localizações do pokémon', () => {
    const { customHistory } = renderWithRouter(<App />);
    const linkPokemon = screen.getByRole('link', { name: /More details/i });
    customHistory.push(diretorio);

    userEvent.click(linkPokemon);
    const texto = screen.getByRole('heading',
      { level: 2, name: /Game Locations of Pikachu/i });
    expect(texto).toBeInTheDocument();

    const localizaçao1 = screen.getByText(/Kanto Viridian Forest/i);
    const localizaçao2 = screen.getByText(/Kanto Power Plant/i);

    expect(localizaçao1).toBeInTheDocument();
    expect(localizaçao2).toBeInTheDocument();

    const img = screen.getAllByRole('img');
    const url1 = img[0].src;
    const url2 = img[1].src;
    expect(url1).toEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(url2).toEqual('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const alt1 = img[0].alt;
    const alt2 = img[1].alt;

    expect(alt1).toEqual('Pikachu sprite');
    expect(alt2).toEqual('Pikachu location');
  });
  test('Testa se pode favoritar um pokémon através da página de detalhes.', () => {
    const { customHistory } = renderWithRouter(<App />);
    customHistory.push(diretorio);

    const check = screen.getByRole('checkbox');
    expect(check).toBeDefined();
    userEvent.click(check);
    const fav = screen.getByLabelText('Pokémon favoritado?');
    expect(fav).toBeDefined();
    const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(img).toBeInTheDocument();
    userEvent.click(check);
    expect(img).not.toBeInTheDocument();
  });
});
