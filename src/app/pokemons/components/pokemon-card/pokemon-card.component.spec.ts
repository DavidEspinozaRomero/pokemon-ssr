import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
}

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });
  it('should render pokemon name and image correctly', () => {
    const pokemonName = compiled.querySelector('h2')!.innerHTML;
    expect(pokemonName).toBe(mockPokemon.name);

    const pokemonImage = compiled.querySelector('img')!.src;
    expect(pokemonImage).toBe(component.pokemonImage());
  });
  it('should have the proper ng-reflect-router-link', () => {
    const link = compiled.querySelector('div')!.getAttribute('ng-reflect-router-link');
    expect(link).toBe(`/pokemons,${mockPokemon.name}`);
  });

});
