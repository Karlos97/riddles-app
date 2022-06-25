const Riddle = require('../models/riddle');

exports.getHome = (req, res, next) => {
  res.render('home', {
    pageTitle: 'Riddles App',
    path: '/',
    // editing: false,
    // isAuthenticated: req.session.isLoggedIn
  });
};

exports.getAbout = (req, res, next) => {
  res.render('about', {
    pageTitle: 'Riddles App',
    path: '/about',
    // editing: false,
    // isAuthenticated: req.session.isLoggedIn
  });
};

exports.getExample = (req, res, next) => {
  const riddleId = req.params.riddleId;
  if (riddleId) {
    Riddle.findById(riddleId)
      .then((riddle) => {
        res.render('example', {
          riddle: riddle,
          pageTitle: 'Example',
          path: '/example/:riddleId',
          // isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch((err) => console.log(err));
  } else {
    Riddle.findOne()
      .then((riddle) => {
        res.render('example', {
          riddle: riddle,
          pageTitle: 'Example',
          path: '/example/:riddleId',
          // isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch((err) => console.log(err));
  }
};

exports.getCheckAnswer = (req, res, next) => {
  const riddleId = req.params.riddleId;
  if (riddleId) {
    Riddle.findById(riddleId)
      .then((riddle) => {
        res.render('answer', {
          riddle: riddle,
          pageTitle: 'Check Answer',
          path: '/check-answer/:riddleId',
          backPath: '/example/' + riddleId
          // isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect('/');
  }
};

exports.postCheckAnswer = (req, res, next) => {
  const riddleId = req.body.riddleId;
  const userAnswer = req.body.userAnswer;

  Riddle.findById(riddleId)
    .then((riddle) => {
      riddle.userAnswer = userAnswer;
      riddle.save();
      res.redirect('/check-answer/' + riddleId);
    })
    .catch((err) => console.log(err));
};
