var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var transporter = nodemailer.createTransport(ses({
  accessKeyId: sails.config.accessKeyId,
  secretAccessKey: sails.config.secretAccessKey
}));

module.exports = {
  sesmailSendMail: function(mailOptions) {
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log('Message sent');
        return info;
      }
    });
  }
};
