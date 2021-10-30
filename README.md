# api-express-mongoDB

Create a basic api with express, mongoDb, mongoose and JWT

## Features

- ![NodeJS](https://img.shields.io/badge/NODE.JS-black?style=plastic&logo=node.js)
- ![Express.js](https://img.shields.io/badge/EXPRESS.JS-black?style=plastic&logo=express)
- ![MongoDB](https://img.shields.io/badge/MongoDB-black?style=plastic&logo=mongodb)
- ![JWT](https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens)
- ![EsLint](https://img.shields.io/badge/ESLint-black?style=plastic&logo=eslint)
- ![TypeScript](https://img.shields.io/badge/typescript-black?style=plastic&logo=typescript)

## Getting starting

### Tools

Check that [`Nodejs`](https://nodejs.org/en/download/) is installed :

```sh
$ node -v
```

### Install all dependencies

Install all dependencies :

```sh
$ yarn
$ npm install
```

### Environment

Create .env file based on .env.example and modify variables if needed.

```sh
# General settings
PORT=3000

# Database settings
MONGO_URL=your_mongo_url

# JWT
SECRET_KEY=your_secret_key
```

### Scripts

Execute eslint :

```sh
$ yarn lint
```

Compile the TypeScript files:

```sh
$ yarn build
$ yarn build:watch
```

Start development server :

```sh
$ yarn dev
```

Start production server :

```sh
$ yarn start
```

### Routes

#### GET

Get all movies

```
 GET /api/movies
```

Get all movies based on a exact filter

```
 GET /api/movies?type=Sci-Fi
```

Get movie by id

```
 GET /api/movies/:id
```

#### POST

Signup new user

```
POST /api/auth/signup
```

Example body :

```javascript
{
    "email": "john.doe@gmail.com",
    "username": "john"
    "password": "12345"
}
```

Login user

```
POST /api/auth/login
```

Example body :

```javascript
{
    "email": "john.doe@gmail.com",
    "password": "12345"
}
```

Post new movie

```
POST /api/movies/
```

Example body for movie :

```javascript
{
    "title": "Jurassic Park",
    "director": "Steven Spielberg",
    "year": "1993",
    "rating": 8,
    "duration": 127,
    "type": "Adventure"
}
```

#### PUT

Update movie by id

```
PUT /api/movies/:id
```

Example body for movie :

```javascript
{
    "title": "The Godfather"
}
```

or

```javascript
{
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": "1972"
}
```

or

```javascript
{
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": "1972",
    "rating": 9,
    "duration": 175,
    "type": "Drama"
}
```

Etc...

#### DELETE

Delete movie by id

```
DELETE /api/movies/
```
