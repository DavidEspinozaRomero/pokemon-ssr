import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css'
})
export default class PokemonPageComponent implements OnInit {
  pokemonService = inject(PokemonService)
  title = inject(Title)
  meta = inject(Meta)
  pokemon = signal<Pokemon | null>(null)
  id = input<string>('')

  ngOnInit(): void {
    if (this.id()) {
      this.pokemonService.getPokemon(this.id()) //id
        .pipe(
          tap(({ name, id, sprites }) => {
            const pageTitle = `#${id} - ${name}`
            const pageDescription = 'Pagina del pokemon: ' + name
            this.title.setTitle(pageTitle)
            this.meta.updateTag({ name: 'descrption', content: pageDescription })
            this.meta.updateTag({ name: 'og:title', content: pageTitle })
            this.meta.updateTag({ name: 'og:descrption', content: pageDescription })
            this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` })
          })
        )
        .subscribe(this.pokemon.set)
    }
  }


}
