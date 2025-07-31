# ---------- 构建阶段 ----------
FROM node:18-alpine AS builder

WORKDIR /app

# 安装系统依赖
RUN apk add --no-cache libc6-compat

# 复制依赖文件并安装
COPY package.json package-lock.json* ./
RUN npm ci

# 复制源代码
COPY . .

# 设置构建环境变量
ARG NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_TELEMETRY_DISABLED=1

# 构建应用
RUN npm run build

# 清理开发依赖，只保留生产依赖
RUN npm ci --only=production && npm cache clean --force

# ---------- 运行阶段 ----------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制必要文件（包括 src 目录和配置文件）
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src

# 安装运行时需要的工具
RUN npm install -g tsx

# 设置权限
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["tsx", "server.ts"]