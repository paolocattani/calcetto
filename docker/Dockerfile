
# Github container registry : https://docs.github.com/en/packages/guides/configuring-docker-for-use-with-github-packages
#
#   $ docker build -t docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4 -f docker/Dockerfile --build-arg=dev .
#   $ docker push docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4
#   $ docker pull docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4

# From project root : docker build -t paolocattani/calcetto:v2.13.4 -f docker/Dockerfile --build-arg=prod .

#!! Path are relative to the build context ( project root )
# Latest node LTS
FROM node:14-alpine

# Author
LABEL maintainer="Paolo Cattani <paolocattani0501@gmail.com>"
# Env
ARG ENV="${ENV:-dev}"
# Working dir
WORKDIR /usr/src/ap
# cit."This allows us to take advantage of cached Docker layers."
COPY package*.json  ./
COPY server/package*.json  server/
# Cleanup package.json ( to reduce image size as much as possibile )
RUN npm uninstall \
    cypress @cypress/code-coverage @cypress/instrument-cra @cypress/webpack-preprocessor \
    @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event \
    cypress-intellij-reporter cypress-plugin-snapshots cypress-skip-and-only-ui cypress-watch-and-reload

# RUN sed -i '/cypress/d' ./package.json

# Copy the correct env
COPY docker/.env.${ENV} ./.env

# Install pm2
RUN npm install -g pm2
# FIXME:
# RUN pm2 install pm2-intercom

# Install dependecies
# Don't want to update package-lock.jso
RUN npm ci && cd server && npm ci

# Copy app source
# Use .dockerignore to handle exclusions
COPY . .

# Build client
RUN npm run CRA:build
# TODO: build server

# Reduce image size
RUN rm -f node_modules

# App
EXPOSE 5001
# PM2 : Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554

# CMD
CMD pm2-runtime --public $(cat secret/.pm2.public) --secret $(cat secret/.pm2.secret) start ecosystem.config.js --env production





