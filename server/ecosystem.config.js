module.exports = {
    apps: [{
      name: 'calcetto_server',
      script: './server.ts',
      exec_mode:'fork',
      instances: '1',
      /* FIXME:
        cluster vs fork     : https://stackoverflow.com/questions/34682035/cluster-and-fork-mode-difference-in-pm2
        pm2 with ts-node    : https://github.com/Unitech/pm2/issues/3503
        pm2 cluster         : https://pm2.keymetrics.io/docs/usage/cluster-mode/
        pm2 and websocket   : https://stackoverflow.com/questions/51319971/how-to-implement-pm2-clustering-with-websockets-nodejs

        exec_mode:'cluster',
        instances: '-1',
      */
      interpreter : 'node',
      interpreter_args: '-r ts-node/register/transpile-only -r tsconfig-paths/register',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
    }]
};