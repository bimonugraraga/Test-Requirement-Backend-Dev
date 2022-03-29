# Branded Things V2 API Documentation

## Endpoints:

List of available endpoints (server for user and report):

- `POST /users/register`
- `POST /users/login`
- `GET /products`
- `GET /products/:_id`
- `POST /products`
- `GET /carts`
- `POST /carts/:productId`


## 1. POST /users/register

Description:
Create New User

Request:
- body

```json
{
  "name": "string",
  "email": "string (email format)",
  "password": "string",
  "phoneNumber": "string"
}

```

_Response (201 - Created)_

```json
{
  "message": "string"
}

```

_Response (400 - Bad Request)_

```json
{
  "message": "Name Is Required!"
}
OR
{
  "message": "Email Is Required!"
}
OR
{
  "message": "Email Has Been Taken!"
}
OR
{
  "message": "Password Is Required!"
}
OR
{
  "message": "PhoneNumber Is Required!"
}
```

&nbsp;


## 2. POST /users/login

Description:
Login User

Request:
- body

```json
{
  "email": "string (email format)",
  "password": "string",
}

```

_Response (201 - OK)_

```json
{
  "access_token": "string"
}

```

_Response (400 - Bad Request)_

```json
{
  "message": "Email Is Required!"
}
OR
{
  "message": "Password Is Required!"
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password!"
}

```

&nbsp;

## 3. GET /products

Description:
Get all products



_Response (200 - OK)_

```json
[
    {
        "_id": "623ffc55173f3d4bf693a8ef",
        "productName": "CREASED-EFFECT SHIRT",
        "price": 300000,
        "imgUrl": "https://static.zara.net/photos///2022/V/0/2/p/6103/470/800/2/w/563/6103470800_6_1_1.jpg?ts=1648113520754",
        "UserId": "623ffc08173f3d4bf693a8ee",
        "Owner": {
            "_id": "623ffc08173f3d4bf693a8ee",
            "name": "Bimo Dimas",
            "email": "admin1@gmail.com",
            "phoneNumber": "082110517592"
        }
    },
    ...
]

```

&nbsp;

## 4. GET /products/:_id

Description:
Get all products

Request:
- params
```json
{
  "_id": "string"
}
```

_Response (200 - OK)_

```json
{
    "_id": "String",
    "productName": "String",
    "price": "Integer",
    "imgUrl": "String",
    "UserId": "String",
    "Owner": {
        "_id": "String",
        "name": "String",
        "email": "String",
        "phoneNumber": "String"
    }
}
```

_Response (404 - NOT FOUND)_
```json
{
  "message": "Product Not Found!"
}
```
&nbsp;

## 5. POST /products

Description:
Create New Product

Request:
- headers
```json
{
  "access_token": "string"
}
```
- body
```json
{
  "productName": "string",
  "price": "integer",
  "imgUrl": "string"
}
```

_Response (201 - Cretaded)_

```json
{
  "message": "Product Has Been Added"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Product Name Is Required!"
}
OR
{
  "message": "Product Price Is Required!"
}
OR
{
  "message": "Image URL Is Required!"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}

```
&nbsp;

## 6. GET /carts

Description:
Get user cart

Request:
- headers
```json
{
  "access_token": "string"
}


_Response (200 - OK)_

```json
[
  {
        "_id": "624081c48bf7fc2dc7d30218",
        "productName": "CREASED-EFFECT SHIRT",
        "price": 300000,
        "imgUrl": "https://static.zara.net/photos///2022/V/0/2/p/6103/470/800/2/w/563/6103470800_6_1_1.jpg?ts=1648113520754",
        "UserId": "623ffc08173f3d4bf693a8ee",
        "Owner": {
            "_id": "623ffc08173f3d4bf693a8ee",
            "name": "Bimo Dimas",
            "email": "admin1@gmail.com",
            "phoneNumber": "082110517592"
        },
        "productId": "623ffc55173f3d4bf693a8ef",
        "likedId": "623ffc08173f3d4bf693a8ee",
        "likedBy": {
            "_id": "623ffc08173f3d4bf693a8ee",
            "name": "Bimo Dimas",
            "email": "admin1@gmail.com",
            "phoneNumber": "082110517592"
        },
        "size": "XL",
        "gender": "Man"
  },
  ...
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}

```
&nbsp;

## 7. POST /carts/:productId

Description:
Add product to cart

Request:
- headers
```json
{
  "access_token": "string"
}
```
- body
```json
{
  "size": "string (default: Man)",
  "gender": "string (default: L)"
}
```

_Response (201 - Cretaded)_

```json
{
  "message": "Product Added To Cart"
}
```

_Response (404 - Bad Request)_
```json
{
  "message": "Product Not Found!"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}

```
&nbsp;

## Global Error

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```