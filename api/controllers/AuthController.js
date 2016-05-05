/**
 * AuthController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  loginPage: function(req, res) {
    return res.view('pages/login', {
      layout: false
    });
  },
  doLogin: function(req, res) {
    passport.authenticate('local', function(err, user, info) {

    })(req, res);
    return res.json(200, req.body);
  }
};
