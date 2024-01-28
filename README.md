# Demo Java Coffee Shop & Studio Website

This is a demo website for a Java Coffee Shop & Studio, featuring both a frontend and a backend.

- [Frontend Ropo](https://github.com/xxxJay123-p/demo_java_web)
- [Live Demo via cloudflare](https://demo-java-web.pages.dev/)

- [Backend via render](https://demo-java-web-backend.onrender.com)
![Alt text](./asset/image.png)

## Backend

The backend of the website is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/). Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web applications.

### Getting Started

To get started with the backend, you'll need to have [Node.js](https://nodejs.org/) installed on your machine. Once you've cloned this repository, navigate to the `backend` directory and run the following commands:

```bash
npm install
npm start
```

This will start the server and make it available at `http://localhost:4000`.

## Dependencies

```json
"dependencies": {
        "bcrypt": "^5.1.1",
        "cors": "^2.8.5",
        "dotenv": "^16.3.1",
        "express": "^4.18.2",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.0.4",
        "morgan": "^1.10.0",
        "nodemon": "^3.0.2",
        "uuid": "^9.0.1"
      }
```

## API Endpoints

The following API endpoints are available:

### `/products/:types`

Retrieves a list of all coffees available at the Java Coffee Shop.

#### Request Example

`GET /products/coffee`

#### Response

```json
[
  {
    "_id": "65b5f4ab11645cde31cce628",
    "type": "coffee",
    "name": "espresso",
    "description": "The Espresso is where it all begins. Its rich aroma is the heartbeat of all our coffees. We craft one simple shot of our intense roast for the most elegant of drinks.",
    "imageUrl": "https://www.costa.co.uk/static/pim/f/3/f/7/f3f7a6ec94bf5cf0e33abe514868baf9f8b5e416_cortado_thumb.jpg",
    "price": 1.45,
    "syrup": [],
    "milk": ["cow"],
    "diets": [],
    "__v": 0
  },
........
]
```

### `/coruse/`

Get `All` on database course

#### Response

```json
[
  {
    "_id": "65b60ff7505874a822118f47",
    "name": "Introduction to Coffee Roasting(Level 2)",
    "description": "Learn the basics of coffee roasting, from sourcing green beans to roasting and cupping.",
    "imageUrl": "https://coffeeculture.asia/wp-content/uploads/2022/02/Best-Online-Coffee-Classes-For-Beginners-Or-Baristas.png",
    "price": 350,
    "duration_week": 5,
    "instructor": "61e816d7c520a976a0b8c9f5",
    "__v": 0
  },
  ........
]
```

### `/signup`

Sign Up User

```json
{
  "username": "test123",
  "email": "test123@email.com",
  "password": "test123"
}
```

#### Response

```json
{
  "message": "User successfully created",
  "user": {
    "username": "test1234",
    "email": "test1234@email.com",
    "role": ["user"],
    "_id": "65b610e5505874a822118f8b"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJyZXF1aXJlIiwiZW1haWwiOiJyZXF1aXJlIiwidXNlcm5hbWUiOiJyZXF1aXJlIn0sInN0YXRlcyI6eyJyZXF1aXJlIjp7InBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwidXNlcm5hbWUiOnRydWV9LCJkZWZhdWx0Ijp7fSwibW9kaWZ5Ijp7fX19LCJvcCI6bnVsbCwic2F2aW5nIjpudWxsLCIkdmVyc2lvbkVycm9yIjpudWxsLCJzYXZlT3B0aW9ucyI6bnVsbCwidmFsaWRhdGluZyI6bnVsbCwiY2FjaGVkUmVxdWlyZWQiOnt9LCJiYWNrdXAiOnsiYWN0aXZlUGF0aHMiOnsibW9kaWZ5Ijp7InVzZXJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWV9LCJkZWZhdWx0Ijp7InJvbGUiOnRydWUsIl9pZCI6dHJ1ZX19LCJ2YWxpZGF0aW9uRXJyb3IiOm51bGx9LCJpbnNlcnRpbmciOnRydWUsInNhdmVkU3RhdGUiOnt9fSwiX2RvYyI6eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiZW1haWwiOiJ0ZXN0MTIzNEBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJY0s4MS5Ua2J2OHF6L1NyazBjMDVlL0doUkdwMmpZNklOM0ozV09GemtySFNIcVE1Qk96YSIsInJvbGUiOlsidXNlciJdLCJfaWQiOiI2NWI2MTBlNTUwNTg3NGE4MjIxMThmOGIiLCJfX3YiOjB9LCIkaXNOZXciOmZhbHNlLCJpYXQiOjE3MDY0MzA2OTMsImV4cCI6MTcwNjQzNDI5M30.E7z3qo3wdyM8pjydnquhbDKcQaRp8lBtQu7Jdx9o_5Q"
}
```

### `/login`

Login User

```json
{
  "email": "tom@tom.com",
  "password": "tom123"
}
```

#### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2MTBjMjg2MDc3ODViZGMyODM1ODAiLCJlbWFpbCI6InRvbUB0b20uY29tIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTcwNjQzMDczMywiZXhwIjoxNzA2NDM0MzMzfQ.97Hw_CecHcXPpggJ1uKYQbBQOPNMAAnV_lm40-SfCxE"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
