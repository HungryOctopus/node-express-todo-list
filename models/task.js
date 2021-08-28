const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'publishingDate',
      updatedAt: 'editingDate'
    }
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
