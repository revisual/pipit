describe( 'Services', function () {

   describe( 'imageService', function () {

      var imageMocks = [];

      beforeEach( module( "app.services" ) );


      beforeEach( inject( function ( imageService ) {
         imageService.getImage = function () {
            var mock = {onload: null, onerror: null, src: null};
            imageMocks.push( mock );
            return mock;
         }

      } ) );

      afterEach( inject( function ( imageService ) {
         imageService.reset();
         imageMocks.length = 0;
      } ) );

      it( 'should increase the totalNumberImages by one when a url is added', inject( function ( imageService ) {
         var PATH_1 = "/api/project/img1.jpg";
         imageService.add( PATH_1 );
         expect( imageService.totalNumberImages ).to.equal( 1 );
      } ) );


      it( 'should increase the totalNumberImages by length if an array is added ', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         expect( imageService.totalNumberImages ).to.equal( 3 );
      } ) );

      it( 'should only create an Image before loading', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         imageService.start();
         expect( imageMocks.length ).to.equal( 1 );
      } ) );

      it( 'should assign the first url to the src property ', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         imageService.start();
         expect( imageMocks[0].src ).to.equal( URLS[0] );
      } ) );

      it( 'should assign an error and load handler', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         imageService.start();
         expect( imageMocks[0].onerror ).to.be.instanceOf( Function );
         expect( imageMocks[0].onload ).to.be.instanceOf( Function );
      } ) );

      it( 'should add image to images list onload', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         imageService.start();
         imageMocks[0].onload();
         expect( imageService.images.length  ).to.equal(1);
         expect( imageService.images[0] ).to.equal(imageMocks[0]);
      } ) );

      it( 'should remove error and load handler on successful load', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         imageService.start();
         imageMocks[0].onload();
         expect( imageMocks[0].onerror ).to.be.null;
         expect( imageMocks[0].onload ).to.be.null;
      } ) );

      it( 'should dispatch resolve Signal with correct params', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         var receivedImg;
         var receivedIndex = -1;
         imageService.add( URLS );
         imageService.start();

         imageService.on.resolve.addOnce( function ( img, index ) {
            receivedImg = img;
            receivedIndex = index;
         } );

         imageMocks[0].onload();
         expect( receivedImg ).to.equal( imageMocks[0] );
         expect( receivedIndex ).to.equal( 0 );
      } ) );

      it( 'should dispatch progress Signal with correct params', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         var receivedCurrent = -1;
         var receivedTotal = -1;
         imageService.add( URLS );
         imageService.start();

         imageService.on.progress.addOnce( function ( current, total ) {
            receivedCurrent = current;
            receivedTotal = total;
         } );

         imageMocks[0].onload();
         expect( receivedCurrent ).to.equal( 1 );
         expect( receivedTotal ).to.equal( URLS.length );
      } ) );

      it( 'should dispatch complete Signal if all items processed', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         var executedComplete = false;

         imageService.add( URLS );
         imageService.start();

         imageService.on.complete.addOnce( function (  ) {
            executedComplete = true
         } );

         imageMocks[0].onload();
         imageMocks[1].onerror();
         imageMocks[2].onload();
         expect( executedComplete ).to.be.true;
      } ) );

      it( 'should not dispatch complete Signal if more in queue', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         var executedComplete = false;

         imageService.add( URLS );
         imageService.start();

         imageService.on.complete.addOnce( function (  ) {
            executedComplete = true
         } );

         imageMocks[0].onload();
         expect( executedComplete ).to.be.false;
      } ) );

      it( 'should create the next image once the first is loaded', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         imageService.start();
         imageMocks[0].onload();
         expect( imageMocks.length ).to.equal( 2 );
      } ) );

      it( 'should create the next image if the first errored', inject( function ( imageService ) {
         var URLS = ["/api/project/img1.jpg", "/api/project/img2.jpg", "/api/project/img3.jpg"];
         imageService.add( URLS );
         imageService.start();
         imageMocks[0].onerror();
         expect( imageMocks.length ).to.equal( 2 );
      } ) );


   } );


} )
;
