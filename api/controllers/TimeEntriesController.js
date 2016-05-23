/**
 * TimeEntriesController
 *
 * @description :: Server-side logic for managing Timeentries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  timeEntriesPage: function (req, res) {
    return res.view('pages/time_entries');
  }
};

