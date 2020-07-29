# Spotify Song Suggester API

<img src="https://img.shields.io/badge/made%20by-iatechristmas-blue?style=flat-square&logo=visual-studio-code"/>
<p>
<img src="https://img.shields.io/badge/bcrypt-2.4.3-blue"/>
<img src="https://img.shields.io/badge/cors-2.8.5-blue"/>
<img src="https://img.shields.io/badge/cross--env-7.0.2-blue"/>
<img src="https://img.shields.io/badge/dotenv-8.2.0-blue"/>
<img src="https://img.shields.io/badge/express-4.17.1-blue"/>
<img src="https://img.shields.io/badge/helmet-3.23.3-blue"/>
<img src="https://img.shields.io/badge/jest-26.1.0-blue"/>
<img src="https://img.shields.io/badge/jsonwebtoken-8.5.1-blue"/>
<img src="https://img.shields.io/badge/knex-0.21.2-blue"/>
<img src="https://img.shields.io/badge/knex--cleaner-1.3.0-blue"/>
<img src="https://img.shields.io/badge/nodemon-2.0.4-blue"/>
<img src="https://img.shields.io/badge/pg-8.3.0-blue"/>
<img src="https://img.shields.io/badge/sqlite3-5.0.0-blue"/>
<img src="https://img.shields.io/badge/supertest-4.0.2-blue"/>

## API BASE URL

<a href="https://bwft-spotify-song-suggester.herokuapp.com/"><img src="https://img.shields.io/badge/-https%3A%2F%2Fbwft--spotify--song--suggester.herokuapp.com%2F-brightgreen?style=flat-square"/></a>

### SERVER STATUS

<img src="https://img.shields.io/badge/GET%3A%20%2F-When%20active%2C%20will%20respond%20with%20the%20following%3A-green?style=flat-square"/>

```javascript
{
    "spotify_song_suggester": "API IS UP"
}
```

## Table of Contents

- [User Routes](#user-routes)
  - [Register](#register-a-user) (_POST_)
  - [Login](#login) (_POST_)
  - [User Data](#get-all-users) (_GET_)
  - [User Data by ID](#get-user-by-id) (_GET_)
  - [Update User by ID](#update-user-information) (_PUT_)
  - [Delete User](#delete-a-user) (_DELETE_)
- [Favorites Routes](#favorites-routes)
  - [Favorites Data by ID](#get-all-favorites-by-user-id) (_GET_)
  - [Add Song to Favorites](#add-song-to-favorites) (_POST_)
  - [Delete Favorite](#delete-a-favorite) (_DELETE_)

# User Routes

### REGISTER A USER

<img src="https://img.shields.io/badge/POST%3A%20-%2Fapi%2Fusers%2Fregister-green?style=flat-square"/>

#### Body

| Name       | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| First Name | String | Yes      | User first name           |
| Last Name  | String | Yes      | User last name            |
| Username   | String | Yes      | Username (must be unique) |
| Password   | String | Yes      | Password                  |

#### Example

```javascript
{
    "first_name": "Test",
    "last_name": "Test",
    "username": "test",
    "password": "test"
}
```

#### Responses:

> Will receive a **201 (Created)** response along wtih the newly created user if registration is successful

```javascript
[
  {
    id: 1,
    first_name: "Test",
    last_name: "Test",
    username: "test",
  },
];
```

> Will receive a **400 (Bad Request)** response one of the following messages if any required information is missing from the body

```javascript
{
    "message": "Missing required field: first_name"
}
```

```javascript
{
    "message": "Missing required field: last_name"
}
```

```javascript
{
    "message": "Missing required field: username"
}
```

```javascript
{
    "message": "Missing required field: password"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "errorMessage": "Server error information"
}
```

---

### LOGIN

<img src="https://img.shields.io/badge/POST%3A-%2Fapi%2Fusers%2Flogin-green?style=flat-square"/>

#### Body

| Name     | Type   | Required | Description   |
| -------- | ------ | -------- | ------------- |
| Username | String | Yes      | Username      |
| Password | String | Yes      | User password |

#### Example

```javascript
{
  "username": "test",
  "password": "test"
}
```

#### Responses:

> Will receive a **200 (OK)** response with a welcome message and a valid token if the login request is successful

```javascript
{
  "message": "Welcome to the Spotify Song Suggester API!",
  "token": "Your token will be here"
}
```

> Will receive a **400 (Bad Request)** response if any required information is missing from the body

```javascript
{
    "message": "Please enter both a username and password"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid

```javascript
{
  "message": "Access Denied: Unauthorized"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "errorMessage": "Server error information"
}
```

---

### GET ALL USERS

<img src="https://img.shields.io/badge/GET%3A%20-%2Fapi%2Fusers-green?style=flat-square"/>

#### Responses:

> Will receive a **200 (OK)** response with an array of users if the request is successful

```javascript
[
  {
    id: 1,
    username: "test",
    first_name: "Test",
    last_name: "Test",
  },
  {
    id: 2,
    username: "test2",
    first_name: "Test2",
    last_name: "Test2",
  },
];
```

> Will receive a **400 (Bad Request)** response if connecting client does not have an Authorization token in its headers

```javascript
{
    "message": "Please log in"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid or expired

```javascript
{
    "message": "Token invalid. Please log in and get a new token"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "errorMessage": "Server error information"
}
```

---

### GET USER BY ID

<img src="https://img.shields.io/badge/GET%3A-%2Fapi%2Fusers%2F%3Aid-green?style=flat-square"/>

#### Responses:

> Will receive a **200 (OK)** response with an object containing the requested user

```javascript
{
    "id": 1,
    "first_name": "Test",
    "last_name": "Test",
    "username": "test"
}
```

> Will receive a **400 (Bad Request)** response if connecting client does not have an Authorization token in its headers

```javascript
{
    "message": "Please log in"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid or expired

```javascript
{
  "message": "Token invalid. Please log in and get a new token"
}
```

> Will receive a **404 (Not Found)** response if parameter ID is invalid

```javascript
{
  "message": "User ${id} could not be found"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "errorMessage": "Server error information"
}
```

---

### UPDATE USER INFORMATION

<img src="https://img.shields.io/badge/PUT%3A%20-%2Fapi%2Fusers%2F%3Aid-green?style=flat-square"/>

#### Body

| Name       | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| First Name | String | Yes      | User first name           |
| Last Name  | String | Yes      | User last name            |
| Username   | String | Yes      | Username (must be unique) |
| Password   | String | Yes      | User password             |

#### Example

```javascript
{
    "first_name": "Test",
    "last_name": "Test",
    "username": "test",
    "password": "test"
}
```

#### Responses:

> Will receive a **200 (OK)** response with the updated user object if the request is successful

```javascript
{
    "id": 1,
    "first_name": "Test",
    "last_name": "Test",
    "username": "test",
}
```

> Will receive a **400 (Bad Request)** response and one of the following messages if connecting client does not have an Authorization token in its headers or if any required information is missing from the body

```javascript
{
    "message": "Please log in"
}
```

```javascript
{
    "message": "Missing required field: first_name"
}
```

```javascript
{
    "message": "Missing required field: last_name"
}
```

```javascript
{
    "message": "Missing required field: username"
}
```

```javascript
{
    "message": "Missing required field: password"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid or expired

```javascript
{
  "message": "Token invalid. Please log in and get a new token"
}
```

> Will receive a **404 (Not Found)** response if parameter ID is invalid

```javascript
{
  "message": "User ${id} could not be found"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "error": "Server error information"
}
```

---

### DELETE A USER

<img src="https://img.shields.io/badge/DELETE%3A-%2Fapi%2Fusers%2F%3Aid-green?style=flat-square"/>

#### Responses:

> Will receive a **200 (OK)** response if the user is deleted successfully

```javascript
{
    "message": "The user was successfully deleted"
}

```

> Will receive a **400 (Bad Request)** response if connecting client does not have an Authorization token in its headers

```javascript
{
    "message": "Please log in"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid or expired

```javascript
{
  "message": "Token invalid. Please log in and get a new token"
}
```

> Will receive a **404 (Not Found)** response if parameter ID is invalid

```javascript
{
  "message": "User ${id} could not be found"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "error": "Server error information"
}
```

---

# Favorites Routes

### GET ALL FAVORITES BY USER ID

<img src="https://img.shields.io/badge/GET%3A-%2Fapi%2Ffavorites%2F%3Aid-green?style=flat-square"/>

#### Responses:

> Will receive a **200 (OK)** response with an array of objects containing the requested user's favorites

```javascript
[
    {
        "favorite_songs": Song ID here
    },
    {
        "favorite_songs": Song ID here
    }
]
```

> Will receive a **400 (Bad Request)** response if connecting client does not have an Authorization token in its headers

```javascript
{
    "message": "Please log in"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid or expired

```javascript
{
  "message": "Token invalid. Please log in and get a new token"
}
```

> Will receive a **404 (Not Found)** response if parameter ID is invalid

```javascript
{
  "message": "User ${id} could not be found"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "errorMessage": "Server error information"
}
```

---

### ADD SONG TO FAVORITES

<img src="https://img.shields.io/badge/POST%3A-%2Fapi%2Ffavorites%2F%3Aid%2Fadd%2F%3Asong-green?style=flat-square"/>

#### Responses:

> Will receive a **201 (Created)** response along with an object containing the newly added favorite song

```javascript
{
    "favorite_songs": Song ID here
}
```

> Will receive a **400 (Bad Request)** response if connecting client does not have an Authorization token in its headers

```javascript
{
    "message": "Please log in"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid or expired

```javascript
{
  "message": "Token invalid. Please log in and get a new token"
}
```

> Will receive a **404 (Not Found)** response if parameter ID is invalid

```javascript
{
  "message": "User ${id} could not be found"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "errorMessage": "Server error information"
}
```

---

### DELETE A FAVORITE

<img src="https://img.shields.io/badge/DELETE%3A-%2Fapi%2Ffavorites%2F%3Aid%2Fremove%2F%3Asong__id-green?style=flat-square"/>

#### Responses:

> Will receive a **200 (OK)** response if the favorite is deleted successfully

```javascript
{
    "message": "The song was successfully removed from your favorites"
}

```

> Will receive a **400 (Bad Request)** response if connecting client does not have an Authorization token in its headers

```javascript
{
    "message": "Please log in"
}
```

> Will receive a **401 (Unauthorized)** response if credentials are invalid or expired

```javascript
{
  "message": "Token invalid. Please log in and get a new token"
}
```

> Will receive a **404 (Not Found)** response if parameter ID is invalid

```javascript
{
  "message": "User ${id} could not be found"
}
```

> Will receive a **500 (Internal Server Error)** response if there is an issue with the API server

```javascript
{
  "error": "Server error information"
}
```

---
