#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// ======================== API 路由 ========================

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Kino CMS Backend is running',
    timestamp: new Date().toISOString(),
    environment: 'development',
    uptime: process.uptime()
  });
});

// 搜索电影
app.get('/api/movies/search', async (req, res) => {
  try {
    const { q } = req.query;
    const apiKey = process.env.TMDB_API_KEY || 'c18eb8ec9cad9e2cfd6fa9580cab2105';
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    console.log(`Searching for movies: ${q}`);

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(q)}&language=en`
    );
    const data = await response.json();

    const movies = (data.results || []).slice(0, 20).map((movie) => ({
      tmdbId: movie.id,
      title: { en: movie.title || movie.name },
      description: { en: movie.overview || 'No description' },
      rating: movie.vote_average,
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      releaseDate: movie.release_date || new Date(),
      contentType: 'movie'
    }));

    res.json({
      data: movies,
      total: movies.length,
      page: 1,
      limit: 20
    });
  } catch (error) {
    console.error('Search error:', error.message);
    res.json({
      data: [],
      total: 0,
      error: 'Search service temporarily unavailable'
    });
  }
});

// 用户注册
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log(`User registered: ${email}`);

  res.status(201).json({
    user: {
      id: Math.random().toString(),
      username,
      email,
      role: 'user'
    },
    token: 'mock_token_' + Math.random().toString().substr(2, 9)
  });
});

// 用户登录
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  console.log(`User login: ${email}`);

  res.json({
    user: {
      id: '1',
      username: 'testuser',
      email: email,
      role: 'user'
    },
    token: 'mock_token_' + Math.random().toString().substr(2, 9)
  });
});

// 获取分类
app.get('/api/categories', (req, res) => {
  res.json({
    data: [
      { _id: '1', name: { en: 'Action' }, slug: 'action' },
      { _id: '2', name: { en: 'Drama' }, slug: 'drama' },
      { _id: '3', name: { en: 'Comedy' }, slug: 'comedy' },
      { _id: '4', name: { en: 'Science Fiction' }, slug: 'sci-fi' },
      { _id: '5', name: { en: 'Horror' }, slug: 'horror' }
    ]
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: 'Route not found'
    }
  });
});

// ======================== 启动服务器 ========================

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║     🎬 Kino CMS Backend Started 🎬      ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`📍 Server is running on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  ✅ GET  http://localhost:${PORT}/api/health`);
  console.log(`  🔍 GET  http://localhost:${PORT}/api/movies/search?q=inception`);
  console.log(`  👤 POST http://localhost:${PORT}/api/auth/register`);
  console.log(`  🔐 POST http://localhost:${PORT}/api/auth/login`);
  console.log(`  📁 GET  http://localhost:${PORT}/api/categories`);
  console.log('');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
