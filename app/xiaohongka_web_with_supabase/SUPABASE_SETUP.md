# Supabase 配置说明

## 概述
小红卡项目已经集成了 Supabase 作为生产环境的数据库后端，用于访问统计和在线用户追踪功能。

## 已完成的功能

### 1. 访问统计系统
- **功能**: 记录网站访问量，包括累计访问量、今日访问量和服务患者数量
- **实现**: 使用 Supabase Edge Functions `increment-visit` 和 `get-visit-stats`
- **显示**: 在主页顶部显示美观的统计卡片

### 2. 在线用户追踪
- **功能**: 实时统计当前在线用户数量
- **实现**: 使用 Supabase Edge Functions `update-online-status`
- **显示**: 在访问统计下方显示在线用户数
- **更新频率**: 每30秒自动更新一次

### 3. 数据持久化
- **数据库**: PostgreSQL (通过 Supabase)
- **表结构**:
  - `site_stats`: 网站总体统计
  - `daily_visits`: 每日访问统计
  - `visit_logs`: 访问日志
  - `online_users`: 在线用户追踪

## 环境配置

### 环境变量
项目已配置以下环境变量 (`.env.local`):
```env
VITE_SUPABASE_URL=https://ivyzhfcggneaktkvzvuz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eXpoZmNnZ25lYWt0a3Z6dnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDI3MjMsImV4cCI6MjA2NjY3ODcyM30.iC1NO36D5WJ6twh1Cu3t75lMEHi3f_0cdEruCTVW_7g
```

### 项目信息
- **Supabase URL**: https://ivyzhfcggneaktkvzvuz.supabase.co
- **项目名称**: tiny-red-card
- **数据库**: PostgreSQL
- **区域**: 亚太地区

## 组件说明

### VisitCounter 组件
**位置**: `src/components/VisitCounter.tsx`

**功能**:
- 显示累计使用人次、今日访问量、服务患者数量和统计日期
- 自动记录新用户访问（使用 sessionStorage 防重复计数）
- 美观的四栏布局，支持响应式设计
- 动态加载效果和动画

**数据来源**: Supabase Edge Functions

### OnlineUserTracker 组件
**位置**: `src/components/OnlineUserTracker.tsx`

**功能**:
- 实时显示当前在线用户数量
- 每30秒自动更新在线状态
- 生成唯一的会话ID追踪用户
- 自动清理过期会话（5分钟超时）

**数据来源**: Supabase Edge Functions

## API 接口

### 访问统计 API
**端点**: `/api/counter`

**GET 方法**:
- 获取当前访问统计数据
- 返回: `todayCount`, `totalCount`, `servedPatients`, `date`

**POST 方法**:
- 记录新的访问
- 自动增加计数器
- 返回更新后的统计数据

### Supabase Edge Functions

#### increment-visit
**路径**: `/functions/v1/increment-visit`
**方法**: POST
**功能**: 增加访问统计

#### get-visit-stats
**路径**: `/functions/v1/get-visit-stats`
**方法**: GET
**功能**: 获取访问统计

#### update-online-status
**路径**: `/functions/v1/update-online-status`
**方法**: POST
**功能**: 更新在线用户状态

## 安全特性

### 1. 行级安全 (RLS)
所有数据库表都启用了行级安全策略：
- 公开读取权限
- 服务端写入权限
- 会话管理权限

### 2. 防重复计数
- 使用 sessionStorage 记录已访问用户
- 同一会话不重复计数

### 3. 会话管理
- 自动生成唯一会话ID
- 定期清理过期会话
- 保护用户隐私

## 部署状态

✅ **已完成**:
- Supabase 项目创建和配置
- 数据库表结构设计
- Edge Functions 部署
- 前端组件集成
- 环境变量配置
- 安全策略设置

✅ **功能验证**:
- 访问统计正常工作
- 在线用户追踪正常
- 数据持久化正常
- 前端显示正常

## 监控和维护

### 1. 性能监控
- 监控 Edge Functions 执行时间
- 关注数据库查询性能
- 检查 API 响应时间

### 2. 数据备份
- Supabase 自动备份已启用
- 定期导出重要统计数据

### 3. 安全检查
- 定期审查 RLS 策略
- 监控异常访问模式

## 故障排除

### 常见问题
1. **连接失败**: 检查环境变量配置
2. **权限错误**: 验证 RLS 策略设置
3. **函数超时**: 优化数据库查询性能
4. **CORS 错误**: 确认 CORS 头配置正确

### 调试方法
- 使用 Supabase Dashboard 查看日志
- 在 Edge Functions 中添加 console.log
- 检查数据库查询执行计划
- 使用浏览器开发者工具检查网络请求

## 联系信息

如有问题或需要技术支持，请联系：
- **邮箱**: service@xiaoyibao.com.cn
- **GitHub**: https://github.com/cancer-complications-lifeguard-card
- **官网**: https://www.xiaohongka.com.cn

---

**最后更新**: 2024年6月28日
**维护者**: 小红卡开发团队