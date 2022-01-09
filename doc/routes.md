# Routes

## GET

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

## POST

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

## PUT

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

## DELETE

Delete movie by id

```
DELETE /api/movies/
```
