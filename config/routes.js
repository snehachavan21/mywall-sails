/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': 'UserController.dashBoard',

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

  '/login': 'AuthController.loginPage',
  '/logout': 'AuthController.logout',
  '/do-login': 'AuthController.doLogin',
  '/users': 'UserController.userPage',
  '/clients': 'ClientController.clientPage',
  '/projects': 'ProjectController.getProjectPage',
  '/tags': 'TagController.tagPage',
  '/time-entries': 'TimeEntriesController.timeEntriesPage',
  '/test': 'UserController.testPage',

  /***************************************************************************
   *                                                                          *
   * REST API Call routes are here...                                         *
   *                                                                          *
   * All rest api calls routes are added below this block of code             *
   *                                                                          *
   ***************************************************************************/

  'get /api/get-csrf-token': 'rest/RestUserController.getCSRFToken',
  'get /api/get-all-users': 'rest/RestUserController.restGetUsers',
  'post /api/save-new-user': 'rest/RestUserController.saveNewUser',
  'get /api/get-all-clients': 'rest/RestClientController.getAllClients',
  'post /api/save-new-client': 'rest/RestClientController.saveNewClient',
  'get /api/get-all-projects': 'rest/RestProjectController.restGetProjects',
  'post /api/save-new-project': 'rest/RestProjectController.saveProject',
  'get /api/get-all-tags': 'rest/RestTagController.getAllTags',
  'post /api/save-new-tag': 'rest/RestTagController.saveNewTag',
  'get /api/get-all-time-entries': 'rest/RestTimeEntriesController.getAllTimeEntries',
  'post /api/save-new-time-entry': 'rest/RestTimeEntriesController.saveNewTimeEntry'

};
