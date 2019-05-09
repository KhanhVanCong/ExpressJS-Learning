require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');

var userRoutes = require('./routes/user.route');
var productRoutes = require('./routes/product.route');
var authRoutes = require('./routes/auth.route');

var authMiddileware = require('./middlewares/auth.middleware');

var cookieParser = require('cookie-parser') 

var port = 3000;
var app = express();


app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser(process.env.SESSION_SECRECT));

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index', {
        name: "Hello Coders.Tokyo"
    });
});

app.use('/users', authMiddileware.requireAuth, userRoutes);
app.use('/products', authMiddileware.requireAuth, productRoutes);
app.use('/auth', authRoutes);


app.listen(port, () => console.log('Server listening on port 3000'));