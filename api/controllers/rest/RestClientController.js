/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCSRFToken: function (req, res) {
    return res.json(200, _csrf);
  },
  getAllClients: function (req, res) {
    var clients = Client.find({
      limit: 20
    }).exec(function (err, clients) {
      return res.json(200, clients);
    });
  },
  getClient: function (req, res) {
    var clients = Client.find({
      id:req.param('client_id')
    }).exec(function (err, clients) {
      return res.json(200, clients);
    });
  },
  saveNewClient:function(req,res){
    var data_from_client = req.params.all();
    Client.create(data_from_client)
      .exec(function (err, client) {
        if(!err) {
          sails.sockets.blast('client-created', {
            client: client
          });
          return res.json(200, client);
        }else{
          console.log(err);
        }
      });
  }
};

