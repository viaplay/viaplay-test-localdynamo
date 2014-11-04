module.exports = function( aws, settings ) {
	aws.config.update( {
		sslEnabled: false,
		endpoint: 'localhost:' + settings.port.toString(),
		accessKeyId: 'xxx',
		secretAccessKey: 'xxx',
		region: 'xxx'
	} );
	return new aws.DynamoDB();
};
