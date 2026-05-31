# 🚀 Kino CMS 快速启动指南

## 最简单的启动方式：使用 Docker

### 前置要求
- Docker
- Docker Compose

### 一键启动

```bash
cd kino
docker-compose up -d
```

完成！访问：
- **前端：** http://localhost:3000
- **后端 API：** http://localhost:5000/api
- **健康检查：** http://localhost:5000/api/health

### 停止服务

```bash
docker-compose down
```

## 本地开发启动（无 Docker）

### 前置要求
- Node.js >= 18
- npm >= 9
- MongoDB

### 启动步骤

#### 1. 启动后端

```bash
cd backend
npm install
npm run dev
```

#### 2. 启动前端（新终端）

```bash
cd frontend
npm install
npm start
```

## 📚 API 测试

```bash
# 健康检查
curl http://localhost:5000/api/health

# 搜索电影
curl "http://localhost:5000/api/movies/search?q=inception"

# 用户注册
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"123456"}'

# 用户登录
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 🔍 常见问题

### Port 5000 already in use
```bash
lsof -i :5000
kill -9 <PID>
```

### MongoDB connection refused
```bash
# 启动 MongoDB
mongod
# 或使用 Docker
docker run -d -p 27017:27017 mongo:6.0
```

### 前端白屏
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 更多文档

- [API 文档](./docs/API.md)
- [内容导入指南](./docs/IMPORT_GUIDE.md)
- [多语言配置](./docs/LANGUAGES.md)
