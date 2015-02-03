module.exports = function( pub, ioc, callback ) {
	ioc.getContainer()
		.registerResolved( {
			settings: require( './config/settings.json' ),
			spawn: require( 'child_process' ).spawn
		} )
		.autoRegisterPath( './lib' )
		.inject( function( dynamoDb, dynamoDbLocalManager ) {
			pub.dynamoDb = dynamoDb;
			pub.start = dynamoDbLocalManager.start;
			callback();
		} );
};
