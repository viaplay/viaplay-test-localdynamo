var aws = require( 'aws-sdk' ),
	spawn = require( 'child_process' ).spawn,
	net = require( 'net' ),
	path = require( 'path' );
module.exports = function() {
	var start = function( port, callback ) {
		var child = spawn( 'java', [
			'-Djava.library.path=' + path.resolve( __dirname, '../dynamodb_local/DynamoDBLocal_lib' ),
			'-jar',
			path.resolve( __dirname, '../dynamodb_local/DynamoDBLocal.jar' ),
			'-inMemory',
			'-port',
			port.toString()
		] );
		process.on( 'exit', function() { child.kill(); } );
		process.on( 'SIGINT', function() { process.exit(); } );
		( function connect() {
			net
				.connect( { port: port }, function() {
					this.end();
					callback();
				} )
				.on( 'error', function( err ) {
					setTimeout( connect, 10 );
				} );
		} )();
	};
	return function( port, callback ) {
		start( port, function() {
			aws.config.update( {
				sslEnabled: false,
				endpoint: 'localhost:' + port.toString(),
				accessKeyId: 'xxx',
				secretAccessKey: 'xxx',
				region: 'xxx'
			} );
			callback( undefined, new aws.DynamoDB() );
		} );
	};
};
