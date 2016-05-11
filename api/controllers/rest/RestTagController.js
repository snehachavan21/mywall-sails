/**
 * TagController
 *
 * @description :: Server-side logic for managing Tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCSRFToken: function (req, res) {
    return res.json(200, _csrf);
  },
  getAllTags: function (req, res) {
    var tags = Tag.find({
      limit: 20
    }).exec(function (err, tags) {
      return res.json(200, tags);
    });
  },
  saveNewTag:function(req,res){
    var data_from_tag = req.params.all();
    console.log(data_from_tag);
    Tag.create(data_from_tag).exec(function (err, tag) {
        if(!err){
          sails.sockets.blast('tag-created', {
            tag: tag
          });
          return res.json(200, tag);
        }else{
          console.log(err);
        }
      });
  }
};

