<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo - JEFERSON DELGADO

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos Que se aloja en docker
```
docker-compose up -d
```
6. Clonar el archivo .env.temple a .env
```
7. Arrancar servidor-proyecto
```
npm run -dev
```

8. Poblar la base de datos con la API de pokemon
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest