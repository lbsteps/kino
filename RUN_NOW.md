# Kino CMS - 立即启动

## ⚡ 一键启动

### macOS / Linux
```bash
cd kino
chmod +x start.sh
./start.sh
```

### Windows
双击 `start.bat`

---

## 🎯 启动完成标志

✅ 看到以下输出说明成功：

```
╔════════════════════════════════════════╗
║   🎬 Kino CMS Backend Started 🎬       ║
╚════════════════════════════════════════╝

📍 Server is running on port 5000
🌐 Base URL: http://localhost:5000
```

✅ 浏览器自动打开 http://localhost:3000

✅ 页面显示：
- 🎬 Kino CMS 标题
- ✅ Backend Connected 状态
- 🎬 电影列表和搜索功能

---

## 🐛 如果还是不行

### 1. 检查 Node.js
```bash
node --version  # 需要 >= 18
npm --version   # 需要 >= 9
```

### 2. 手动启动（分开运行）

**终端 1 - 后端：**
```bash
cd backend
npm install
npm start
```

**终端 2 - 前端：**
```bash
cd frontend
npm install
npm start
```

### 3. 清除缓存重试
```bash
# 后端
cd backend
rm -rf node_modules package-lock.json
npm install

# 前端
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ 项目已完全准备好

现在就启动吧！🚀
