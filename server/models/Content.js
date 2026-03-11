import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'stanze', 'struttura', 'regolamento', 'territorio', 'contatti', 'footer']
  },
  section: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

contentSchema.index({ page: 1, section: 1 }, { unique: true });

export default mongoose.model('Content', contentSchema);
