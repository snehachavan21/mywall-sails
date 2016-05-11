/**
 * TimeEntriesController
 *
 * @description :: Server-side logic for managing Timeentries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCSRFToken: function (req, res) {
    return res.json(200, _csrf);
  },
  getAllTimeEntries: function (req, res) {
    var time_entries = TimeEntries.find({
      limit: 20
    }).exec(function (err, time_entries) {
      return res.json(200, time_entries);
    });
  },
  saveNewTimeEntry:function(req,res){
    var data_from_time_entries = req.params.all();
    TimeEntries.create(data_from_time_entries).exec(function (err, time_entry) {
      if(!err){
        sails.sockets.blast('time-entry-created', {
          time_entry: time_entry
        });
        return res.json(200, time_entry);
      }else{
        console.log(err);
      }
    });
  }
};

