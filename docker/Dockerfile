FROM node:20-alpine

WORKDIR /app

ADD . /app

# 安装pm2全局
RUN npm config set registry https://registry.npmmirror.com && \
    npm i -g bun && \
    npm i -g pm2 && \
    bun install && \
    bun run dbpull

# 暴露应用端口
EXPOSE 3100 3200

# 定义启动命令
CMD ["pm2-runtime", "start", "ecosystem.config.js"]