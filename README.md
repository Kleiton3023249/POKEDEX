# Projeto Base: Construindo uma Pokédex com JavaScript

## Tecnologias Utilizadas
- JavaScript
- HTML
- CSS

## Página Web da Pokédex

A aplicação possui uma página da web com uma estrutura HTML básica. A página inclui:

- Barra de pesquisa
- Botão de pesquisa
- Lista ordenada onde os Pokémon serão exibidos

## JavaScript para Interação

JavaScript é utilizado para interação dinâmica com a Pokédex. A aplicação realiza chamadas à [PokeAPI](https://pokeapi.co/) para obter informações sobre Pokémon.

### Objeto Pokemon e PokeAPI

- Existe uma classe `Pokemon` que é usada para mapear dados recebidos da PokeAPI.
- A PokeAPI é utilizada para obter informações gerais sobre Pokémon.

## Carregamento Inicial e Paginação

- A aplicação carrega inicialmente uma lista de Pokémon.
- Existe uma funcionalidade de carregar mais Pokémon ao clicar em um botão.

## Detalhes do Pokémon

- Cada Pokémon exibido na Pokédex mostra detalhes como número, nome, tipos e uma imagem.

## Pesquisa de Pokémon

- Existe uma funcionalidade de pesquisa que permite buscar um Pokémon específico.

## Tratamento de Erros

- Há tratamento de erros ao fazer chamadas à PokeAPI, exibindo mensagens no console em caso de erro.

## Responsividade

- O código faz referência a classes CSS e utiliza media queries para garantir uma experiência responsiva.
