import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

const num = 6;

const pokemonTeste = pokemons.filter((bicho, index) => index < num);
// console.log(pokemonTeste.length);

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notF = screen.getByText('No favorite pokemon found');
    expect(notF).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemonTeste } />);
    const fav = screen.getAllByTestId('pokemon-type');
    expect(fav).toHaveLength(num);
  });
});
