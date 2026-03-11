import express from 'express';
import Content from '../models/Content.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all content for a page (public)
router.get('/:page', async (req, res) => {
  try {
    const contents = await Content.find({ page: req.params.page });
    const result = {};
    contents.forEach(c => {
      result[c.section] = c.content;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all content (admin)
router.get('/', protect, async (req, res) => {
  try {
    const contents = await Content.find().populate('updatedBy', 'name');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update or create content (admin)
router.put('/:page/:section', protect, async (req, res) => {
  try {
    const { page, section } = req.params;
    const { content } = req.body;

    const updated = await Content.findOneAndUpdate(
      { page, section },
      {
        content,
        updatedAt: Date.now(),
        updatedBy: req.user._id
      },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete content (admin)
router.delete('/:page/:section', protect, async (req, res) => {
  try {
    await Content.findOneAndDelete({
      page: req.params.page,
      section: req.params.section
    });
    res.json({ message: 'Contenuto eliminato' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
