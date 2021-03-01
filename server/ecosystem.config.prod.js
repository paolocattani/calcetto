module.exports = {
	apps: [
		{
			name: 'calcetto_server',
			script: './server.js',
			exec_mode: 'cluster',
			instances: '3',
			interpreter: 'node',
			env: {
				NODE_ENV: 'production',
				PORT: 5001,
				ORIGIN_WHITE_LIST:
					'http://localhost:5000;http://localhost:5001;https://calcetto2020stage.herokuapp.com;https://calcetto2020production.herokuapp.com',
				SERVER_FORCE: false,
				SERVER_TOKEN_EXPIRES_IN: '8h',
				STATIC_CONTENTS_CACHE: 10000,
			},
		},
	],
};
