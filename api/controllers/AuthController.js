/**
 * AuthController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  loginPage: function (req, res) {
    return res.view('pages/login', {
      layout: false
    });
  },
  logout: function (req, res) {
    User.update({
      id: req.user.id
    }, {
      online: null
    }).exec(function afterwards(err, updated) {
      req.logout();
      res.redirect('/login');
    });
  },
  doLogin: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: 'login failed'
        });
        res.send(err);
      } else {
        req.logIn(user, function (err) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            User.update({
              id: req.user.id
            }, {
              online: 1
            }).exec(function afterwards(err, updated) {
              return res.redirect('/');
            });
          }
        });
      }
    })(req, res);
  }
};
