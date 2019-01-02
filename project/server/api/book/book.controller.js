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

exports.saveUserBook = (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.body.userId;

    models.Book.findById(bookId)
      .then(book => {
          book.addReader(userId);
      })
      .then(() => {
          res.json({
              success: 'Success, book added to User'
          })
      })
      .catch(error => {
          console.log(error);
          res.status(404).send(error);
      })
}