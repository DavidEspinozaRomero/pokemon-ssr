import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

const mockPokemons: SimplePokemon[] = [
    {
        id: '1',
        name: 'bulbasaur',
    },
    {
        id: '2',
        name: 'ivysaur',
    },
    {
        id: '3',
        name: 'venusaur',
    },
    {
        id: '4',
        name: 'charmander',
    },
    {
        id: '5',
        name: 'charmeleon',
    },
    {
        id: '6',
        name: 'charizard',
    },
    {
        id: '7',
        name: 'squirtle',
    },
    {
        id: '8',
        name: 'wartortle',
    },
    {
        id: '9',
        name: 'blastoise',
    },
    {
        id: '10',
        name: 'caterpie',
    },
]

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });
  
  it('should create', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should render "No hay pokemons" when pokemons is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    expect(compiled.querySelector('div')?.textContent).toContain('No hay pokemons');
  });

  it('should create', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('app-pokemon-card').length).toBe(mockPokemons.length);
  });

  it
});
