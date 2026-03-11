import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Media from '../models/Media.js';
import upload from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get all media (with pagination)
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const type = req.query.type;
    const search = req.query.search;

    const query = {};
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Media.countDocuments(query);
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('uploadedBy', 'name');

    res.json({
      media,
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

// Upload single image
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const type = req.query.type === 'article' ? 'article' : 'image';
    const subPath = type === 'article' ? 'articles' : 'images';

    const media = new Media({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/uploads/${subPath}/${req.file.filename}`,
      type,
      alt: req.body.alt || '',
      uploadedBy: req.user._id
    });

    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple images
router.post('/upload-multiple', protect, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const type = req.query.type === 'article' ? 'article' : 'image';
    const subPath = type === 'article' ? 'articles' : 'images';

    const mediaItems = await Promise.all(
      req.files.map(async (file) => {
        const media = new Media({
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: file.path,
          url: `/uploads/${subPath}/${file.filename}`,
          type,
          uploadedBy: req.user._id
        });
        return media.save();
      })
    );

    res.status(201).json(mediaItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update media alt text
router.put('/:id', protect, async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { alt: req.body.alt },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({ message: 'Media non trovato' });
    }

    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete media
router.delete('/:id', protect, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: 'Media non trovato' });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, '../../public', media.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: 'Media eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
