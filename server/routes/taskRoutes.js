const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const protect = require('../middleware/auth');

// Validation rules for creating/updating tasks
const taskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),
];

// Handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      messages: errors.array().map((e) => e.msg),
    });
  }
  next();
};

// @route   GET /api/tasks
// @desc    Get all tasks with optional search, filter, sort
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const { search, status, priority, sortBy, order } = req.query;
    let query = { user: req.user.id };

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by priority
    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    // Sort options
    let sortOptions = { createdAt: -1 }; // Default: newest first
    if (sortBy) {
      const sortOrder = order === 'asc' ? 1 : -1;
      if (sortBy === 'priority') {
        // Custom priority sort: high > medium > low
        sortOptions = { priority: sortOrder, createdAt: -1 };
      } else if (sortBy === 'dueDate') {
        sortOptions = { dueDate: sortOrder, createdAt: -1 };
      } else if (sortBy === 'title') {
        sortOptions = { title: sortOrder };
      } else if (sortBy === 'status') {
        sortOptions = { status: sortOrder, createdAt: -1 };
      } else {
        sortOptions = { createdAt: sortOrder };
      }
    }

    const tasks = await Task.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id.toString()) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', protect, taskValidation, validate, async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', protect, taskValidation, validate, async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id.toString()) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        priority,
        dueDate: dueDate || null,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id.toString()) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
