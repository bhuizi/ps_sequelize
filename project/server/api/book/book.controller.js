'use strict';

const models = require('../../models/db');

exports.allBooks = (req, res) => {
    models.Book.findAll()
      .then(books => {
          res.json(books);
      })
      .catch(error => {
          console.log(error);
          res.status(404).send(error);
      })
}