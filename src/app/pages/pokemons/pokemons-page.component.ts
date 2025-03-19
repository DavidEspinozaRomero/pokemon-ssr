import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from "rxjs";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  imports: [RouterLink, PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  // isLoading = signal<boolean>(true)
  // private appRef = inject(ApplicationRef)
  // private $appState = this.appRef.isStable.subscribe((isStable)=> {
  //   console.log({isStable});
  // })

  private readonly pokemonService = inject(PokemonService)
  private readonly route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)
  pokemons = signal<SimplePokemon[]>([])

  currentPage = toSignal(this.route.params.pipe(
    map((params) => params['page'] ?? '1'),
    map(param => isNaN(+param) ? 1 : +param),
    map(param => Math.max(1, param))
  ))

  loadOnPageChange = effect(() => {
    this.loadPokemons(this.currentPage())
  })

  // ngOnInit(): void {
  //   this.currentPage()

  //   this.loadPokemons()
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false)
  //   // }, 3000);
  // }

  // ngOnDestroy(): void {
  //   // this.$appState.unsubscribe()
  // }

  loadPokemons(page: number = 0) {
    this.pokemonService.loadPage(page).pipe(
      // tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
      tap(() => this.title.setTitle(`Pokemon SSR - Page ${page}`))
    )
      .subscribe(pokemons => this.pokemons.set(pokemons))
  }

  setPage() {
    const page = toSignal(this.route.queryParamMap)
  }
}
