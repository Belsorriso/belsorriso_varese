import express from 'express';
import Article from '../models/Article.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all articles (public - only published)
router.get('/public', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    const query = { status: 'published' };
    if (category) query.category = category;

    const total = await Article.countDocuments(query);
    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name')
      .select('-content');

    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article by slug (public)
router.get('/public/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'name');

    if (!article) {
      return res.status(404).json({ message: 'Articolo non trovato' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all articles (admin - all statuses)
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const category = req.query.category;
    const search = req.query.search;

    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Article.countDocuments(query);
    const articles = await Article.find(query)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name');

    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article by ID (admin)
router.get('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name');

    if (!article) {
      return res.status(404).json({ message: 'Articolo non trovato' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article
router.post('/', protect, async (req, res) => {
  try {
    const { title, slug, excerpt, content, featuredImage, category, tags, status } = req.body;

    // Generate unique slug
    let articleSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug exists and make it unique
    const existingSlug = await Article.findOne({ slug: articleSlug });
    if (existingSlug) {
      articleSlug = `${articleSlug}-${Date.now()}`;
    }

    const article = new Article({
      title,
      slug: articleSlug,
      excerpt,
      content,
      featuredImage,
      category,
      tags: tags || [],
      status: status || 'draft',
      author: req.user._id
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update article
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, slug, excerpt, content, featuredImage, category, tags, status } = req.body;

    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Articolo non trovato' });
    }

    // Update fields
    if (title) article.title = title;
    if (slug) article.slug = slug;
    if (excerpt !== undefined) article.excerpt = excerpt;
    if (content) article.content = content;
    if (featuredImage !== undefined) article.featuredImage = featuredImage;
    if (category) article.category = category;
    if (tags) article.tags = tags;
    if (status) {
      article.status = status;
      if (status === 'published' && !article.publishedAt) {
        article.publishedAt = Date.now();
      }
    }

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete article
router.delete('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Articolo non trovato' });
    }

    res.json({ message: 'Articolo eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
