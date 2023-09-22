import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({})// delete * from pokemons
    
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    const pokemonToInsert:  {name: string, no: number}[] = []

    data.results.forEach(  ({name, url})=> {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]
      console.log('no: ', no);
      // const pokemon = await this.pokemonModel.create({name, no})
      pokemonToInsert.push({name,no})


    })
    await this.pokemonModel.insertMany(pokemonToInsert)

    return data.results;
  }
  //segunda forma de guardar datos de manera rapida
  // async executeSeed() {

  //   await this.pokemonModel.deleteMany({})// delete * from pokemons
    
  //   const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

  //   const insertPromisesArray = []

  //   data.results.forEach(  ({name, url})=> {
  //     const segments = url.split('/');
  //     const no = +segments[segments.length - 2]
  //     console.log('no: ', no);
  //     // const pokemon = await this.pokemonModel.create({name, no})
  //     insertPromisesArray.push(
  //       this.pokemonModel.create({name,no})
  //     )


  //   })
  //   await Promise.all(insertPromisesArray)

  //   return data.results;
  // }

  // la primera funcion que se hizo
  // async executeSeed() {

  //   this.pokemonModel.deleteMany({})// delete * from pokemons
    
  //   const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

  //   const insertPromisesArray = []

  //   data.results.forEach( async ({name, url})=> {
  //     const segments = url.split('/');
  //     const no = +segments[segments.length - 2]
  //     console.log('no: ', no);
  //     const pokemon = await this.pokemonModel.create({name, no})

  //   })

  //   return data.results;
  // }
}
