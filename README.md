
# Calcetto : Table football app manager

![Build/Test/Analyze ](https://github.com/paolocattani/calcetto/workflows/Pipeline%20(%20Build/Test/Analyze%20)/badge.svg)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=alert_status)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=security_rating)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)


[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=ncloc)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=bugs)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=paolocattani_calcetto)





## Technologies in this project
### Frontend
  - [Reactjs](https://reactjs.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - Routing : [React Router](https://github.com/ReactTraining/react-router#readme)
  - Style :
    - Framework : [Bootstrap 4](https://getbootstrap.com/)
    - Icons : [Fontawesome 5](https://github.com/FortAwesome/react-fontawesome)
    - Notifications : [React Toastify](https://github.com/fkhadra/react-toastify#readme)
    - Tables : [React Bootstrap Table](https://github.com/react-bootstrap-table/react-bootstrap-table2#readme)
  - State Managment : [Redux]()
    - Middleware : [Saga](https://redux-saga.js.org/)
    - Persistance : [Redux Persist](https://github.com/rt2zz/redux-persist#readme)
      - Storage : [Localforage](https://github.com/localForage/localForage)
  - Internationalization : [i18next](http://i18next.com)
      - [React implementation](https://github.com/i18next/react-i18next)
      - [Language Detector](https://github.com/i18next/i18next-browser-languageDetector)
      - [Load Resources](https://github.com/i18next/i18next-http-backend)
  - Misc :
    - [Jokes](https://sv443.net/jokeapi/v2/)
  - Test :
    - [Jest](https://jestjs.io/)
    - [Ts-Jest](https://kulshekhar.github.io/ts-jest)
    - [React Testing Library](https://github.com/testing-library)

### Backend
  - [Express](https://expressjs.com/)
    - [cookie parser](https://github.com/expressjs/cookie-parser#readme)
    - [helmet](https://helmetjs.github.io/)
    - [web token](https://github.com/auth0/node-jsonwebtoken#readme)
    - [nodemon](http://nodemon.io)
    - [concurrently](https://github.com/kimmobrunfeldt/concurrently#readme)
    - [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
  - ORM : [Sequelize](https://sequelize.org/)
    - [Sequelize typescript](https://github.com/RobinBuschmann/sequelize-typescript#readme)
  - Db : [Postgres](https://www.postgresql.org/)
  - Logger : [Log4js](https://log4js-node.github.io/log4js-node/)


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
  # - Update app version
  # - Build
  # - Analyze
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
  - Test : [React Testing library](https://www.robinwieruch.de/react-testing-library)

  - Test : [Redux + Router](https://stackoverflow.com/questions/50285084/how-to-test-a-react-component-that-has-router-redux-and-two-hocs-with-jest-a)
  - Test : Enzyme - [Shallow/Mount/Render](https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913#:~:text=Always%20begin%20with%20shallow,in%20lifecycle%20methods%2C%20use%20render)
  - Test : Enzyme [Testing FC](https://medium.com/@acesmndr/testing-react-functional-components-with-hooks-using-enzyme-f732124d320a)
  -----
  - Shell : sed - [Substitute variable using sed](https://zhu45.org/posts/2016/Dec/21/environment-variable-substitution-using-sed/)
