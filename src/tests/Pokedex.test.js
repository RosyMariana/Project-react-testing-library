import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const num = 7;

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const tituloPokedex = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(tituloPokedex).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();

    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);
    const chamander = screen.getByText(/Charmander/i);
    expect(chamander).toBeDefined();
    userEvent.click(nextPokemon);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeDefined();
    userEvent.click(nextPokemon);
    const ekans = screen.getByText(/Ekans/i);
    expect(ekans).toBeDefined();
    userEvent.click(nextPokemon);
    const alakazam = screen.getByText(/Alakazam/i);
    expect(alakazam).toBeDefined();
    userEvent.click(nextPokemon);
    const mew = screen.getByText(/Mew/i);
    expect(mew).toBeDefined();
    userEvent.click(nextPokemon);
    const rapidash = screen.getByText(/Rapidash/i);
    expect(rapidash).toBeDefined();
    userEvent.click(nextPokemon);
    const snorlax = screen.getByText(/Snorlax/i);
    expect(snorlax).toBeDefined();
    userEvent.click(nextPokemon);
    const dragonair = screen.getByText(/Dragonair/i);
    expect(dragonair).toBeDefined();
    userEvent.click(nextPokemon);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeDefined();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const teste = screen.getAllByTestId('pokemon-type');
    expect(teste.length).toEqual(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const botaoFiltro = screen.getAllByTestId('pokemon-type-button');
    const allBotao = screen.getByRole('button', { name: /all/i });
    expect(allBotao).toBeDefined();
    expect(botaoFiltro.length).toEqual(num);
    expect(botaoFiltro[0]).toHaveTextContent(/electric/i);
    expect(botaoFiltro[6]).toHaveTextContent(/dragon/i);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const pegarBotao = screen.getByRole('button', { name: /all/i });
    expect(pegarBotao).toBeDefined();
    userEvent.click(pegarBotao);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeDefined();
  });
});
