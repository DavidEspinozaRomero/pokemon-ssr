import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { pokemonApiResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon.interface';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)
  // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
  #BASEURL = 'https://pokeapi.co/api/v2/pokemon'
  
  public get baseURL() : string {
    return this.#BASEURL; 
  }
  
  constructor() { }

  loadPage(page: number): Observable<SimplePokemon[]> {
    page -= 1; // 0, 1, 2 ...
    page = Math.max(0, page)
    return this.http.get<pokemonApiResponse>(`${this.#BASEURL}?offset=${page * 20}&limit=20`)
      .pipe(
        map((response) => {
          const simplePokemons: SimplePokemon[] = response.results.map((result) =>
          ({
            name: result.name,
            id: result.url.split('/').at(-2) ?? ''
          }))
          return simplePokemons
        }),
      )
  }

  getPokemon(id: string) {
    const url = this.#BASEURL + '/' + id
    return this.http.get<Pokemon>(url)
  }
}
