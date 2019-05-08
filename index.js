var express = require('express');
var bodyParser = require('body-parser');
var userRoutes = require('./routes/user.route'); 

var port = 3000;
var app = express();





app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index', {
        name: "Hello Coders.Tokyo"
    });
});

app.use('/users', userRoutes)


app.listen(port, () => console.log('Server listening on port 3000'));