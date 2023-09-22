import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PokemonService {

  // private const defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,

    private readonly configService: ConfigService
  ){

    // this.defaultLimit = configService.get<number>('defaultLimit')
  }




  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
      
    } catch (error) {
      this.handleExceptions(error)

    }

  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto
      const pokemon = await this.pokemonModel.find();
  
    // const pokemon = await this.pokemonModel.find().limit(limit).skip(offset).sort({no:1})
    console.log('pokemon: ', pokemon);
    return  this.pokemonModel.find()
      .limit(limit)
        .skip(offset)
        .sort({no:1});
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term});
      
    }else if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
      
    }else if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term});
      
    }

    if (!pokemon) throw new NotFoundException(`Pokemon con id: ${term} no existe `)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);

      if(updatePokemonDto.name){
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()
      }
      const pokenonUpdate = await pokemon.updateOne( updatePokemonDto, {new: true})
  
      if (!pokemon) {
        throw new NotFoundException(`Pokemon con id: ${term} no existe`);
      }
  
      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch (error) {
      this.handleExceptions(error)
    }
  }
  

  async remove(id: string) {
    // try {
    //   const deletedPokemon = await this.pokemonModel.findByIdAndRemove(id);
  
    //   if (!deletedPokemon) {
    //     throw new NotFoundException(`Pokemon con id: ${id} no existe`);
    //   }
  
    //   return `El Pokémon con ID ${id} ha sido eliminado correctamente.`;
    // } catch (error) {
    //   throw new InternalServerErrorException(`No se puede eliminar el Pokémon. Chequear logs`);
    // }

    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id})
    if (deletedCount === 0) throw new BadRequestException(`Pokemon con id: ${id} no existe`)
    return 'Pokemon Eliminado'
  }


  private handleExceptions(error: any){
    console.log('error: ', error);
    if (error.code ===11000){
      throw new BadRequestException(`Pokemon ya existe en BD ${ JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`No se puede actualizar el Pokemon. Chequear logs`);

  }
}
