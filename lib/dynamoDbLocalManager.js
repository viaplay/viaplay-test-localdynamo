module.exports = function( pub, spawn, settings, path, net ) {
	pub.start = function( port, callback ) {
		if( !callback ) {
			callback = port;
			port = settings.port;
		}
		var child = spawn( 'java', [
			'-Djava.library.path=' + path.resolve( __dirname, '../dynamodb_local/DynamoDBLocal_lib' ),
			'-jar',
			path.resolve( __dirname, '../dynamodb_local/DynamoDBLocal.jar' ),
			'-inMemory',
			'-port',
			port.toString()
		] );
		process.on( 'exit', function() {
			child.kill();
		} );
		process.on( 'SIGINT', function() {
			process.exit();
		} );
		( function connect() {
			net
				.connect( { port: settings.port }, function() {
					this.end();
					callback( undefined, { stop: function() {
						child.kill();
					} } );
				} )
				.on( 'error', function( err ) {
					setTimeout( connect, 10 );
				} );
		} )();
	};
};
