
# Github container registry : https://docs.github.com/en/packages/guides/configuring-docker-for-use-with-github-packages
#
#   $ docker build -t docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4 -f docker/Dockerfile --build-arg=dev .
#   $ docker push docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4
#   $ docker pull docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4

# From project root :
#   docker build -t paolocattani/calcetto:v2.16.1 -f docker/Dockerfile --build-arg ENV=production .
#   docker run -d -p 5001:5001 paolocattani/calcetto:v2.13.4

#!! Path are relative to the build context ( project root )

# Builder 
FROM node:14-alpine as builder

# Author
LABEL maintainer="Paolo Cattani <paolocattani0501@gmail.com>"
# Build arguments
ARG ENV="${ENV:-dev}"
# Enviroment variables
ENV SRC_FOLDER="./production_build"
ENV BUILD_FOLDER="/usr/app/build"
ENV WORK_FOLDER="/usr/app/src"
# Set npm log level to warn
ENV NPM_CONFIG_LOGLEVEL warn
# Working dir
WORKDIR ${WORK_FOLDER}

# Setup s.o. enviroment
# Add git, pm2, npm@7 and python : https://github.com/nodejs/docker-node/issues/384
RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python2 && \
    npm install --quiet node-gyp -g && \
    apk add --no-cache git && \
    # Update npm to version 7 because is the one I use on my pc 
    npm install -g npm@7 pm2 && \
    # This module allow log4js to comunicate with PM2
    pm2 install pm2-intercom

# cit."This allows us to take advantage of cached Docker layers."
COPY ${SRC_FOLDER}/package*.json  ./

# Install dependecies
RUN npm install --only=prod && apk del native-deps

# Copy the correct env
COPY docker/.env.${ENV} ./.env

# Copy app source
# Use .dockerignore to handle exclusions
COPY ${SRC_FOLDER} .

# App 
EXPOSE $PORT
# PM2 : Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554

# CMD
CMD ./node_modules/.bin/pm2-runtime --public $(cat secret/.pm2.public) --secret $(cat secret/.pm2.secret) start ./ecosystem.config.js





