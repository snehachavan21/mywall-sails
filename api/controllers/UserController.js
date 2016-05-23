/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var transporter = nodemailer.createTransport(ses({
    accessKeyId: sails.config.accessKeyId,
    secretAccessKey: sails.config.secretAccessKey
}));

module.exports = {
    dashBoard: function (req, res) {
        return res.view('homepage');
    },
    userPage: function (req, res) {
        return res.view('pages/user');
    },
    testPage: function (req, res) {

        var mailOptions = {
            from: '"Amitav Roy" <amitav.roy@focalworks.in>',
            to: '"Amitav Roy" <amitav.roy@focalworks.in>',
            subject: 'Hi',
            html: 'This is a <strong>test</strong> mail'
        };

        sesmail.sesmailSendMail(mailOptions);

        return res.json(200, ["asdads"]);
    },
    changePassword: function (req, res) {
        return res.view('pages/change_password');
    }

};
