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
					'click' : []
				}; 
			},
			process : function(i, e) {
				var retval = false;
				if(typeof i =='function') {
					retval = i(e, this.events, this.events.last);
					while(typeof retval == 'function') { 
						retval = retval(e, this.events, this.events.last);
					}
				}
				return retval;
			},
			handle: function(t, e){
				this.last = {'type' : t, 'event' : e};
				console.log(this.events);
				if(typeof this.events[t] == 'object') {
					for(var ve =0;ve<this.events[t].length;ve++) {
						if(this.process(this.events[t][ve]) === true) {
							return; //Stop Propegation if retval true
						}
					}
				}

				var entities = entityManager.getEntities();
				for(e in entities) {
					if(this.process(e.handleEvent) === true) {
						return; //Stop Propegation if retval true
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
		};

		eventRegister.reset();
		//Bind Canvas Events
		game.canvas.element.onclick = function(e) {
			eventRegister.handle('click', e);
		};
		game.canvas.element.hover = function(e) {
			eventRegister.handle('hover', e);
		};
		window.keydown = function(e) {
			eventRegister.handle('keydown', e);
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
		getGame : function() { //DEBUG ONLY METHOD 
			return game;
		}
	}
}
