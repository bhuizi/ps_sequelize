const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 8001;

const connection = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorAliases: false,
});

const User = connection.define('User', {
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    first: Sequelize.STRING,
    last: Sequelize.STRING,
    full_name: Sequelize.STRING,
    bio: Sequelize.STRING
}, {
    hooks: {
        beforeValidate: () => {
            console.log('before validate');
        },
        afterValidate: () => {
            console.log('after validate');
        },
        beforeCreate: (user) => {
            user.full_name = `${user.first} ${user.last}`
            console.log('before create');
        },
        afterCreate: () => {
            console.log('after create');
        }
    }
});

connection
    .sync({
        logging: console.log,
        force: true
    })
    .then(() => {
        User.create({
            first: 'joe',
            last: 'smith',
            bio: 'new bio entry: foo'
        })
    })
    .then(() => {
        console.log('Connection to database established successully.')
    })
    .error(err => {
        console.error('Unable to connect to the database', err);
    });
    
app.listen(port, () => {
    console.log(`Running server on port ${port}`)
});