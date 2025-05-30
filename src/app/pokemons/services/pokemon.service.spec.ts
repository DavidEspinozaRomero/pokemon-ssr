import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { PokemonService } from './pokemon.service';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { pokemonApiResponse } from '../interfaces/pokemon-api.response';

const mockApiResponse: pokemonApiResponse = {
  count: 3002,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};
const expectedPokemon: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  }
]
const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
}

fdescribe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a loadPage method', () => {
    expect(service.loadPage).toBeDefined();
    expect(typeof service.loadPage).toBe('function');
  });

  it('should load a page of pokemons', () => {
    // Nos suscribimos a la espera de la data
    service.loadPage(1).subscribe(pokemons => {
      expect(pokemons).toEqual(expectedPokemon);
    });
    // creamos el request -> lo que esperamos que se dispare
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

    // Verificamos que se ha hecho la petición
    expect(req.request.method).toBe('GET');
    // Mandamos la data
    req.flush(mockApiResponse);
  })
});
