
# Calcetto : Table football app manager

![Node.js CI](https://github.com/paolocattani/calcetto/workflows/Node.js%20CI/badge.svg?branch=develop&event=push)
![Code Quality](https://www.code-inspector.com/project/11107/score/svg)
![Code Grade](https://www.code-inspector.com/project/11107/status/svg)

## Development

  Backend runs with [nodemon](https://www.npmjs.com/package/nodemon) and [ts-node](https://www.npmjs.com/package/ts-node) to enable live reload along with typescript compilations.
  Frontend is bootstraped with [CRA](https://github.com/facebook/create-react-app).

  ```bash
  # Together
  npm run dev:server

  # Detached
  npm run dev:server
  npm run dev:client
  ```

## Test
  ```bash
  # Test
  npm run CRA:test

  # Coverage
  npm run test:coverage
  ```


## Production
  ```bash
  # Build client
  sh ./build.sh

  # Build server
  npm run prod:build:server
  ```



## Guides
  - SSE - Server Sent Events : [express-sse](https://www.npmjs.com/package/express-sse)
  - IIFE : [a trick to use async function inside not async functions](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-stop-feeling-iffy-about-using-an-iife-7b0292aba174)
  -----
  - Test : E2E - [jest-test-express-react](https://spin.atomicobject.com/2020/04/22/jest-test-express-react/)
  - Test : Redux - [Test connected component](https://www.robinwieruch.de/react-connected-component-test)
