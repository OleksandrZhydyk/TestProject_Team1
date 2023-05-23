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

**Response**
```json
{
  "message": "Successfully registered"
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
  "refresh": "string",
  "user": {
    "id": "int",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "is_active": "bool",
    "is_superuser": "bool"
  }
}
```

### User Refresh Token

- URL: `http://api.example.com/api/v1/auth/refresh/`
- Method: POST

**Request**

```json
{
  "refresh": "string"
}
```

**Response**
```json
{
  "access": "string"
}
```

### Get User Data

- URL: `http://api.example.com/api/v1/me`
- Method: GET

**Response**

```json
{
  "id": "int",
  "username": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "is_active": "bool",
  "is_superuser": "bool"
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
      "id": "int",
      "name": "string",
      "price": "int",
      "description": "string",
      "sex_and_age": "string",
      "season": "string",
      "created_at": "YYYY-MM-DDTHH:mm:ss.ssssssZ",
      "updated_at": "YYYY-MM-DDTHH:mm:ss.ssssssZ",
      "photos": [
        {
          "name": "string",
          "image": "img_url"
        }
      ],
      "category": {
        "name": "string",
        "slug": "string"
      }
    }
  ]
}
```

#### Filter fields
* season
* sex_and_age
* category
* min_price
* max_price

#### Search field
* name

### Get product Data

- URL: `http://api.example.com/api/v1/product/{slug}`
- Method: GET

**Response**

```json

{
    "id": "int",
    "photos": [
        {
            "name": "string",
            "image": "img_url"
        },
        {
            "name": "string",
            "image": "img_url"
        },
        {
            "name": "string",
            "image": "img_url"
        }
    ],
    "sizes": [
        {
            "size": "string",
            "color": "string",
            "stock_quantity": "int"
        },
        {
            "size": "string",
            "color": "string",
            "stock_quantity": "int"
        }
    ],
    "category": {
        "name": "string",
        "slug": "string"
    },
    "comments": [
        {
            "text": "string",
            "created_at": "YYYY-MM-DDTHH:mm:ss.ssssssZ"
        },
        {
            "text": "string",
            "created_at": "YYYY-MM-DDTHH:mm:ss.ssssssZ"
        }
    ],
    "name": "string",
    "price": "float",
    "description": "string",
    "created_at": "YYYY-MM-DDTHH:mm:ss.ssssssZ",
    "updated_at": "YYYY-MM-DDTHH:mm:ss.ssssssZ",
    "slug": "string",
    "sex_and_age": "string",
    "season": "string"
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

### Make products order

- URL: `http://api.example.com/api/v1/product/makeorder`
- Method: POST

**Request**

```json
[
  {
    "id": "int",
    "slug": "string",
    "quantity": "int",
    "color": "string",
    "size": "string"
  }
]
```

**Response**
```json
{
  "message": "Successfully ordered"
}
```
