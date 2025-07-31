# 小红卡设计文档

## 📋 目录

1. [项目概述](#项目概述)
2. [设计理念](#设计理念)
3. [视觉设计系统](#视觉设计系统)
4. [用户体验设计](#用户体验设计)
5. [交互设计](#交互设计)
6. [响应式设计](#响应式设计)
7. [组件设计](#组件设计)
8. [信息架构](#信息架构)
9. [可访问性设计](#可访问性设计)
10. [性能设计](#性能设计)
11. [设计规范](#设计规范)

---

## 🎯 项目概述

小红卡是一个专为癌症、罕见病等多病种患者设计的并发症管理指引生成器。本设计文档旨在阐述产品的设计理念、视觉系统、用户体验规范以及技术实现方案。

### 设计目标

- **专业性**：提供医疗级别的专业指导
- **易用性**：简单直观的操作流程
- **可靠性**：紧急情况下的快速响应
- **包容性**：适合不同年龄段和 tech-literacy 的用户
- **美观性**：现代化、清晰的视觉设计

### 用户群体

#### 主要用户
- **癌症患者**：需要并发症管理指导
- **罕见病患者**：特殊病症的应急处理
- **慢性病患者**：长期并发症的预防和管理

#### 次要用户
- **患者家属**：协助患者使用和应急处理
- **医护人员**：参考和推荐给患者
- **照护人员**：专业的护理服务提供者

---

## 🎨 设计理念

### 核心设计原则

#### 1. 医疗专业性 (Medical Professionalism)
- 基于循证医学的设计决策
- 清晰的医疗信息层级
- 专业的术语和表达方式

#### 2. 紧急可用性 (Emergency Usability)
- 紧急情况下的快速访问
- 清晰的视觉层次和操作流程
- 离线状态下的基本功能可用

#### 3. 情感关怀 (Emotional Care)
- 温暖的色彩和视觉语言
- 鼓励性和支持性的文案
- 减轻用户焦虑的设计元素

#### 4. 包容性设计 (Inclusive Design)
- 适应不同年龄段的用户
- 支持多种设备和屏幕尺寸
- 考虑不同文化背景的用户

### 设计哲学

**"在紧急时刻，每一个设计细节都可能挽救生命"**

我们相信，好的医疗应用设计不仅要美观，更要在关键时刻为用户提供准确、快速、易用的指导。小红卡的设计始终以用户的安全和需求为中心。

---

## 🎨 视觉设计系统

### 色彩系统

#### 主色调
```css
/* 小红卡主题红色 */
--primary-red: #FF3B30;
--dark-red: #D70015;
--light-red: #FF6B6B;

/* 渐变色 */
--red-gradient: linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%);
--pink-gradient: linear-gradient(135deg, #FF6B6B 0%, #FFB6C1 100%);
```

#### 辅助色
```css
/* 功能色 */
--success-green: #34C759;
--warning-yellow: #FFCC00;
--info-blue: #007AFF;
--danger-red: #FF3B30;

/* 中性色 */
--dark-gray: #1C1C1E;
--medium-gray: #6B7280;
--light-gray: #F2F2F7;
--white: #FFFFFF;
```

#### 色彩使用规范

| 颜色 | 用途 | 情感联想 | 使用场景 |
|------|------|----------|----------|
| `#FF3B30` | 主要品牌色 | 紧急、重要、专业 | 主要按钮、标题、重要提示 |
| `#34C759` | 成功状态 | 安全、完成、积极 | 成功提示、完成状态 |
| `#FFCC00` | 警告状态 | 注意、提醒、谨慎 | 警告信息、注意事项 |
| `#007AFF` | 信息状态 | 信任、稳定、可靠 | 信息提示、链接文字 |
| `#F2F2F7` | 背景色 | 干净、简洁、舒适 | 页面背景、卡片背景 |

### 字体系统

#### 字体族
```css
font-family: "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif;
```

#### 字体层级
```css
/* 标题字体 */
--font-size-h1: 36px;      /* 主标题 */
--font-size-h2: 28px;      /* 页面标题 */
--font-size-h3: 22px;      /* 区块标题 */
--font-size-h4: 18px;      /* 小标题 */

/* 正文字体 */
--font-size-body-large: 18px;  /* 大正文 */
--font-size-body: 16px;       /* 标准正文 */
--font-size-body-small: 14px;  /* 小正文 */
--font-size-caption: 12px;    /* 说明文字 */

/* 字重 */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### 行高系统
```css
--line-height-tight: 1.2;    /* 标题 */
--line-height-normal: 1.5;  /* 正文 */
--line-height-relaxed: 1.8; /* 说明文字 */
```

### 间距系统

#### 基础间距单位
```css
--spacing-xs: 4px;    /* 超小间距 */
--spacing-sm: 8px;    /* 小间距 */
--spacing-md: 16px;   /* 中等间距 */
--spacing-lg: 24px;   /* 大间距 */
--spacing-xl: 32px;   /* 超大间距 */
--spacing-2xl: 48px;  /* 2倍超大间距 */
```

#### 组件间距
```css
/* 卡片内边距 */
--card-padding-sm: 16px;
--card-padding-md: 24px;
--card-padding-lg: 32px;

/* 按钮间距 */
--button-padding-sm: 8px 16px;
--button-padding-md: 12px 24px;
--button-padding-lg: 16px 32px;
```

### 圆角系统

```css
--radius-sm: 4px;     /* 小圆角 */
--radius-md: 8px;     /* 中等圆角 */
--radius-lg: 12px;    /* 大圆角 */
--radius-xl: 16px;    /* 超大圆角 */
--radius-full: 9999px; /* 完全圆角 */
```

### 阴影系统

```css
/* 轻微阴影 */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);

/* 标准阴影 */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);

/* 深度阴影 */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);

/* 浮动阴影 */
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.2);
```

---

## 👥 用户体验设计

### 用户旅程地图

#### 1. 首次访问
- **入口**：通过搜索引擎、医生推荐或朋友分享
- **需求**：了解小红卡的功能和价值
- **痛点**：对医疗应用的信任度、操作复杂性担忧
- **设计策略**：清晰的价值主张、简单的引导流程

#### 2. 注册/使用
- **入口**：点击"开始使用"按钮
- **需求**：快速生成个性化的指引卡片
- **痛点**：填写表单的复杂性、医疗术语的理解
- **设计策略**：分步引导、术语解释、进度指示

#### 3. 紧急使用
- **入口**：紧急情况下的快速访问
- **需求**：立即获取急救指导
- **痛点**：时间紧迫、情绪紧张、操作困难
- **设计策略**：一键访问、清晰的视觉层次、大按钮设计

#### 4. 日常管理
- **入口**：定期查看和更新信息
- **需求**：管理个人信息、查看历史记录
- **痛点**：信息更新的复杂性、数据同步问题
- **设计策略**：简洁的管理界面、自动保存、数据同步

### 用户流程图

#### 主要流程：生成指引卡片
```
开始 → 选择并发症 → 填写医疗信息 → 添加联系人 → 配置护理服务 → 预览生成 → 下载保存
```

#### 紧急流程：快速访问急救指导
```
紧急情况 → 打开应用 → 选择并发症类型 → 查看急救指导 → 联系医院/120
```

### 信息架构

#### 功能模块
1. **指引生成器**：核心功能模块
   - 并发症选择
   - 医疗信息填写
   - 紧急联系人管理
   - 护理服务配置
   - 卡片预览生成

2. **AI 助手**：智能咨询模块
   - 并发症咨询
   - 风险评估
   - 个性化建议

3. **统计中心**：数据展示模块
   - 访问统计
   - 用户统计
   - 服务统计

#### 内容层级
```
Level 1: 主要功能（指引生成、AI助手、统计中心）
Level 2: 子功能（5步生成流程、聊天界面、数据展示）
Level 3: 具体操作（表单填写、按钮点击、信息查看）
Level 4: 反馈信息（成功提示、错误提示、加载状态）
```

---

## 🎯 交互设计

### 交互原则

#### 1. 即时反馈 (Immediate Feedback)
- 按钮点击有视觉反馈
- 表单输入有实时验证
- 操作结果有明确提示

#### 2. 容错设计 (Error Tolerance)
- 支持撤销操作
- 提供操作确认
- 保存用户进度

#### 3. 效率优先 (Efficiency First)
- 减少操作步骤
- 智能默认值
- 快捷键支持

#### 4. 一致性 (Consistency)
- 统一的交互模式
- 一致的视觉反馈
- 标准的操作流程

### 关键交互模式

#### 1. 步骤导航交互
```typescript
// 交互特点
- 点击步骤图标可跳转到对应页面
- 当前步骤高亮显示
- 已完成步骤显示完成状态
- 悬停效果提示可点击性
```

#### 2. 表单交互
```typescript
// 交互特点
- 实时输入验证
- 自动保存进度
- 错误提示清晰
- 支持键盘导航
```

#### 3. 紧急操作交互
```typescript
// 交互特点
- 大按钮设计，易于点击
- 鲜明的颜色对比
- 简化的操作流程
- 明确的操作反馈
```

### 动画设计

#### 加载动画
```typescript
// 脉冲动画效果
const pulseAnimation = {
  initial: { opacity: 0.6 },
  animate: { opacity: 1 },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};
```

#### 页面切换动画
```typescript
// 平滑的页面过渡
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};
```

#### 交互反馈动画
```typescript
// 按钮点击效果
const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 },
};
```

---

## 📱 响应式设计

### 断点系统

```css
/* 移动端 */
@media (max-width: 767px) {
  /* 单列布局 */
  .grid { grid-template-columns: 1fr; }
  .text { font-size: 14px; }
  .button { padding: 12px 16px; }
}

/* 平板端 */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 两列布局 */
  .grid { grid-template-columns: repeat(2, 1fr); }
  .text { font-size: 16px; }
  .button { padding: 14px 20px; }
}

/* 桌面端 */
@media (min-width: 1024px) {
  /* 多列布局 */
  .grid { grid-template-columns: repeat(4, 1fr); }
  .text { font-size: 16px; }
  .button { padding: 16px 24px; }
}
```

### 布局策略

#### 移动端优先
- **核心功能优先**：确保关键功能在小屏幕上可用
- **简化导航**：使用底部导航栏或汉堡菜单
- **大按钮设计**：适合手指点击的交互元素
- **垂直滚动**：内容垂直排列，避免水平滚动

#### 平板端优化
- **两列布局**：充分利用屏幕空间
- **手势支持**：支持滑动、缩放等手势操作
- **分屏显示**：支持多任务操作

#### 桌面端增强
- **多列布局**：最大化信息展示效率
- **键盘导航**：完整的键盘操作支持
- **窗口管理**：支持窗口缩放和分屏

### 图片和媒体响应式

```css
/* 响应式图片 */
img {
  max-width: 100%;
  height: auto;
}

/* 响应式视频 */
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 比例 */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

---

## 🧩 组件设计

### 核心组件库

#### 1. 步骤导航组件 (StepNavigation)
```typescript
interface StepNavigationProps {
  steps: Array<{
    id: number;
    title: string;
    completed: boolean;
    current: boolean;
  }>;
  onStepClick: (stepId: number) => void;
}

// 设计特点
- 水平排列的步骤指示器
- 可点击的步骤图标和文字
- 动态的连接线显示
- 清晰的完成状态指示
```

#### 2. 统计卡片组件 (StatCard)
```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    type: 'up' | 'down';
  };
  loading?: boolean;
}

// 设计特点
- 统一的卡片样式
- 图标 + 数值的清晰布局
- 可选的趋势指示器
- 加载状态的动画效果
```

#### 3. AI 聊天组件 (AIChat)
```typescript
interface AIChatProps {
  messages: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }>;
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

// 设计特点
- 消息气泡的区分设计
- 实时的输入状态反馈
- 滚动到最新消息
- 打字指示器动画
```

#### 4. 表单组件组 (FormComponents)
```typescript
// 输入框组件
interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

// 选择框组件
interface FormSelectProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
}

// 复选框组件
interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}
```

### 组件设计规范

#### 一致性原则
- **统一的命名规范**：使用清晰、一致的组件命名
- **统一的 API 设计**：相似的组件使用相似的接口
- **统一的样式系统**：共享颜色、字体、间距等设计令牌

#### 可复用性原则
- **组件解耦**：每个组件独立，不依赖特定上下文
- **属性驱动**：通过 props 控制组件状态和行为
- **插槽设计**：支持内容自定义和扩展

#### 可访问性原则
- **语义化 HTML**：使用正确的 HTML 标签
- **键盘导航**：支持完整的键盘操作
- **屏幕阅读器**：提供 ARIA 标签和描述

---

## 🏗 信息架构

### 内容策略

#### 内容层级
```
Level 1: 核心价值主张
├── "小红卡 - 并发症管理指引生成器"
├── "专为癌症、罕见病患者设计"
└── "紧急情况下的专业指导"

Level 2: 功能模块说明
├── 指引生成器
├── AI 智能助手
└── 统计中心

Level 3: 具体操作指导
├── 5步生成流程
├── 急救指导步骤
└── 日常预防措施

Level 4: 详细说明信息
├── 医学术语解释
├── 操作注意事项
└── 联系方式信息
```

#### 内容类型
1. **指导性内容**：操作流程、使用说明
2. **教育性内容**：医学知识、预防措施
3. **紧急内容**：急救指导、联系方式
4. **支持性内容**：帮助文档、常见问题

### 导航结构

#### 主导航
```
首页
├── 指引生成器
│   ├── 并发症选择
│   ├── 医疗信息
│   ├── 联系人管理
│   ├── 护理服务
│   └── 卡片预览
├── AI 助手
│   ├── 并发症咨询
│   ├── 风险评估
│   └── 个性化建议
└── 统计中心
    ├── 访问统计
    ├── 用户统计
    └── 服务统计
```

#### 面包屑导航
```
首页 > 指引生成器 > 并发症选择
首页 > AI 助手 > 并发症咨询
首页 > 统计中心 > 访问统计
```

### 搜索和发现

#### 搜索功能
- **全局搜索**：快速查找功能和内容
- **智能建议**：基于用户历史的搜索建议
- **搜索结果**：清晰的分类和高亮显示

#### 内容发现
- **推荐系统**：基于用户情况的个性化推荐
- **相关内容**：显示相关的并发症和指导
- **热门功能**：展示常用的功能模块

---

## ♿ 可访问性设计

### WCAG 2.1 合规性

#### 感知性 (Perceivable)
1. **文本替代**
   - 所有图片都有 alt 文本
   - 复杂图表有详细描述
   - 音频内容提供文字记录

2. **时间媒体**
   - 视频提供字幕
   - 音频内容可控制
   - 避免自动播放

3. **适应性**
   - 响应式设计适应不同设备
   - 内容可线性化显示
   - 支持屏幕方向切换

4. **可区分性**
   - 颜色不是唯一的信息传递方式
   - 足够的颜色对比度
   - 文本可调整大小

#### 操作性 (Operable)
1. **键盘可访问**
   - 所有功能可通过键盘操作
   - 清晰的键盘焦点指示
   - 合理的 Tab 顺序

2. **充足时间**
   - 提供足够的时间完成任务
   - 可暂停自动更新内容
   - 避免时间限制

3. **癫痫发作**
   - 避免闪烁内容
   - 控制动画频率
   - 提供关闭动画选项

4. **可导航性**
   - 清晰的页面标题
   - 一致的导航机制
   - 多种导航方式

#### 理解性 (Understandable)
1. **可读性**
   - 清晰的语言表达
   - 术语解释和定义
   - 一致的交互模式

2. **可预测性**
   - 一致的导航机制
   - 可预测的操作结果
   - 表单验证及时反馈

3. **输入辅助**
   - 表单填写帮助
   - 错误纠正建议
   - 数据自动保存

#### 健壮性 (Robust)
1. **兼容性**
   - 标准的 HTML 语义
   - 适配辅助技术
   - 跨浏览器兼容

### 具体实现

#### 键盘导航
```typescript
// 键盘事件处理
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      // 激活按钮或链接
      event.preventDefault();
      activateElement();
      break;
    case 'Tab':
      // Tab 键导航
      handleTabNavigation(event);
      break;
    case 'Escape':
      // 关闭弹窗或取消操作
      handleClose();
      break;
  }
};
```

#### 屏幕阅读器支持
```typescript
// ARIA 标签使用
<button
  aria-label="生成指引卡片"
  aria-describedby="generate-help"
  aria-pressed={isGenerating}
>
  生成指引卡片
</button>
<div id="generate-help" className="sr-only">
  点击生成您的个性化并发症管理指引卡片
</div>
```

#### 焦点管理
```typescript
// 焦点陷阱（弹窗内）
const useFocusTrap = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef]);
};
```

---

## ⚡ 性能设计

### 性能目标

#### 加载性能
- **首屏加载时间**：< 2秒
- **可交互时间**：< 3秒
- **页面完全加载**：< 5秒

#### 运行性能
- **动画帧率**：60 FPS
- **响应时间**：< 100ms
- **内存使用**：< 50MB

#### 网络性能
- **页面大小**：< 1MB
- **请求数量**：< 20个
- **缓存命中率**：> 80%

### 优化策略

#### 代码优化
```typescript
// 代码分割
const GuideGenerator = React.lazy(() => import('./GuideGenerator'));
const AIAssistant = React.lazy(() => import('./AIAssistant'));

// 组件懒加载
const LazyComponent = () => {
  return (
    <React.Suspense fallback={<div>加载中...</div>}>
      <Component />
    </React.Suspense>
  );
};
```

#### 图片优化
```typescript
// 图片懒加载
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return isLoaded ? (
    <img ref={imgRef} src={src} alt={alt} {...props} />
  ) : (
    <div ref={imgRef} className="image-placeholder" />
  );
};
```

#### 缓存策略
```typescript
// Service Worker 缓存
const CACHE_NAME = 'xiaohongka-v1';
const urlsToCache = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/static/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

#### 数据优化
```typescript
// 数据分页加载
const usePaginatedData = (fetchFunction, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const newData = await fetchFunction(page, pageSize);
    
    setData(prev => [...prev, ...newData]);
    setHasMore(newData.length === pageSize);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  return { data, loadMore, loading, hasMore };
};
```

### 监控和分析

#### 性能监控
```typescript
// Web Vitals 监控
const reportWebVitals = (metric) => {
  console.log(metric);
  // 发送到分析服务
  analytics.track('web_vital', {
    name: metric.name,
    value: metric.value,
    id: metric.id,
  });
};

// 在 _app.js 中使用
export { reportWebVitals };
```

#### 错误监控
```typescript
// 错误边界
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 发送到错误监控服务
    errorReporting.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

---

## 📐 设计规范

### 设计令牌 (Design Tokens)

#### 颜色令牌
```json
{
  "colors": {
    "primary": {
      "red": {
        "50": "#FFF5F5",
        "100": "#FFEBEB",
        "200": "#FFD6D6",
        "300": "#FFB6B6",
        "400": "#FF8A8A",
        "500": "#FF6B6B",
        "600": "#FF3B30",
        "700": "#D70015",
        "800": "#B30010",
        "900": "#8A000C"
      }
    },
    "neutral": {
      "gray": {
        "50": "#FAFAFA",
        "100": "#F5F5F5",
        "200": "#E5E5E5",
        "300": "#D4D4D4",
        "400": "#A3A3A3",
        "500": "#737373",
        "600": "#525252",
        "700": "#404040",
        "800": "#262626",
        "900": "#171717"
      }
    }
  }
}
```

#### 间距令牌
```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px"
  }
}
```

#### 字体令牌
```json
{
  "font": {
    "family": {
      "sans": ["PingFang SC", "Helvetica Neue", "sans-serif"]
    },
    "size": {
      "xs": "12px",
      "sm": "14px",
      "base": "16px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px"
    },
    "weight": {
      "light": "300",
      "normal": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    }
  }
}
```

### 组件规范

#### 按钮组件规范
```typescript
// 按钮变体
const buttonVariants = {
  primary: {
    backgroundColor: 'var(--primary-red)',
    color: 'white',
    border: 'none',
    hover: {
      backgroundColor: 'var(--dark-red)',
    },
  },
  secondary: {
    backgroundColor: 'var(--light-gray)',
    color: 'var(--dark-gray)',
    border: '1px solid var(--medium-gray)',
    hover: {
      backgroundColor: 'var(--medium-gray)',
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--primary-red)',
    border: 'none',
    hover: {
      backgroundColor: 'rgba(255, 59, 48, 0.1)',
    },
  },
};

// 按钮尺寸
const buttonSizes = {
  sm: {
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '6px',
  },
  md: {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
  },
  lg: {
    padding: '16px 32px',
    fontSize: '18px',
    borderRadius: '10px',
  },
};
```

#### 表单组件规范
```typescript
// 输入框状态
const inputStates = {
  default: {
    borderColor: 'var(--light-gray)',
    backgroundColor: 'white',
  },
  focus: {
    borderColor: 'var(--primary-red)',
    boxShadow: '0 0 0 3px rgba(255, 59, 48, 0.1)',
  },
  error: {
    borderColor: 'var(--danger-red)',
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
  },
  disabled: {
    borderColor: 'var(--light-gray)',
    backgroundColor: 'var(--light-gray)',
    color: 'var(--medium-gray)',
  },
};
```

### 设计模式

#### 模式 1：步骤式引导
```typescript
// 使用场景：复杂流程的分步引导
// 设计原则：清晰进度、可跳转、自动保存
const StepGuide = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="step-guide">
      <div className="step-navigation">
        {steps.map((step, index) => (
          <StepIndicator
            key={step.id}
            step={step}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
            onClick={() => onStepChange(index)}
          />
        ))}
      </div>
      <div className="step-content">
        {steps[currentStep].content}
      </div>
    </div>
  );
};
```

#### 模式 2：紧急操作界面
```typescript
// 使用场景：紧急情况下的快速操作
// 设计原则：大按钮、高对比度、简化流程
const EmergencyInterface = ({ actions }) => {
  return (
    <div className="emergency-interface">
      <div className="emergency-header">
        <h1>紧急情况处理</h1>
        <p>请选择需要的紧急服务</p>
      </div>
      <div className="emergency-actions">
        {actions.map((action) => (
          <EmergencyButton
            key={action.id}
            action={action}
            onClick={action.handler}
          />
        ))}
      </div>
    </div>
  );
};
```

#### 模式 3：数据可视化
```typescript
// 使用场景：统计数据的可视化展示
// 设计原则：清晰直观、响应式、交互友好
const DataVisualization = ({ data }) => {
  return (
    <div className="data-visualization">
      <div className="stats-grid">
        {data.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
      <div className="chart-container">
        <ResponsiveChart data={data} />
      </div>
    </div>
  );
};
```

### 设计工具

#### 设计系统工具
- **Figma**：主要的设计工具，用于创建和维护设计系统
- **Storybook**：组件开发和文档工具
- **Chrome DevTools**：浏览器开发者工具，用于调试和优化

#### 协作工具
- **GitHub**：代码版本控制和协作
- **Notion**：设计文档和需求管理
- **Slack**：团队沟通和协作

#### 测试工具
- **Lighthouse**：性能和可访问性测试
- **Axe DevTools**：可访问性测试
- **WebPageTest**：性能测试和分析

---

## 📝 设计审查清单

### 设计原则审查
- [ ] 设计是否符合医疗专业性要求
- [ ] 是否考虑了紧急情况下的使用场景
- [ ] 是否体现了情感关怀和包容性设计
- [ ] 是否保持了设计的一致性

### 可访问性审查
- [ ] 颜色对比度是否符合 WCAG 2.1 AA 标准
- [ ] 所有交互元素是否支持键盘操作
- [ ] 图片是否有合适的 alt 文本
- [ ] 表单是否有清晰的标签和错误提示

### 性能审查
- [ ] 图片是否经过优化和懒加载
- [ ] 是否使用了代码分割和懒加载
- [ ] 动画是否流畅且不影响性能
- [ ] 是否实现了适当的缓存策略

### 响应式审查
- [ ] 在移动设备上的显示效果
- [ ] 在平板设备上的显示效果
- [ ] 在桌面设备上的显示效果
- [ ] 在不同浏览器上的兼容性

### 用户体验审查
- [ ] 用户流程是否清晰直观
- [ ] 反馈机制是否及时有效
- [ ] 错误处理是否友好
- [ ] 学习成本是否合理

---

**文档版本**：v2.2.0  
**最后更新**：2025-06-23  
**维护者**：Z.ai Code Design Team