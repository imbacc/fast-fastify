# 编译镜像
# docker build -t test:1.0.0 .
# 运行容器 挂载-v /home方便下次更新代码即可，无需编译后再运行容器 pm2 restart ecosystem.config.js 或 docker restart test
# docker run --name test -p 3100:3100 -p 3200:3200 -v /home:/app -it -d test:1.0.0

# 进入容器 bash or sh
# docker exec -it test bash
# docker exec -it test sh
# ->
# 容器内部#pm2 list

# 指定时区
# -e TZ=Asia/Shanghai

# 快速运行容器版(无需docker编译，依赖于node原镜像，只运行容器) /home=dist编译代码放置路径
# docker run --name test2 -p 3100:3100 -p 3200:3200 -w /app -v /home:/app -itd node:20-alpine sh -c "set -e && npm config set registry https://registry.npmmirror.com && npm i -g pnpm && npm i -g pm2 && pnpm install && pnpm run dbpull && pm2-runtime start ecosystem.config.js"
