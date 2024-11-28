# 构建阶段
FROM node:20-alpine

WORKDIR /app

ADD . /app

RUN npm config set registry https://registry.npmmirror.com && \
    npm i -g pnpm && \
    npm i -g pm2 && \
    pnpm install && \
    pnpm run dbpull

EXPOSE 3100 3200

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
