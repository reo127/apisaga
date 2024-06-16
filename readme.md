
# APISAGA

We are trying to build a single source API hub that can be used to learn api handling in any programming language. Users can build their front end portfolio in web and mobile apps using this api hub.




## Todo APIs

```http
  GET    : https://apisaga.vercel.app/todos/alltodos
  GET    : https://apisaga.vercel.app/todos/gettodo/:id
  POST   : https://apisaga.vercel.app/todos/createtodo
  PUT    : https://apisaga.vercel.app/todos/updatetodo/:id
  DELETE : https://apisaga.vercel.app/todos/deletetodo
```

| Name | API     | Parameters                |
| :-------- | :------- | :------------------------- |
| `GET` | https://apisaga.vercel.app/todos/alltodos | **NONE**|
| `GET` | https://apisaga.vercel.app/todos/gettodo/:id | **REQ Parameters**: `id`|
| `POST` | https://apisaga.vercel.app/todos/createtodo | **BODY**:  `todo` |
| `PUT` | https://apisaga.vercel.app/todos/updatetodo/:id | **REQ Parameters** :`id`, **BODY** :`todo` |
| `DELETE` | https://apisaga.vercel.app/todos/deletetodo/:id |**REQ Parameters**: `id`|

---


## Authentications  APIs

```http
  POST    : https://apisaga.vercel.app/auth/register
  POST    : https://apisaga.vercel.app/todos/gettodo/:id
  POST   : https://apisaga.vercel.app/todos/createtodo
```

| Name | API     | Parameters                |
| :-------- | :------- | :------------------------- |
| `POST` | https://apisaga.vercel.app/todos/alltodos | **BODY**:  `email` `username` `password`|
| `POST` | https://apisaga.vercel.app/auth/login | **BODY**:  `email` `username` `password`|
| `POST` | https://apisaga.vercel.app/auth/logout |**NONE**|

---


## Public  APIs

```http
  GET   : https://apisaga.vercel.app/random/joke
  GET   : https://apisaga.vercel.app/random/quote
  GET   : https://apisaga.vercel.app/random/product
  GET   : https://apisaga.vercel.app/random/products/:quantity
```

| Name | API     | Parameters                |
| :-------- | :------- | :------------------------- |
| `POST` | https://apisaga.vercel.app/random/joke | **NONE**|
| `POST` | https://apisaga.vercel.app/random/quote | **NONE**|
| `POST` | https://apisaga.vercel.app/random/product |**NONE**|
| `POST` | https://apisaga.vercel.app/random/products/:quantity |**REQ Parameters**: `quantity`|

---

