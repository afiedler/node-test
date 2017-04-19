## Installation
Run either `npm install` or `yarn` to install dependencies.

## Starting the server
Start the server with `npm start` or `node server.js`. The server will listen on `http://localhost:4000`.

## Testing the server
The server can be tested with `curl`:

```
curl -H "Content-Type: application/json" -X POST -d '[[3,1,4],[1,5,9],[2,6,5]]' http://localhost:4000/
```

Result:
```
{"weight":4,"path":[1,1,2]}
```

## Running unit tests
There are some unit tests for the `minWeightPath` function. They can be run with `npm test`.