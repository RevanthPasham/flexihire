const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: String,
    required: true
  },
  timing: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  eligibility: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  gender: {
    type: String,
    default: 'Any'
  },
  ageLimit: {
    type: String,
    default: '18+'
  },
  tags: [{
    type: String,
    trim: true
  }],
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  isAccessible: {
    type: Boolean,
    default: false
  },
  hasBenefits: {
    type: Boolean,
    default: false
  },
  isDisabilityFriendly: {
    type: Boolean,
    default: false
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

module.exports = mongoose.model('Job', jobSchema);
