/**
 * AuthController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var nodemailer = require('nodemailer');
//var ses = require('nodemailer-ses-transport');
//var transporter = nodemailer.createTransport(ses({
//    accessKeyId: sails.config.accessKeyId,
//    secretAccessKey: sails.config.secretAccessKey
//}));

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
            sails.sockets.blast('user-updated', {
                user: updated[0],
                userId: updated[0].id
            });
            req.logout();
            res.redirect('/login');
        });
    },
    doLogin: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                req.flash('error', 'Login failed.');
                return res.redirect('/login');
                /* return res.send({
                 message: 'login failed'
                 });*/
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
                            sails.sockets.blast('user-updated', {
                                user: updated[0],
                                userId: updated[0].id
                            });
                            return res.redirect('/');
                        });
                    }
                });
            }
        })(req, res);
    },
    forgotPassword: function (req, res) {
        return res.view('pages/forgot_password', {
            layout: false
        });
    },
    sendPassword: function (req, res) {
        User.findOne({
            email: req.body.username
        }).exec(function (err, user) {
            if (err) {
                return res.send(err);
            }
            if (!user) {
                req.flash('error', 'Could not find user, sorry.');
                return res.redirect('/forgot-password');
            }

            var newpassword = User.createPassword();
            User.update({
                id: user.id
            }, {
                password: newpassword
            }).exec(function afterwards(err, updated) {
                if (err) {
                    return res.send(err);
                }

                res.render('emails/send_password', {
                    user: user,
                    newpassword: newpassword,
                    layout: false
                }, function (err, html) {

                    var mailOptions = {
                        from: '"Amitav Roy" <amitav.roy@focalworks.in>',
                        to: '"' + user.name + '" <' + user.email + '>',
                        subject: 'New Timesheet Login Password',
                        html: html
                    };

                    sesmail.sesmailSendMail(mailOptions);
                    req.flash('message', 'Please check your mails.');
                    return res.redirect('/forgot-password');
                });

            });


        });
    }
};
