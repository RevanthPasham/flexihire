const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: Number,
    required: true
  },
  resumePath: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  interestStatement: {
    type: String,
    trim: true
  },
  availability: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    default: 'In Review',
    enum: ['In Review', 'Under Review', 'Accepted', 'Rejected']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
