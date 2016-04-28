/**
 * AuthController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  loginPage: function (req, res) {
    return res.view('pages/login', {layout: false});
  },
  doLogin: function (req, res) {
    return res.json(req.body);
  }
};

