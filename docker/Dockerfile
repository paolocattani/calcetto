
# Github container registry : https://docs.github.com/en/packages/guides/configuring-docker-for-use-with-github-packages
#
#   $ docker build -t docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4 -f docker/Dockerfile --build-arg=dev .
#   $ docker push docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4
#   $ docker pull docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4

# From project root :
#   docker build -t paolocattani/calcetto:v2.13.4 -f docker/Dockerfile --build-arg=prod .
#   docker run -d -p 5001:5001 paolocattani/calcetto:v2.13.4

#!! Path are relative to the build context ( project root )
# Latest node LTS
FROM node:14-alpine

# Author
LABEL maintainer="Paolo Cattani <paolocattani0501@gmail.com>"
# Env
ARG ENV="${ENV:-dev}"
ARG BUILD_FOLDER="/usr/app/build"
ARG WORK_FOLDER="/usr/app/src"

# Working dir
WORKDIR ${WORK_FOLDER}

# Final Build
RUN mkdir ${BUILD_FOLDER}

# cit."This allows us to take advantage of cached Docker layers."
COPY package*.json  ./
COPY server/package*.json  server/

# Cleanup package.json
# Prune test dependencies to speedup build process
RUN npm uninstall \
    cypress @cypress/code-coverage @cypress/instrument-cra @cypress/webpack-preprocessor \
    @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event \
    cypress-intellij-reporter cypress-plugin-snapshots cypress-skip-and-only-ui cypress-watch-and-reload

# Copy the correct env
COPY docker/.env.${ENV} ./.env

# Install pm2
RUN npm install -g pm2
# FIXME:
RUN pm2 install pm2-intercom

# Install dependecies
# Don't want to update package-lock.jso
RUN npm ci && cd server && npm ci

# Copy app source
# Use .dockerignore to handle exclusions
COPY . .
RUN ls -l
COPY secrets .

RUN pwd && ls -l
# Build client
RUN npm run CRA:build && \
    # Build server
    cd server && npm run build && cd .. && \
    # Copy build result to BUILD_FOLDER
    cp build ${BUILD_FOLDER} && \
    cp server/build_server ${BUILD_FOLDER} && \
    # Install required lib into BUILD_FOLDER
    cd ${BUILD_FOLDER} && ls -l && \
    npm install --only=prod && cd ${WORK_FOLDER}

# Reduce image size
RUN rm -f ${WORK_FOLDER}

RUN pwd && ls -l

# App
EXPOSE 5001
# PM2 : Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554

# CMD
CMD pm2-runtime --public $(cat secret/.pm2.public) --secret $(cat secret/.pm2.secret) start ecosystem.config.js --env production





