module.exports = {
  apps: [{
    name: 'bun-fastify',
    script: 'index.js',
    instances: 2, // 应用实例数量
    autorestart: true, // 异常自动重启
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'prod',
    },
  }],
}
