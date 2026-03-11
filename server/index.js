import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import mediaRoutes from './routes/media.js';
import articlesRoutes from './routes/articles.js';
import User from './models/User.js';
import Article from './models/Article.js';
import Media from './models/Media.js';
import Content from './models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/articles', articlesRoutes);

// Stats endpoint for dashboard overview
app.get('/api/stats', async (req, res) => {
  try {
    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      totalMedia,
      totalUsers,
      totalContent
    ] = await Promise.all([
      Article.countDocuments(),
      Article.countDocuments({ status: 'published' }),
      Article.countDocuments({ status: 'draft' }),
      Media.countDocuments(),
      User.countDocuments(),
      Content.countDocuments()
    ]);

    // Get recent articles
    const recentArticles = await Article.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('author', 'name')
      .select('title status updatedAt');

    // Get recent media
    const recentMedia = await Media.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('originalName url createdAt');

    res.json({
      articles: {
        total: totalArticles,
        published: publishedArticles,
        drafts: draftArticles
      },
      media: totalMedia,
      users: totalUsers,
      pages: totalContent,
      recentArticles,
      recentMedia
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
