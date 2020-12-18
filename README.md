# Calcetto : Table football app manager

<p align="center">
    <a href=""><img src="https://github.com/paolocattani/calcetto/workflows/Pipeline%20(%20Build/Test/Analyze%20)/badge.svg" alt="Build/Test/Analyze"></a>
    <a href=""><img src="https://github.com/paolocattani/calcetto/workflows/CodeQL/badge.svg" alt="CodeQL"></a>
</p>
<p align="center">
    <a href="https://david-dm.org/paolocattani/calcetto"><img src="https://david-dm.org/paolocattani/calcetto.svg" alt="Dependency Status"></a>
    <a href="https://david-dm.org/paolocattani/calcetto/?type=dev"><img src="https://david-dm.org/paolocattani/calcetto/dev-status.svg" alt="devDependency Status"></a>
</p>
<p align="center">
    <a href="https://dashboard.cypress.io/projects/sxebxi/analytics/runs-over-time"><img src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/sxebxi/develop&style=flat&logo=cypress" alt="Integration"></a>
</p>
<p align="center">
    <a href="https://sonarcloud.io/dashboard?id=paolocattani_calcetto"><img src="https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=sqale_rating" alt="Maintainability Rating"></a>
    <a href="https://sonarcloud.io/dashboard?id=paolocattani_calcetto"><img src="https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=security_rating" alt="Security Rating"></a>
    <a href="https://sonarcloud.io/dashboard?id=paolocattani_calcetto"><img src="https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=reliability_rating" alt="Reliability Rating"></a>
    <br />
    <a href="https://sonarcloud.io/dashboard?id=paolocattani_calcetto"><img src="https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=ncloc" alt="Lines of Code"></a>
    <a href="https://sonarcloud.io/dashboard?id=paolocattani_calcetto"><img src="https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=duplicated_lines_density" alt="Duplicated Lines (%)"></a>
    <a href="https://sonarcloud.io/dashboard?id=paolocattani_calcetto"><img src="https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=bugs" alt="Bugs"></a>
    <a href="https://sonarcloud.io/dashboard?id=paolocattani_calcetto"><img src="https://sonarcloud.io/api/project_badges/measure?project=paolocattani_calcetto&metric=vulnerabilities" alt="Vulnerabilities"></a>
</p>


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
  - State Managment :
    - [Redux](https://github.com/reduxjs/redux)
    - Middleware : [Saga](https://redux-saga.js.org/)
    - Persistance : [Redux Persist](https://github.com/rt2zz/redux-persist#readme)
      - Storage : [Localforage](https://github.com/localForage/localForage)
  - Internationalization : [i18next](http://i18next.com)
      - [React implementation](https://github.com/i18next/react-i18next)
      - [Language Detector](https://github.com/i18next/i18next-browser-languageDetector)
      - [Load Resources](https://github.com/i18next/i18next-http-backend)
  - Swagger
    - [Swagger UI](https://github.com/swagger-api/swagger-ui)
    - [Open API 3](https://swagger.io/specification/)
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
  - ORM :
    - [Sequelize](https://sequelize.org/)
    - [Sequelize typescript](https://github.com/RobinBuschmann/sequelize-typescript#readme)
  - Db :
    - [Postgres](https://www.postgresql.org/)
  - Logger :
    - [Log4js](https://log4js-node.github.io/log4js-node/)
  - Dev
    - [Nodemon](https://github.com/remy/nodemon)
  - Detect memory leak
    - [MemWatch](https://github.com/airbnb/node-memwatch#readme)
    - [Node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/)

### Test
  - [Jest](https://jestjs.io/)
  - [Ts-Jest](https://kulshekhar.github.io/ts-jest)
  - [Supertest](https://github.com/visionmedia/supertest#readme)
  - E2E : [Cypress](https://www.cypress.io/)
    - [Run Cypress on WSL2](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress)
    - [Ubuntu on WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
    - [Cucumber](https://cucumber.io/) :
      - [Integrate Cypress and Cucumber](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)
    - [UI Testing Best pratictices](https://github.com/NoriSte/ui-testing-best-practices/blob/master/sections/server-communication-testing/test-request-and-response-payload.md)

### Cli
  - [sed](https://zhu45.org/posts/2016/Dec/21/environment-variable-substitution-using-sed/)
  - [sed & awk](https://medium.com/faun/https-medium-com-me-sanjeev3d-sed-awk-f25c77ae4d4f)
  - [grep, awk, sed](https://www-users.york.ac.uk/~mijp1/teaching/2nd_year_Comp_Lab/guides/grep_awk_sed.pdf)
  - [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

### Heroku
  - Plugins :
    - [heroku-builds](https://github.com/heroku/heroku-builds#cancel-build)


## Development

  Backend runs with [nodemon](https://www.npmjs.com/package/nodemon) and [ts-node](https://www.npmjs.com/package/ts-node) to enable live reload along with typescript compilations.
  Frontend is bootstraped with [CRA](https://github.com/facebook/create-react-app).

  ```bash

  # Together
  npm run dev:server

  # Detached
  npm run dev:server
  npm run dev:client

  # Bundle size
  npm run analyze

  # Eslint report ( used by Sonarcloud )
  npm run lint:report

  ```

## Cli
  Cli utilities for development

  ```bash
  # Update app version
  sh ./cli/update_version.sh [option]
  # Option : --major, --minor, --patch

  # Build app. Steps :
  # - Build Fe
  # - Create eslint report and analyze bundle size
  # - Run test coverage ( Fe + Be )
  sh ./cli/build.sh

  # Release : Update version and build
  sh ./cli/build.sh
  ```

## Test
  ```bash

  # Test
  npm run test

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

## Docker
  ```bash

  # Build image example
  docker build -t paolocattani/calcetto_v1 -f ./docker/Dockerfile --no-cache .

  ```

## Heroku
  ```bash
  # Login
  heroku login

  # Add Redis
  # TODO: https://elements.heroku.com/addons/redistogo

  # List builds
  heroku builds -a $APP_NAME

  # Cancel pending build
  heroku builds:cancel $ID -a $APP_NAME

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


## Topic to explore
- [Sonar typescript:S4784](https://github.com/uhop/node-re2/)
- [Memory leak](https://medium.com/tech-tajawal/memory-leaks-in-nodejs-quick-overview-988c23b24dba#:~:text=There're%20many%20tools%20and,that%20the%20leakage%20is%20real.)

