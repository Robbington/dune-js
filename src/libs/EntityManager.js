var _global = _global || {}

_global.tmp = function(a, g) {
	var assets = a, 
		game = g,
		cache = {},
		queue = {},
		entities = {}, 
	
	onload_queue = function(id) {
		if(queue[id]){
			for(var q in queue[id]) {
				var item = queue[id][q];
				if(typeof item === 'object') {
					entities[id][q] = cache[id](item, data, q);
				}
				delete queue[id][q];
			}
		}
	}

	return {
		register : function(id, src) { 
			if(typeof cache[id] !== 'function') {
				cache[id] = true;
				game.autoload(src, function(){
					cache[id] = _global.tmp;	
					onload_queue(id);
				});
			}
		},
		create : function(type, id, data) {

			if(typeof cache[type] === 'function') {
				item = {};
				if(typeof entities[type] === 'undefined'){
					entities[type] = {};
				}
				entities[type][id] = cache[type](data, game);	
			}
			else {
				if (typeof queue[type] === 'undefined') {
					queue[type] = {};
				}
				queue[type][id] = item;
			}
		},
		reset : function() {
			entities = [];
		},
		getEntities : function() {
			return entities;
		},
		hasEntity : function(id) {
			
		}, 
		getEntitiesByType(type) {
			if(entities[type]) {
				return entities[type];
			}
			return {};
		}
	}
};