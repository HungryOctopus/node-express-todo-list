const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const Task = require('./models/task');
const scss = require('node-sass-middleware');

const morgan = require('morgan');

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'icon.ico')));

app.use(morgan('dev'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response, next) => {
  Task.find({})
    .then((publications) => {
      response.render('home', { publications });
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/', (request, response, next) => {
  const todo = request.body.todo;
  Task.create({
    todo
  })
    .then((publication) => {
      response.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

/* app.get('/publication/:id', (request, response, next) => {
  const id = request.params.id;
  Publication.findById(id)
    .then((publication) => {
      response.render('publication-detail', { publication });
    })
    .catch((error) => {
      next(error);
    });
}); */

/* app.get('/publication/:id/edit', (request, response, next) => {
  const id = request.params.id;
  Publication.findById(id)
    .then((publication) => {
      response.render('publication-edit', { publication });
    })
    .catch((error) => {
      next(error);
    });
}); */

/* app.post('/publication/:id/edit', (request, response, next) => {
  const id = request.params.id;
  const title = request.body.title;
  const url = request.body.url;
  Publication.findByIdAndUpdate(id, { title, url })
    .then(() => {
      response.redirect(`/publication/${id}`);
    })
    .catch((error) => {
      next(error);
    });
}); */

/* app.post('/publication/delete', (request, response, next) => {
  const id = request.params.id;
  Publication.findByIdAndDelete(id)
    .then(() => {
      response.redirect(`/`);
    })
    .catch((error) => {
      next(error);
    });
}); */

app.get('*', (request, response, next) => {
  next(new Error('NOT_FOUND'));
});

// Catch all error handler
// Express knows this is a catch all error handler because it takes 4 parameters
app.use((error, request, response, next) => {
  console.log(error);
  response.render('error');
});

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(3000);
});
