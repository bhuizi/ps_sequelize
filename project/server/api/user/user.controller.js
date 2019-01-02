'use strict';

const models = require('../../models/db');

exports.allUsers = (req, res) => {
  models.User.findAll()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}

exports.singleUser = (req, res) => {
  const id = req.params.id;

  models.User.findById(id, {
    include: [{
      model: models.Book, as: 'Reading',
      attributes: ['title', 'author']
    }, {
      model: models.Favorite
    }]
  })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}

exports.saveUserFav = (req, res) => {
  const title = req.body.bookTitle;
  const UserId = req.body.userId;

  models.Favorite.create({
    title,
    UserId
  })
  .then(() => {
    res.json({
      success: 'Success, favorite book added for User'
    })
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  })
}

exports.addUser = (req, res) => {
  const name = req.body.name
  
  models.User.create({name})
    .then(user => {
      res.json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}