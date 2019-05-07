var express = require('express');
var router = express.Router();
var db = require('../db');
var shortid = require('shortid');



router.get('/', (req, res) => {
    console.log(db.get('users').value());
    res.render('users/index', {
        'users': db.get('users').value()
    })
});

router.get('/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render('users/index', {
        'users': matchedUsers,
        'keyword': q
    })
})

router.get('/create', (req, res)=> {
    res.render('users/create')
})

router.get('/:id', (req, res) => {
    var id = req.params.id;
    if(!isNaN(req.params.id))
    {
        id = parseInt(req.params.id);
    } 
    var user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})
module.exports = router;