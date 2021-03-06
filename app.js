const path = require('path');
const fs= require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/errors');
const User = require('./models/user');

const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const MONGODB_URI =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xvoufyq.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');

const accesLog = fs.createWriteStream(path.join(__dirname, 'acces.log'), {flags:'a'})

app.use(helmet())
app.use(compression())
app.use(morgan('combined', {stream: accesLog}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(userRoutes);
app.use(authRoutes);
app.use(mainRoutes);

app.use(errorController.showError404)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    User.findOne().then(user => {
    if (!user) {
        const user = new User({
          name: 'Karlos',
        });
        user.save();
      }
    });
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
