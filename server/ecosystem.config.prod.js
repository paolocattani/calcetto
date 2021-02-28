module.exports = {
	apps: [
		{
			name: 'calcetto_server',
			script: './server/server.js',
			exec_mode: 'cluster',
			instances: '3',
			interpreter: 'node',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
