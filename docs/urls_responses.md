## API Endpoints


### User Registration

- URL: `https://api.example.com/api/v1/auth/register/`
- Method: POST

**Response**

```json
{
  "username": "string",
  "password": "string",
  "password_confirm": "string"
}
```

### User Log In

- URL: `https://api.example.com/api/v1/auth/login/`
- Method: POST

**Request**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response**
```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### User Refresh Token

- URL: `https://api.example.com/api/v1/auth/refresh/`
- Method: POST

**Request**

```json
{
  "refresh_token": "string"
}
```

**Response**
```json
{
  "access_token": "string"
}
```

### Get User Data

- URL: `https://api.example.com/api/v1/user/{id}`
- Method: GET

**Response**

```json
{
  "id": "int",
  "username": "string",
  "email": "string",
  "is_active": "bool",
  "is_superuser": "bool",
  "first_name": "string",
  "last_name": "string"
}
```

### Get products Data

- URL: `https://api.example.com/api/v1/product`
- Method: GET

**Response**

```json
{
  "count": "int",
  "next": "https://api.example.org/api/v1/product/?page=5",
  "previous": "https://api.example.org/api/v1/product/?page=3",
  "results": [
    {
      "name": "string",
      "price": "int",
      "description": "string",
      "created_at": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "updated_at": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "images": [
        "img_urls"
      ]
    }
  ]
}
```

### Get product Data

- URL: `https://api.example.com/api/v1/product/{slug}`
- Method: GET

**Response**

```json

{
  "name": "string",
  "price": "int",
  "description": "string",
  "created_at": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "updated_at": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "sizes": [
    "string"
  ],
  "images": [
    "img_urls"
  ],
  "comments": [
    {
      "user": {
        "username": "string",
        "first_name": "string",
        "last_name": "string"
      },
      "text": "string",
      "created_at": "YYYY-MM-DDTHH:mm:ss.sssZ"
    }
  ]
}
```

### Get product Category

- URL: `https://api.example.com/api/v1/product/category`
- Method: GET

**Response**

```json
[
  {
    "parent": "object",
    "name": "string",
    "slug": "string"
  }
]
```
