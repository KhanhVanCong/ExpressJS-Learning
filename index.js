require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);


var userRoutes = require('./routes/user.route');
var productRoutes = require('./routes/product.route');
var authRoutes = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');

var apiProductRoute = require('./api/routes/product.route');

var authMiddileware = require('./middlewares/auth.middleware');
var sessionMiddleware =  require('./middlewares/seesion.middleware');




var port = 3000;
var app = express();



app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/products', apiProductRoute);
app.use(cookieParser(process.env.SESSION_SECRECT));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index', {
        name: "Hello Coders.Tokyo"
    });
});

app.use('/users', authMiddileware.requireAuth, userRoutes);
app.use('/products', authMiddileware.requireAuth, productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoute);



app.listen(port, () => console.log('Server listening on port 3000'));