module.exports = {
  apps: [
    {
      name: 'app1',
      script: './src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'prod',
        PORT: 3100,
      },
    },
    {
      name: 'app2',
      script: './src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'prod',
        PORT: 3200,
      },
    },
  ],
}
