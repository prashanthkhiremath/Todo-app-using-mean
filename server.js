const express = require('express');
const path = require('path');
const app = express();

const { mongoose } = require('./server/db/mongoose');
const todos = require('./server/routes/todos');

// using middleware
app.use(express.json());
app.use(express.static(path.join(__dirname,'dist')));
app.use('/api/todos', todos);

// Catch all other routes request and return it to the index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
