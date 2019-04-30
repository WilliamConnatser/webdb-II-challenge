const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = {
    connection: {
        filename: './data/lambda.sqlite3'
    },
    client: 'sqlite3',
    useNullAsDefault: true
}

const db = knex(knexConfig);

router.post('/', (req, res) => {
    db.insert(req.body)
        .into('zoos')
        .then(data => res.status(200).send({
            data
        }))
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            })
        });
});

router.get('/', (req, res) => {
    db('zoos')
        .then(data => res.status(200).send({
            data
        }))
        .catch(err => res.status(500).send({
            message: err
        }));
});

router.get('/:id', (req, res) => {
    db('zoos')
        .where({
            id: req.params.id
        })
        .then(data => res.status(200).send({
            data
        }))
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            })
        });
});

router.put('/:id', (req, res) => {
    db('zoos')
        .where({
            id: req.params.id
        })
        .update(req.body)
        .then(data => res.status(200).send({
            data
        }))
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            })
        });
});

router.delete('/:id', (req, res) => {
    db('zoos')
        .where({
            id: req.params.id
        })
        .del()
        .then(data => res.status(200).send({
            data
        }))
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            })
        });
});

module.exports = router;