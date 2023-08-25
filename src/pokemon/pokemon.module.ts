import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemoSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //Tener en cuenta que el name no es el definido para la coleccion. Ese name sale de la extension "Document"
        schema: PokemoSchema,
      },
    ]),
  ],
})
export class PokemonModule {}
