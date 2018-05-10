const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  priority: {
    type: String,
    required: true,
    enum:['low','intermediate','high']
  },
  date: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model('User', todoSchema);

function validateTodo(todo) {
  const schema = {
    task: Joi.string().min(5).max(50).required(),
    priority: Joi.string().required(),
    date: Joi.date().iso().required(),
    completed: Joi.boolean(),
    id: Joi.string()
  };

  return Joi.validate(todo, schema);
}

exports.Todo = Todo;
exports.validate = validateTodo;
