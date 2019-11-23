module.exports = {
  "development": {
    "use_env_variable" : "DEV_URL",
  },
  "production": {
    "use_env_variable" : "PROD_URL",
  },
  "example": {
    "use_env_variable" : "EXAMPLE_URL",
    "username": "root",
    "password": undefined,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": postgres,
    "operatorsAliases": undefined
  },
}
