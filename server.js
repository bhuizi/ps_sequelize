const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 8001;

const connection = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorAliases: false,
    define: {
        freezeTableName: true
    }

});

const User = connection.define('User', {
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            len: [3]
        }
    },
    bio: {
        type: Sequelize.STRING,
        validate: {
            contains: {
                args: ['foo'],
                msg: 'Error: Field must contain foo'
            }
        }
    }
}, {
    timestamps: false
});

// example for throwing validation errors
// app.get('/', (req, res) => {
//     User.create({
//         name: 'jo',
//         bio: 'new bio entry'
//     })
//     .then(user => {
//         res.json(user);
//     })
//     .catch(e => {
//         console.log(e);
//         res.status(404).send(e);
//     })
// });

connection
    .sync({
        logging: console.log,
        force: true
    })
    .then(() => {
        User.create({
            name: 'joe',
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