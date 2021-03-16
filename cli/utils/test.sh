#!/bin/bash

 heroku config:set \
    NODE_ENV=production IS_HEROKU=true \
    REACT_APP_SERVER_HOST='http://localhost:8080' \
    REACT_APP_CLIENT_VERSION=2.15.3_v2021.03.01 \
    REACT_APP_CLIENT_COMMIT_HASH=2b24455 \
    INLINE_RUNTIME_CHUNK=false GENERATE_SOURCEMAP=false \
    PORT=8080 \
    ORIGIN_WHITE_LIST='http://localhost:8080;https://calcetto2020stage.herokuapp.com;https://calcetto2020production.herokuapp.com' \
    SERVER_FORCE=false \
    SERVER_TOKEN_EXPIRES_IN=2h \
    SERVER_SECRET='O<o@cZqCJ-Qmu1-<C<e@R4m0n(nR&Sk' \
    SERVER_HASH='dummy$Hash' \
    STATIC_CONTENTS_CACHE=10000 --app calcetto2020stage