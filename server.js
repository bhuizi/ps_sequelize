const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _USERS = require('./users.json');

const app = express();
const port = 8001;

const connection = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorAliases: false,
});

const User = connection.define('User', {
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            isAlphanumeric: true
        }
    }
});

app.get('/findall', (req, res) => {
    User.findAll({
        where: {
          name: {
              [Op.like]: 'Ame%'
          }
        }
    })
      .then(users => {
          res.json(users)
      })
      .catch(error => {
          console.log(error)
          res.status(404).send(error);
      });
});

app.get('/findone', (req, res) => {
    User.findById('55')
      .then(user => {
          res.json(user);
      })
      .catch(error => {
          console.log(error);
          res.status(404).send(error);
      })
});

app.put('/update', (req, res) => {
    User.update({
        name: 'Axl Rose',
        password: 'password'
    }, {where: {id: 55}})
      .then(rows => {
          res.send(rows);
      })
      .catch(error => {
          console.log(rows);
          res.status(404).send(error);
      })
})

app.delete('/remove', (req, res) => {
    User.destroy({
        where: {id: 50}
    })
      .then(() => {
          res.send('User successfully deleted');
      })
      .catch(error => {
          console.log(error);
          res.status(404).send(error);
      })
})

connection
    .sync()
    .then(() => {
        console.log('Connection to database established successully.')
    })
    .error(err => {
        console.error('Unable to connect to the database', err);
    });
    
app.listen(port, () => {
    console.log(`Running server on port ${port}`)
});