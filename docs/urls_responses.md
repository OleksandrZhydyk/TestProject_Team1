## API Endpoints


### User Registration

- URL: `http://api.example.com/api/v1/auth/register/`
- Method: POST

**Request**

```json
{
  "username": "string",
  "password": "string",
  "password_confirm": "string"
}
```

### User Log In

- URL: `http://api.example.com/api/v1/auth/login/`
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
  "access": "string",
  "refresh": "string"
}
```

### User Refresh Token

- URL: `http://api.example.com/api/v1/auth/refresh/`
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

- URL: `http://api.example.com/api/v1/user/{id}`
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

- URL: `http://api.example.com/api/v1/product`
- Method: GET

**Response**

```json
{
  "count": "int",
  "next": "http://api.example.org/api/v1/product/?page=5",
  "previous": "http://api.example.org/api/v1/product/?page=3",
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

- URL: `http://api.example.com/api/v1/product/{slug}`
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

- URL: `http://api.example.com/api/v1/product/category`
- Method: GET

**Response**

```json
[
  {
    "name": "string",
    "slug": "string",
    "sub_category": [
      {
        "name": "string",
        "slug": "string",
        "sub_category": []
      }
    ]
  }
]
```
