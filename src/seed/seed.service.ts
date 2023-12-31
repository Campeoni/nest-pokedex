import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemons: CreatePokemonDto[] = [];

    await this.pokemonService.removeAll();

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const nro = +segments[segments.length - 2];
      pokemons.push({ name: name.toLocaleLowerCase(), nro });
    });

    const result = await this.pokemonService.createMany(pokemons);

    return result;
  }
}
