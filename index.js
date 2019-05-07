var express = require('express');
var app = express();
var port = 3000;

var users = [
    {
        "name": "Khanh",
        "age" : 25
    },
    {
        "name": "Van",
        "age" : 25
    }
]
app.set('view engine', 'pug');
app.set('views', './views')
app.get('/', (request, response) => {
    response.render('index', {

        name: "Hello Coders.Tokyo"
    });
});
app.get('/users', (req, res) => {
    res.render('users/index', {
        'users': users
    })
});

app.get('/users/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render('users/index', {
        'users': matchedUsers,
        'keyword': q
    })
})

app.listen(port, () => console.log('Server listening on port 3000'));