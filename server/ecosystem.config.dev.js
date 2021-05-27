module.exports = {
	apps: [
		{
			// App name
			name: 'calcetto_server',
			script: './server/index.js',
			// Exec mode
			exec_mode: 'cluster',
			// instances: 'max',
			instances: '1',
			instance_var: 'PM2_INSTANCE_ID',
			interpreter: 'node',
			// Timeout
			listen_timeout: 8000,
			kill_timeout: 5000,
			// Wait until process send 'ready'
			wait_ready: false,
			// Logging
			log_file: 'server.log',
			// Enviroment
			env: {
				NODE_ENV: 'production',
				ORIGIN_WHITE_LIST: 'https://calcetto2020stage.herokuapp.com;https://calcetto2020production.herokuapp.com',
				SERVER_FORCE: false,
				SERVER_TOKEN_EXPIRES_IN: '1h',
				STATIC_CONTENTS_CACHE: 10000,
			},
		},
	],
};
