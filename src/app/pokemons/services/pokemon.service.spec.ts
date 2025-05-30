import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { PokemonService } from './pokemon.service';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { pokemonApiResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon.interface';
import { catchError } from 'rxjs';

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
  it('should load a page 5 of pokemons', () => {
    // Nos suscribimos a la espera de la data
    service.loadPage(5).subscribe(pokemons => {
      expect(pokemons).toEqual(expectedPokemon);
    });
    // creamos el request -> lo que esperamos que se dispare
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`);

    // Verificamos que se ha hecho la petición
    expect(req.request.method).toBe('GET');
    // Mandamos la data
    req.flush(mockApiResponse);
  })
  it('should load pokemon by ID', () => {
    // Nos suscribimos a la espera de la data
    const pokemonID = '1';
    service.getPokemon(pokemonID).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
      // expect(pokemon.name).toEqual("bulbasaur");

    });
    // creamos el request -> lo que esperamos que se dispare
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);

    // Verificamos que se ha hecho la petición
    expect(req.request.method).toBe('GET');
    // Mandamos la data
    req.flush(mockPokemon);
  })
  it('should load pokemon by Name', () => {
    // Nos suscribimos a la espera de la data
    const pokemonName = 'bulbasaur';
    service.getPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
      // expect(pokemon.name).toEqual("bulbasaur");

    });
    // creamos el request -> lo que esperamos que se dispare
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    // Verificamos que se ha hecho la petición
    expect(req.request.method).toBe('GET');
    // Mandamos la data
    req.flush(mockPokemon);
  })

  // Disparar errores (Sad path)
  it('should catch error if pokemon notfound', () => {
    const pokemonName = 'notfound';
    service.getPokemon(pokemonName).pipe(
      catchError(err => {
        console.log(err);
        expect(err.message).toContain('Pokemon not found');
        return []
      })
    ).subscribe();
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    expect(req.request.method).toBe('GET');
    req.flush("Pokemon not found", { status: 404, statusText: 'Not Found' });
  })
});
