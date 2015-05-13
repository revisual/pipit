describe( 'Directives', function () {

   describe( 'TrackPad', function () {

      var $compile,
         $rootScope,
         element;

      // Load the myApp module, which contains the directive
      beforeEach( angular.mock.module( 'app.directives' ) );

      beforeEach( function () {
         swipe = {};

         angular.mock.module( function ( $provide ) {
            $provide.value( '$swipe', swipe );
         } );

      } );

      // Store references to $rootScope and $compile
      // so they are available to all tests in this describe block
      beforeEach( inject( function ( _$compile_, _$rootScope_ ) {
         // The injector unwraps the underscores (_) from around the parameter names when matching
         $compile = _$compile_;
         $rootScope = _$rootScope_;
         element = $compile( "<track-pad enabled='true' touch-enabled='false'></track-pad>" )( $rootScope );

         $rootScope.$digest();
      } ) );

      function mouseDown( x, y ) {
         element.triggerHandler( {
            type: 'mousedown',
            screenX: x,
            screenY: y
         } )
      }

      function mouseUp( x, y ) {
         element.triggerHandler( {
            type: 'mouseup',
            screenX: x,
            screenY: y
         } )
      }

      function mouseMove( x, y ) {
         element.triggerHandler( {
            type: 'mousemove',
            screenX: x,
            screenY: y
         } )
      }

      it( 'Sets scope.previousPoint x and y values to 0', function () {
         expect( $rootScope.trackPad.previousPoint.x ).to.equal( 0 );
         expect( $rootScope.trackPad.previousPoint.y ).to.equal( 0 );
      } );

      it( 'Sets scope.distancePoint x and y values to 0', function () {
         expect( $rootScope.trackPad.distancePoint.x ).to.equal( 0 );
         expect( $rootScope.trackPad.distancePoint.y ).to.equal( 0 );
         expect( $rootScope.trackPad.distancePoint.my ).to.equal( 0 );
         expect( $rootScope.trackPad.distancePoint.my ).to.equal( 0 );
      } );

      it( 'Sets scope.active to true on mousedown', function () {
         $rootScope.$watch( 'active', function () {
            expect( $rootScope.active ).to.be.true;
         } );
         mouseDown( 20, 40 );

      } );

      it( 'Sets scope.active to false on mouseup', function () {
         mouseDown( 20, 40 );
         $rootScope.$watch( 'active', function () {
            expect( $rootScope.active ).to.be.false;
         } );

         mouseUp( 20, 40 );

      } );

      it( 'Sets scope.previousPoint x and y values on mousedown', function () {
         mouseDown( 10, 15 );
         expect( $rootScope.trackPad.previousPoint.x ).to.equal( 10 );
         expect( $rootScope.trackPad.previousPoint.y ).to.equal( 15 );
      } );

      it( 'Sets scope.distancePoint x and y values to 0 on mousedown', function () {
         mouseDown( 10, 15 );
         expect( $rootScope.trackPad.distancePoint.x ).to.equal( 0 );
         expect( $rootScope.trackPad.distancePoint.y ).to.equal( 0 );
      } );

      it( 'Sets scope.distancePoint mx and my values to 0 on mousedown', function () {
       element.attr('enabled', 'true');
       $rootScope.trackPad.distancePoint.mx = 55;
       $rootScope.trackPad.distancePoint.my = 60;
       mouseDown( 10, 15 );
       expect( $rootScope.trackPad.distancePoint.mx ).to.equal( 0 );
       expect( $rootScope.trackPad.distancePoint.my ).to.equal( 0 );
       } );

       it( 'Sets scope.distancePoint x and y values on mousemove', function () {
       element.attr('enabled', 'true');
       mouseDown( 10, 10 );
       mouseMove( 60, 60 );
       expect( $rootScope.trackPad.distancePoint.x ).to.equal( 50 );
       expect( $rootScope.trackPad.distancePoint.y ).to.equal( 50 );
       } );

       it( 'Sets scope.previousPoint mx and my values on mousemove', function () {
       element.attr('enabled', 'true');
       mouseDown( 10, 10 );
       mouseMove( 30, 60 );
       expect( $rootScope.trackPad.previousPoint.mx ).to.equal( 30 );
       expect( $rootScope.trackPad.previousPoint.my ).to.equal( 60 );
       } );

       it( 'Sets scope.distancePoint mx and my values on mousemove', function () {
       element.attr('enabled', 'true');
       mouseDown( 10, 10 );
       mouseMove( 60, 60 );
       mouseMove( 65, 65 );
       expect( $rootScope.trackPad.distancePoint.mx ).to.equal( 5 );
       expect( $rootScope.trackPad.distancePoint.my ).to.equal( 5 );
       } );

       it( 'Returns normalised metrics on normalise', function () {
       element.attr('enabled', 'true');
       mouseDown( 10, 10 );
       mouseMove( 35, 35 );
       mouseMove( 60, 60 );

       var n = $rootScope.trackPad.normalise(100,100);

       expect( n.firstTouchX ).to.equal( 10/100 );
       expect( n.firstTouchY ).to.equal( 10/100 );
       expect( n.lastTouchX ).to.equal( 60 / 100 );
       expect( n.lastTouchY ).to.equal( 60 / 100 );

       expect( n.distFromFirstX ).to.equal( 50/100 );
       expect( n.distFromFirstY ).to.equal( 50/100 );
       expect( n.distFromLastX ).to.equal( 25/100 );
       expect( n.distFromLastY ).to.equal( 25/100 );

       } );


   } );


} )
;
