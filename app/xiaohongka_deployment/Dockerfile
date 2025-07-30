# ---------- 构建阶段 ----------
FROM node:18 AS builder

WORKDIR /app

# 安装依赖
COPY package.json package-lock.json* ./
RUN npm install

# 拷贝所有源代码
COPY . .

# 生成 Next.js 构建
RUN npm run build

# ---------- 生产运行阶段 ----------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 安装仅生产依赖（可选优化）
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# 拷贝构建结果和服务器启动文件
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Prisma 相关
COPY --from=builder /app/prisma ./prisma

# 端口配置
EXPOSE 3000

# 启动你的自定义服务（用 tsx）
CMD ["npx", "tsx", "server.ts"]