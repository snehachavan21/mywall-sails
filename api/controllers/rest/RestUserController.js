/**
 * RestUserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getCSRFToken: function (req, res) {
        return res.json(200, _csrf);
    },
    restGetUsers: function (req, res) {
        var users = User.find({
            limit: 20
        }).exec(function (err, users) {
            return res.json(200, users);
        });
    },
    saveNewUser: function (req, res) {
        User.create({
            name: req.body.display_name,
            email: req.body.email_address,
            password: req.body.password,
            online: null,
        }).exec(function (err, user) {
            if (!err)
                return res.json(200, user);
        });
    },
    changePassword: function (req, res) {
        if (User.verifyPassword(req.body.current_password, req.user)) {
            User.update({
                id: req.user.id
            }, {
                password: req.body.new_password
            }).exec(function afterwards(err, updated) {
                if (!err)
                    return res.json(200, updated);
                else
                    return res.json(200, err);
            });
        } else {
            var error = {"error": {"mismatch": "Wrong current password."}};
            return res.json(200, error);
        }
    }
};
