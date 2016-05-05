/**
 * AuthController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  loginPage: function (req, res) {
    return res.view('pages/login', {layout: false});
  },
  doLogin: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      // something went wrong
      if ((err) || (!user)) {
        return res.send({message: 'Login failed!'});
        res.send(err);
      }

      req.login(user, function (err) {
        if (err) res.send(err);
        return res.send({
          message: 'login successful'
        });
      });
    })(req, res);
  }
};

