import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent {

  pokemons = input.required<SimplePokemon[]>()
}
