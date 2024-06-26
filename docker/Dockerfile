# 使用官方Node.js镜像作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /home/app

# 安装pm2全局
RUN npm config set registry https://registry.npmmirror.com \
    && npm i -g bun && npm install -g pm2 && bun install

# 复制应用源码
COPY --from=builder ../dist/*.* .
# 安装应用依赖
COPY --from=builder ../package*.json .
# # PM2配置文件
COPY --from=builder ./ecosystem.config.js .

# 设置环境变量
ENV NODE_ENV=prod

# 暴露应用端口
EXPOSE 3000

# 定义启动命令
CMD ["pm2-runtime", "start", "ecosystem.config.js"]