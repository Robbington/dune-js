//Version 1.0.0
var main = (function() {
		var initiated = false,
			game = {
				canvas : { 
					element : false, 
					cxt : false,
					h : false, w : false, 
					refresh : function() {
						if(!this.h) {
							this.h = this.element.height;
							this.w = this.element.width;
						}
						this.cxt.clearRect(0,0,1000,500);
						return this;
					}	 
				},
				loop   : {
					frame : 0,
					fps: 40,
					interpolation : 0,
					intval : false,
					start : function() {
						if(!game.loop.intval) {
							game.loop.intval = setInterval(
								game.loop.render, 
								(1000 / game.loop.fps)
							);
						}
					},
					stop : function(){
						clearInterval(game.loop.intval);
					},
					render : function() {
						state = game.state;
						loop  = game.loop;
						//loop.stop();
						if(state.ready && state.view.instance) {
							if (loop.interpolate()) {
								var retval = state.view.instance.render(game.canvas.refresh);
								if(typeof retval == 'function') {
									retval(main, state);
								}
							}
						}
					},
					interpolate : function(){
						game.loop.frame ++;
						if(game.loop.frame > game.loop.fps) {
							game.loop.frame = 0;
						}	
						//ToDo properly interpolate frames
						return true;
					}
				},
				//ToDo retain and retrieve persitant state from backend,
				//Need to keep total progress, current level state
				//Perhaps though the use of websockets?
				state : {
					view : {
						label : false,
						instance : false
					},
					ready : 0,
					score : 0,
					progress : 0xFFFF //Retain Progress though hex marker
				},
				cache: {},
				autoload : function(src, callback) {
					if(typeof game.cache[src] !== 'undefined') {
						return;
					}
					else {
						game.cache[src] = true;
					}
					var script = document.createElement('script');
	
					script.onload = function () {
						if(typeof callback == 'function') {
						callback(game);
					}
				}
				script.src = src;
					document.getElementsByTagName('head')[0].appendChild(script);
					return this;
				}
			};

    return {
    	init : function(canvas, config) {
    		if(!initiated) {
    			game.canvas.element = canvas;
    			game.canvas.cxt = canvas.getContext('2d');
    			game.autoload('src/config.js', function(game) { 
					if(typeof _global == 'object') {
						_global.loadServices(game, game.loop.start);			
					}
				});
				initiated = true;
    		}
    	}
  	}
})(); 



