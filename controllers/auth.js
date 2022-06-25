const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('account/login', {
    path: '/login',
    pageTitle: 'Login',
    user: req.session.user,
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('62b6bfc979cddae5f7f93dc4')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        res.redirect('/');
      });
    })
    .catch(err => console.log(err, 'err'));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
};
