import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),// este debe ir de primero ya que carga las variables de entorno
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),

    // esta es la coneccion de la base de datos,el nombre y puerto 
    MongooseModule.forRoot(process.env.MONGODB,
        {
          dbName: 'pokemondb'//nombre base de datos  
        }
      ),//process.env.MONGODB esto es una variable de entorno que se encuentra en el archivo .env
    PokemonModule,
    CommonModule,
    SeedModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {
  constructor(){
    console.log(process.env)
  }
}
