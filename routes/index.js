var router = require( 'express' ).Router();
var pg = require( 'pg' )
var api = require( './api' )(pg);
var home = require( './home' )();

/* GET home page. */
router.get( '/', home.index );
router.get( '/api/book/', api.book );
router.get( '/api/listProject/', api.listProjects );
router.get( '/api/project/', api.project );
router.get( '/api/presets/', api.presets );

module.exports = router;
