# 小红卡项目 - Supabase 计数器系统

## 概述
小红卡项目使用 Supabase 作为后端服务来实现网页访问计数器功能。该系统可以准确统计网站的访问量，包括累计访问量、今日访问量和服务患者数等关键指标。

## 功能特性

### 📊 统计功能
- **累计使用人次**：所有时间的总访问量
- **今日访问量**：当天的访问次数
- **服务患者数**：通过小红卡服务的患者数量
- **统计日期**：当前统计的日期

### 🔧 技术实现
- **数据库**：Supabase PostgreSQL
- **API**：Supabase Edge Functions
- **前端**：React + TypeScript + Framer Motion
- **防重复计数**：使用 sessionStorage 确保同一用户只计数一次

## 环境配置

### 1. 环境变量
在项目根目录的 `.env` 文件中配置：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://ivyzhfcggneaktkvzvuz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eXpoZmNnZ25lYWt0a3Z6dnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDI3MjMsImV4cCI6MjA2NjY3ODcyM30.iC1NO36D5WJ6twh1Cu3t75lMEHi3f_0cdEruCTVW_7g

# 原有数据库配置
DATABASE_URL="file:./db/custom.db"
```

### 2. 依赖安装
```bash
npm install @supabase/supabase-js
```

## 项目结构

```
src/
├── lib/
│   └── supabase.ts          # Supabase 客户端配置
├── components/
│   └── VisitCounter.tsx     # 访问计数器组件
└── app/
    └── api/
        └── counter/
            └── route.ts      # 计数器 API 路由
```

## 核心组件

### 1. VisitCounter 组件
位置：`src/components/VisitCounter.tsx`

**功能**：
- 显示访问统计数据的UI组件
- 防重复计数机制
- 响应式设计，支持移动端和桌面端
- 动态效果和动画

**主要特性**：
- 使用 sessionStorage 防止同一用户重复计数
- 自动调用 API 获取和更新统计数据
- 四个统计卡片的网格布局
- Framer Motion 动画效果

### 2. API 路由
位置：`src/app/api/counter/route.ts`

**端点**：
- `GET /api/counter` - 获取访问统计数据
- `POST /api/counter` - 记录新的访问

**实现逻辑**：
- 调用 Supabase Edge Functions
- 错误处理和降级方案
- 用户代理信息收集

### 3. Supabase 客户端
位置：`src/lib/supabase.ts`

**功能**：
- 创建 Supabase 客户端实例
- 环境变量配置
- 错误处理

## 数据库表结构

根据提供的 Supabase 配置，系统使用以下表结构：

### 1. site_stats（网站总体统计表）
```sql
CREATE TABLE site_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_visits INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2. daily_visits（每日访问统计表）
```sql
CREATE TABLE daily_visits (
  id SERIAL PRIMARY KEY,
  visit_date TEXT UNIQUE NOT NULL,
  visit_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 3. visit_logs（访问日志表）
```sql
CREATE TABLE visit_logs (
  id SERIAL PRIMARY KEY,
  visit_date TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 4. online_users（在线用户追踪表）
```sql
CREATE TABLE online_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  user_agent text,
  last_seen timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
```

## Edge Functions

### 1. increment-visit
**路径**：`/functions/v1/increment-visit`
**方法**：POST
**功能**：增加访问统计

**请求体**：
```json
{
  "date": "2024-06-28",
  "userAgent": "Mozilla/5.0..."
}
```

**响应**：
```json
{
  "success": true,
  "totalVisits": 1234,
  "todayVisits": 56,
  "servedPatients": 925
}
```

### 2. get-visit-stats
**路径**：`/functions/v1/get-visit-stats`
**方法**：GET
**功能**：获取访问统计

**响应**：
```json
{
  "totalVisits": 1234,
  "todayVisits": 56,
  "servedPatients": 925
}
```

## 使用方法

### 1. 集成到页面
```tsx
import VisitCounter from '@/components/VisitCounter';

export default function Home() {
  return (
    <div>
      <VisitCounter />
      {/* 其他内容 */}
    </div>
  );
}
```

### 2. 自定义样式
计数器组件使用 Tailwind CSS，可以通过以下方式自定义：

```tsx
<VisitCounter className="custom-class" />
```

### 3. 获取统计数据
```tsx
import { supabase } from '@/lib/supabase';

// 获取统计数据
const { data, error } = await supabase.functions.invoke('get-visit-stats');

// 记录访问
const { data, error } = await supabase.functions.invoke('increment-visit', {
  body: {
    date: new Date().toISOString().split('T')[0],
    userAgent: navigator.userAgent
  }
});
```

## 部署说明

### 1. 环境变量设置
确保在部署平台上设置正确的环境变量：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Edge Functions 部署
```bash
# 部署 Edge Functions
supabase functions deploy increment-visit
supabase functions deploy get-visit-stats
```

### 3. 数据库迁移
如果需要重新创建数据库表，可以使用提供的迁移脚本。

## 监控和维护

### 1. 性能监控
- 监控 Edge Functions 的执行时间
- 关注数据库连接数和查询性能
- 定期检查存储使用情况

### 2. 错误处理
- 所有 API 调用都包含错误处理
- 提供降级方案（当 Supabase 不可用时）
- 控制台日志记录

### 3. 数据备份
- 启用 Supabase 自动备份
- 定期导出重要统计数据

## 故障排除

### 常见问题

1. **环境变量未配置**
   - 检查 `.env` 文件中的 Supabase 配置
   - 确保变量名正确（`NEXT_PUBLIC_*`）

2. **Edge Functions 不可用**
   - 检查 Supabase 项目状态
   - 重新部署 Edge Functions

3. **CORS 错误**
   - 确认 Supabase 项目中的 CORS 设置
   - 检查 Edge Functions 的 CORS 配置

4. **数据不准确**
   - 检查防重复计数机制
   - 确认数据库表结构正确

### 调试方法

1. **查看控制台日志**
   ```javascript
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
   console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set');
   ```

2. **测试 API 连接**
   ```bash
   curl -X POST https://ivyzhfcggneaktkvzvuz.supabase.co/functions/v1/increment-visit \
   -H "Authorization: Bearer YOUR_ANON_KEY" \
   -H "Content-Type: application/json" \
   -d '{"date": "2024-06-28", "userAgent": "test"}'
   ```

3. **检查 Supabase Dashboard**
   - 访问 Supabase 控制台
   - 查看 Edge Functions 日志
   - 检查数据库表数据

## 安全考虑

### 1. 环境变量安全
- 确保匿名密钥只有必要的权限
- 不要在客户端代码中暴露服务角色密钥

### 2. 数据安全
- 启用 Row Level Security (RLS)
- 定期轮换 API 密钥

### 3. 访问控制
- 使用适当的 CORS 策略
- 限制 Edge Functions 的访问频率

## 更新日志

### v2.0.0 (2024-06-28)
- 迁移到 Supabase 数据库
- 添加服务患者数统计
- 优化 UI 设计和响应式布局
- 增强错误处理和降级方案

### v1.0.0 (2024-06-27)
- 初始版本发布
- 基本的访问计数功能
- 本地 SQLite 数据库支持

## 联系方式

如有问题或建议，请联系：
- 邮箱：service@xiaoyibao.com.cn
- GitHub：https://github.com/cancer-complications-lifeguard-card
- 官网：https://www.xiaohongka.com.cn

---

**最后更新**: 2024年6月28日
**维护者**: 小红卡开发团队