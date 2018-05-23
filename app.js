// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// Declare express variable
const app = express();

// Set Static Folder

// CORS Middleware
app.use(cors());
// Set port number
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log('Server startet on port ' + port);
});

var rabbit = require('wascally');
var settings = {
  connection: {
		user: 'okigdyac',
		pass: 'qAAeul-Jo8naKIbhwMxFxtjwnCn8MLbP',
		server: 'sheep.rmq.cloudamqp.com',
	//	port: 5000,
		vhost: 'okigdyac'
		//replyQueue: 'derp'
	},
	exchanges: [
		{ name: 'snd.1', type: 'topic', persistent: true }
	],
	queues: [
		{ name: 'fb', limit: 500, queueLimit: 1000, subscribe: true, durable: true }
	],
	bindings: [
		{ exchange: 'snd.1', target: 'fb', keys: [ 'post', 'request' ] }
	]
};

var handler = rabbit.handle( 'snd.1.fb.post', function( message ) {
	try {
		console.log( message.body );
		message.reply( "hello from server!" );
	} catch ( err ) {
		message.nack();
	}
} );
rabbit.configure( settings ).done( function() {} );
