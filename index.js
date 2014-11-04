module.exports = function( pub, ioc, callback ) {
	ioc.getContainer()
		.registerIocLog( 'log' )
		.registerResolved( {
			settings: require( './config/settings.json' ),
			spawn: require( 'child_process' ).spawn
		} )
		.autoRegisterPath( './lib' )
		.resolveAllAndInject( function( dynamoDb, dynamoDbLocalManager ) {
			pub.dynamoDb = dynamoDb;
			pub.start = dynamoDbLocalManager.start;
			callback();
		} );
};
