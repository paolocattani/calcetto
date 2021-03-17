/**
 * Usage with ts-node and fork mode
 */
module.exports = {
	apps: [
		{
			name: 'calcetto_server',
			script: './server.ts',
			exec_mode: 'fork',
			instances: '1',
			interpreter: 'node',
			kill_timeout: 3000,
			wait_ready: true,
			interpreter_args: '-r ts-node/register/transpile-only -r tsconfig-paths/register',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
