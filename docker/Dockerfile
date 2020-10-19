# See :
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
#
# Redis : https://elements.heroku.com/addons/heroku-redis
#
# https://www.docker.com/blog/speed-up-your-development-flow-with-these-dockerfile-best-practices/
#

# docker build -t paolocattani/calcetto_v1 -f docker/Dockerfile .

#!! Path are relative to the build context ( project root )
# Latest node LTS
FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/ap
# cit."This allows us to take advantage of cached Docker layers."
COPY package*.json  ./

# Don't want to update package-lock.json

RUN npm ci

# Copy app source
# Use .dockerignore to handle exclusions
COPY . .

RUN ls -l

# Build client
RUN npm run CRA:build

CMD [ "node", "./node_modules/.bin/ts-node --project ./server/tsconfig.json ./server/server.ts  server.js --optimize_for_size --max_old_space_size=460 --gc_interval=100"]
