
# Github container registry : https://docs.github.com/en/packages/guides/configuring-docker-for-use-with-github-packages
#
#   $ docker build -t docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4  -f docker/Dockerfile .
#   $ docker push docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4
#   $ docker pull docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.13.4

# From project root : docker build -t paolocattani/calcetto:v2.13.4  -f docker/Dockerfile .

#!! Path are relative to the build context ( project root )
# Latest node LTS
FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/ap
# cit."This allows us to take advantage of cached Docker layers."
COPY package*.json  ./
COPY server/package*.json  server/

# Don't want to update package-lock.jso
RUN npm ci && \
    cd server && npm ci

# Copy app source
# Use .dockerignore to handle exclusions
COPY . .

# Build client
RUN npm run CRA:build

EXPOSE 5001

# CMD
CMD npm run start
