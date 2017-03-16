_global = _global || {}

_global.tmp = function(e, a, g) {

	var entityManager = e,
		assetManager  = a,
		game = g,
		views = {},
		eventRegister = {
			last : false,
			register : function(type, evnt) {
				if(typeof evnt == 'function') {
					this.events[type].push(evnt);
				}
				else if(Array.isArray(evnt)) {
					for(var e=0;e<evnt.length;e++) {
						this.events[type].push(evnt[e]);
					}
				}
			},
			events : {}, // View Events, take precendence of entity events
			reset : function(){ this.events = {
					'keydown' : [],
					'click' : [], 
					'hover' : []
				}; 
			},
			process : function(i, e) {
				var retval = false;
				if(typeof i =='function') {
					retval = i(e, this.events, this.last);
					while(typeof retval == 'function') { 
						retval = retval(e, this.events, this.last);
					}
				}
				return retval;
			},
			handle: function(e){
				this.last = e;
				if(typeof this.events[e.type] == 'object') {
					for(var ve =0;ve<this.events[e.type].length;ve++) {
						if(this.process(this.events[e.type][ve], e) === true) {
							return; //Stop Propegation if retval true
						}
					}
				}

				var entities = entityManager.getEntities();

				for(var ev=0;ev<entities.length;ev++) {
					for(var ent in entities[ev]) {
						if(this.process(entities[ev][ent].handleEvent, e) === true) {
							return; //Stop Propegation if retval true
						}
					}
				}
			}
		},
		abstract = (function(){
			return {
				render : function(){},
				getAssets : function(){ return {}; },
				getEntities : function(){ return {}; }
			}
		}());
		
		var register = function(l, i) {
			views[l] = {label : l} 
			for(var a in abstract) {
				if(typeof i[a] == 'undefined' || typeof i[a] !== typeof abstract[a]) {
					i[a] =  abstract[a];
				}
			}
			views[l]['instance'] = i;
			var setup = views[l]['instance'].getSetup();
			
			for(type in setup) {
				for(item in setup[type]) {
					registerItem(l, 
						item, 
						setup[type][item], 
						type
					);
				}
			}
		},
		registerItem = function(view, id, item, type) {

			if(type == 'asset' || type == 'assets') {
				assetManager.register(id, item);
			}
			else if(type == 'entity' || type == 'entities') {
				entityManager.register(id, item);	
			}
			else if (type == 'event' || type == 'events') {
				eventRegister.register(id, item);
			}
		}, 
		getEventWrapper = function(e, t) {
			var	bounds = game.canvas.element.getBoundingClientRect(); 
			return {
				e : e,
				x : (e.clientX - bounds.x),
				y : (e.clientY - bounds.y),
				onCanvas : function(){ return (this.x > 0 && this.y > 0); }, 
				_in : function(x, y, w, h) {
					if(this.x > x && this.x < x + w) {
						if(this.y > y && this.y < y + h) {
							return true;
						}
					}
					return false;
				}, 
				type : t
			}
		};

		eventRegister.reset();
		//Bind Canvas Events
		game.canvas.element.onclick = function(e) {
			var _event = getEventWrapper(e, 'click');
			if(_event.onCanvas()) {
				eventRegister.handle(_event);
			}
		};

		window.onmousemove = function(e){
			var _event = getEventWrapper(e, 'hover');
			if(_event.onCanvas()) {
				eventRegister.handle(_event);
			}
		};
		window.keydown = function(e) {
			eventRegister.handle({
				type : 'keydown', 
				e : e
			});
		};

	return {
		_register : function(name) {
			if(typeof _global.tmp == 'function') {
				_global.tmp.bind(abstract);
				register(name, _global.tmp(this))
			}
			return this.get(name);
		},
		get : function(name) {
			if(typeof views[name] == 'object'){
				return views[name];
			}
			return false;
		},
		getAssets: function(id) {
			if(typeof id =='string') {
				return assetManager.get(id);
			}
			
			return assetManager;
		}, 
		getEnities: function(){
			return entityManager;
		},
		fireEvent : function(type, e) {
			eventRegister.handle(type,e);
		},
		createSingleInstanceEntity : function(type, id, config) {
			var entities = entityManager.getEntitiesByType(type);
			if (typeof entities[id] === 'object') {
				return entities[id];
			}

			entityManager.create(type, id, config);
		},
		refresh : function(){
			game.canvas.refresh();
		},
		createEntity : entityManager.create,
		getGame : function() { //DEBUG ONLY METHOD 
			return game;
		}, 
		renderBackground: function(bg){
			if(typeof(bg) == 'string' && bg.length > 0) {
				//TODO: Try and retrieve asset from asset manager	
			}

			game.canvas.wrapper.background(bg);
		}, 
		transitions : {
			fade : function(timeout, cb, reset, fadein) {
				var opacity   = game.canvas.getComputed('opacity') || 1,
					increment = 0 - opacity / (timeout / game.loop.fps);
					if(fadein) {
						increment = Math.abs(increment);
					}

				game.loop.timer.register(timeout, {
					onUpdate : function(framesleft) {
						game.canvas.wrapper.fade(increment);
						return true;
					},
					onEnd : function() {
						cb();
						if(reset !== false) {
							game.canvas.wrapper.fade(0, opacity);
						}
					}
				});
			}
		}
	}
}
