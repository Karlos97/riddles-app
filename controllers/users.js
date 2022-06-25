const Riddle = require('../models/riddle');
const sleep = require('../helpers/sleep');


exports.getAddRiddle = (req, res, next) => {
  res.render('user/add-riddle', {
    pageTitle: 'Add Riddle',
    path: '/user/add-riddle',
    editing: false,
    // isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddRiddle = (req, res, next) => {
  const question = req.body.question;
  const answer = req.body.answer;
  const reward = req.body.reward;
  const riddle = new Riddle({
    question: question,
    answer: answer,
    reward: reward,
    userId: req.user,
  });
  riddle
    .save()
    .then((result) => {
      res.redirect('/example/' + riddle?._id);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHistory = (req, res, next) => {
  Riddle.find()
    .then((riddles) => {
      res.render('user/history', {
        pageTitle: 'History',
        riddles: riddles,
        path: '/user/history',
        editing: false,
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteRiddle = (req, res, next) => {
  const riddleId = req.body.riddleId;
  const prevPath = req.get('referer');
  console.log(req, 'req');
  Riddle.findByIdAndRemove(riddleId)
    .then(() => {
      res.redirect(prevPath);
    })
    .catch((err) => console.log(err));
};

exports.getEditRiddle = (req, res, next) => {
  const riddleId = req.params.riddleId;
  if (riddleId) {
    Riddle.findById(riddleId)
      .then((riddle) => {
      res.render('user/add-riddle', {
          riddle: riddle,
          editing: true,
          pageTitle: 'Edit riddle',
          path: '/user/edit-riddle/:riddleId',
          // isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect('/');
  }
};

exports.postEditRiddle = (req, res, next) => {
  const riddleId = req.body.riddleId;
  const question = req.body.question;
  const answer = req.body.answer;
  const reward = req.body.reward;

  Riddle.findById(riddleId)
    .then((riddle) => {
      riddle.question = question;
      riddle.answer = answer;
      riddle.reward = reward;
      riddle.save();
        res.redirect('/user/history');
    })
    .catch((err) => console.log(err));
};

exports.getRiddleDetails = (req, res, next) => {
  const riddleId = req.params.riddleId;
  if (riddleId) {
    Riddle.findById(riddleId)
      .then((riddle) => {
      res.render('user/riddle-details', {
          riddle: riddle,
          editing: true,
          pageTitle: 'Riddle details',
          path: '/user/riddle-details/:riddleId',
          backPath: '/user/history',
          // isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect('/');
  }
};