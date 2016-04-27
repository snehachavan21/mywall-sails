/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Return the page to add a new user
   * @param req
   * @param res
   */
  addUser: function (req, res) {
    return res.view('user/user-add');
  },
  saveUser: function (req, res) {
    console.log(req.body);
  }
};

