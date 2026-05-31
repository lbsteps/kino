import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import i18next from 'i18next';

// Load environment variables
dotenv.config();

// Type definitions
interface ApiError extends Error {
  status?: number;
}

const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kino';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// i18n Configuration
i18next.init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'server.started': 'Server started on port {{port}}',
        'db.connected': 'MongoDB connected successfully',
        'db.error': 'Database connection error: {{error}}'
      }
    },
    'zh-CN': {
      translation: {
        'server.started': '服务器已启动，监听端口 {{port}}',
        'db.connected': 'MongoDB 连接成功',
        'db.error': '数据库连接错误: {{error}}'
      }
    },
    kk: {
      translation: {
        'server.started': 'Сервер 5000 портында іске қосылды',
        'db.connected': 'MongoDB сәтті түрде қосылды',
        'db.error': 'Деректер қоры қосылу қатесі: {{error}}'
      }
    },
    ug: {
      translation: {
        'server.started': 'سېرۋېر {{port}} پورتىدا قوشۇلدى',
        'db.connected': 'MongoDB مۇۋەپپەقىيەتلىك ئۆتكەلدى',
        'db.error': 'سانلىق ئومۇ قوشۇلش خاتالىقى: {{error}}'
      }
    }
  }
});

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Kino CMS Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes (to be implemented)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/movies', require('./routes/movies.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/sources', require('./routes/sources.routes'));
app.use('/api/categories', require('./routes/categories.routes'));

// Error Handler Middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message
    }
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: {
      status: 404,
      message: 'Route not found'
    }
  });
});

// Database Connection
async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(i18next.t('db.connected'));
  } catch (error) {
    console.error(
      i18next.t('db.error', { error: (error as Error).message })
    );
    process.exit(1);
  }
}

// Start Server
async function startServer(): Promise<void> {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(i18next.t('server.started', { port: PORT }));
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
startServer();

export default app;
