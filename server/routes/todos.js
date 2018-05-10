const {Todo, validate} = require('../models/todo');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

router.get('/', (req, res) => {
  Todo.find().sort('date completed priority')
    .then((todos) => {
      res.status(200).send(todos);
    })
    .catch((err) => {
      res.status(500).send('An error occurred '+err);
    })
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({
    task: req.body.task,
    priority: req.body.priority,
    date: req.body.date,
    completed: req.body.completed
  })

  todo.save()
    .then((todo) => {
      res.status(201).send({
        message: 'task added successfully',
        obj: todo
      })
    })
    .catch((err) => {
      res.status(500).send('An error occurred '+err);
    })
});

router.put('/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) return res.status(400).send('Please provide valid ObjectID')

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Todo.findByIdAndUpdate(req.params.id,req.body, {new: true})
    .then((todo) => {
      if (!todo) return res.status(404).send('The task with the following ID was not found.');
      res.status(200).send({
        message: 'task updated successfully',
        obj: todo
      });
    })
    .catch((err) => {
      res.status(500).send('An error occurred '+err);
    })
})

router.delete('/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) return res.status(400).send('Please provide valid ObjectID')

  Todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      if (!todo) return res.status(404).send('The task with the following ID was not found.');
      res.status(200).send({
        message: 'task deleted successfully',
        obj: todo
      });
    })
    .catch((err) => {
      res.status(500).send('An error occurred '+err);
    })
})

module.exports = router;
