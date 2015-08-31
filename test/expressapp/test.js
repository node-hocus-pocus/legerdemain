var app = require('./app');

var routes = app._router.stack;

var baseUrl = '/'

function printRoutes( routes ){
	for (var key in routes) {
	    if (routes.hasOwnProperty(key)) {
	        var val = routes[key];
	        if (val.route) {
	        	val = val.route;
	            console.log( val.stack[0].method + " " + val.path );
	        } else if (val.name === 'router'){
	        	console.log('recurse')
	        	console.log(val)
	        	console.log("****")
	        	printRoutes( val.handle.stack );
	        } else {
	        	//console.log( val )
	        }
	    } 
	}
}

printRoutes( routes );