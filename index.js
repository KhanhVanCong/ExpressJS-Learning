var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
var shortid = require('shortid');
var port = 3000;


db.defaults({ users: [] })
  .write()


app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (request, response) => {
    response.render('index', {

        name: "Hello Coders.Tokyo"
    });
});
app.get('/users', (req, res) => {
    console.log(db.get('users').value());
    res.render('users/index', {
        'users': db.get('users').value()
    })
});

app.get('/users/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render('users/index', {
        'users': matchedUsers,
        'keyword': q
    })
})

app.get('/users/create', (req, res)=> {
    res.render('users/create')
})

app.get('/users/:id', (req, res) => {
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

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})

app.listen(port, () => console.log('Server listening on port 3000'));