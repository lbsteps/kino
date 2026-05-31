# 🎬 Kino CMS - 影视内容管理系统

一个支持多语言（哈萨克语、维语、中文、英文）的合法影视内容 CMS 系统。

## 功能特性

✅ **内容管理**
- 电影、电视剧分类管理
- 多语言元数据支持（哈萨克语、维语、中文、英文）
- 演员、导演、制片人管理
- 海报、剧照、预告片管理

✅ **数据来源**
- 对接 TMDB (The Movie Database) - 合法公开 API
- 对接 Wikidata 公开数据
- 支持手动导入（带版权验证）
- 支持授权内容源接入

✅ **播放源管理**
- 管理多个合法播放源
- 支持流媒体链接
- 支持公开视频平台嵌入链接

✅ **多语言支持**
- 🇰🇿 哈萨克语 (kk)
- 🇨🇳 维语 (ug)
- 中文 (zh-CN)
- 英文 (en)

✅ **用户系统**
- 管理员权限管理
- 内容编辑权限控制
- API 密钥管理

## 技术栈

- **后端**: Node.js + Express
- **数据库**: MongoDB
- **前端**: React + TypeScript
- **认证**: JWT
- **外部 API**: TMDB, Wikidata

## 快速开始

### 系统要求
- Node.js >= 18
- MongoDB >= 5.0
- Docker (可选)

### 安装

```bash
# 克隆仓库
git clone https://github.com/lbsteps/kino.git
cd kino

# 安装依赖
cd backend && npm install
cd ../frontend && npm install

# 配置环境变量
cp backend/.env.example backend/.env
```

### 配置

编辑 `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/kino
TMDB_API_KEY=your_tmdb_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 运行

```bash
# 后端
cd backend
npm run dev

# 前端（新窗口）
cd frontend
npm start
```

访问: http://localhost:3000

## 法律声明

本系统仅支持合法内容的管理和分发：

1. **允许的数据来源**:
   - TMDB / Wikidata / IMDb 的公开元数据
   - 拥有版权或分发权的自有内容
   - 获得明确授权的第三方内容接口
   - 公开平台允许嵌入的官方播放链接

2. **禁止使用**:
   - 爬取受版权保护的内容
   - 绕过内容保护措施
   - 未授权的商业分发

3. **用户责任**:
   - 用户需确保导入内容拥有合法版权或分发权
   - 遵守当地法律法规
   - 不侵犯第三方知识产权

## 项目结构

```
kino/
├── backend/                 # Node.js + Express 服务
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── i18n/
│   ├── .env.example
│   └── package.json
├── frontend/                # React 管理面板
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/
│   ├── API.md
│   ├── IMPORT_GUIDE.md
│   └── LANGUAGES.md
└── docker-compose.yml
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
