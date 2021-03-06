module.exports = function ( config ) {
   config.set( {
      basePath: '',
      frameworks: ['mocha', 'chai'],

      files: [
         'node_modules/angular/angular.js',
         'node_modules/angular-mocks/angular-mocks.js',
         /*'node_modules/jquery/dist/jquery.js',*/
         /*'test/client/image-loader.spec.js',
         'test/client/touch-pad.spec.js',
         'test/client/window-service.spec.js',
         'test/client/pipit-api.spec.js',*/
         'test/client/*.spec.js',

         'src/app/signals.js',
         'src/app/*.js'
      ],
      port: 9876,
      colors: true,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false

   } )
};