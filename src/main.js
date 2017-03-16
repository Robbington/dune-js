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
					}, 
					//TODO: Width is wrong if not an element property of canvas
					getWidth : function(){
						if(!this.w){
							this.w = this.getComputed('width', true);
						}
						return this.w;
					},
					//TODO: Height is wrong if not an element property of canvas
					getHeight : function() {
						if(!this.h){
							this.h = this.getComputed('height', true);
						}
						return this.h;
					}, 
					getComputed : function(attr, asInt, cb){
						if(!this.styles) {
							this.styles = window.getComputedStyle(this.element);
						}
						if(typeof(attr) == 'string') {
							if(typeof(this.styles[attr]) !== 'undefined'){
								var style = this.styles[attr];
								if(asInt === true) {
									style = parseInt((typeof(style) == 'string') ? style.replace('px', '') : style);
								}	

								return (typeof(cb) === 'function') ? cb(style) : style;
							}
							return;
						}
						return this.styles;
					},
					getBoundry : function(){
						if(!this.bounds) {
							this.bounds = this.element.getBoundingClientRect();
						}

						return this.bounds;
					}
				},
				loop   : {
					frame : 0,
					fps: 40,
					interpolation : 0,
					intval : false,
					timer : {
						ms : 0,
						events : [],
						register : function(tout, ev) {
							if(typeof(ev) === 'object') {
								if(typeof(ev.onEnd) !== 'function') {
									ev.onEnd = function(){};
								}
								if(typeof(ev.onUpdate) !== 'function') {
									ev.onUpdate = function(){};
								}
								ev.timeout = tout;
								ev.counter = 0;
								loop.timer.events.push(ev);
							}
						},
						update : function() {
							this.ms += this.fps;
							var events = [];
							for(var e=0;e<loop.timer.events.length; e++) {

								var ev = loop.timer.events[e];
								var marker = (ev.timeout - loop.fps) > 0;
								
								if(marker) {
									ev.timeout -= loop.fps;

									marker = ev.onUpdate(ev.timeout / loop.fps);
									ev.counter ++;
									
								}
								
								if(marker === false) {
									ev.onEnd();
								} 
								else {
									events.push(ev);
								}
							}
							loop.timer.events = events;
						}
					},
					start : function() {
						if(!game.loop.intval) {
							game.loop.intval = setInterval(
								game.loop.render, 
								(1000 / game.loop.fps)
							);
						}
					},
					stop : function() {
						var e = new Error();
						console.log(e.stack);
						clearInterval(game.loop.intval);
					},
					render : function() {
						state = game.state;
						loop  = game.loop;
						//loop.stop();

						if(state.ready && state.view.instance) {
							if (loop.interpolate()) {
								try{
									loop.timer.update();
									var retval = state.view.instance.render(game.canvas.refresh);
									if(typeof retval == 'function') {
										retval(main, state);
									}
								}catch(error) {
									console.log(error);
									loop.stop();
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
							callback(game, _global.tmp || false );
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
    			game.autoload('src/libs/ContextWrapper.js', function(game, wrapper) { 
					game.canvas.wrapper = wrapper(game.canvas.cxt, game.canvas);
					game.autoload('src/config.js', function(game) { 
						if(typeof _global == 'object') {
							_global.loadServices(game, game.loop.start);			
						}
					})
				});
				initiated = true;
    		}
    	}
  	}
})(); 



