var assert = require( 'assert' );
describe( 'Module test', function() {
	var container = require( 'simple-ioc' )
		.getContainer();
	before( function( callback ) {
		container
			.registerIocLog( 'log' )
			.registerInjectable( {
				localDynamo: require( '../../index.js' )
			} )
			.resolveAllAndInject( function( localDynamo ) {
				callback();
			} );
	} );
	describe( 'start/stop', function() {
		it( 'Should start and stop the local dynamo', function( callback ) {
			this.timeout( 10000 );
			container.inject( function( localDynamo ) {
				localDynamo.start( function( err, instance ) {
					localDynamo.dynamoDb.listTables( {}, function( err, data ) {
						assert.equal( data.TableNames.length, 0 );
						instance.stop();
						callback();
					} );
				} );
			} );
		} );
	} );
} );
