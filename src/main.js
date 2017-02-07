//Version 1.0.0

var main = function(canvas) {
	
	var canvas = canvas,
		cxt = canvas.getContext(),
		//ToDo retain and retrieve persitant state from backend,
		//Need to keep total progress, current level state
		//Perhaps though the use of websockets?
		state = {
			stage : false
			score : 0,
			progress : 0xFFFF //Retain Progress though 16 bit hex marker
		},   
		loadState = function(){

		};

    return {
    	init : function() {

    	},
    	getState : function(){
    		return state;
    	}
    }
}; 

main.autoload = function(src, callback) {

	if(typeof this.cache == 'undefined') {
		this.cache = {};
	}

	if(typeof this.cache[src] !== 'undefined') {
		return;
	}
	else {
		this.cache[src] = true;
	}

	var that = this,
		script = document.createElement('script');
	
	script.onload = function () {
		if(typeof callback == 'function') {
			callback(that, this);
		}
	}
	script.src = src;
	document.getElementsByTagName('head')[0].appendChild(script);
	return this;
}

main.autoload('src/config.js', function(main) { 
	if(typeof _global == 'object') {
		var services = _global.getServices();
		for(var s in services){
			var service = services[s];
			main.autoload(service._class, function(main) {
				service.onInit(main); 
			});
		}
	}
});





