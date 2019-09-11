const environment = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const cors = require('cors');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Task = require('./models').Task;

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let greeting = '<h2>Welcome to the Task Manager!</h2>'
  let message = '<p>You can use the browser inteface for GET requests to <b>/tasks</b> or <b>/tasks/:id</b>.</p><p>You can use the <a target="blank" href="https://www.getpostman.com/">Postman app</a> for POST to <b>/tasks</b> and DELETE requests to <b>/tasks/:id</b>.</p>'
  res.status(200).set('Content-Type', 'text/html').send(new Buffer.from(`${greeting} ${message}`))
})

app.get('/tasks', (req, res) => {
  return Task
  .findAll()
  .then(tasks => res.status(200).send(tasks))
  .catch(error => res.status(400).send(error));
})

app.get('/tasks/:id', (req, res) => {
  return Task
  .findByPk(req.params.id)
  .then(task => {
    if (!task) {
      return res.status(404).send({
        message: 'Task Not Found',
      });
    }
    return res.status(200).send(task);
  })
  .catch(error => res.status(400).send(error));
})

app.post('/tasks', (req, res) => {
  return Task
  .create({
    title: req.body.title,
    priority: req.body.priority
  })
  .then(task => res.status(201).send(task))
  .catch(error => res.status(400).send(error));
})

app.delete('/tasks/:id', (req, res) => {
  return Task
    .findByPk(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(400).send({
          message: 'Task Not Found',
        });
      }
      return task
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
})

var serv = app.listen(app.get('port'), () => {
  console.log(`You're now listening at ${serv.address().address} ${serv.address().port}`);
})