## Getting Started

First, install dependencies:
```bash
npm run install
```

Then run the server(s):

```bash
npm run start
```

## About the challenge:
1. You can find the API-Design in `server/trainingSchedulerApi.yaml`.
2. About security: The easiest and most common way to secure an API is to use JWT (JSON Web Token) as a bearer token. This is a stateless authentication mechanism as the user state is never saved in the server memory. The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. If the JWT is missing or if the token is invalid, the server will respond with a 401 (unauthorized) status code. You can get a JWT by using a login for example. More information about JWT can be found [here](https://jwt.io/introduction/).