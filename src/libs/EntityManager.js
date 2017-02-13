var _global = _global || {}

_global.tmp = function(a, g) {
	var assets = a, 
		game = g,
		cache = {},
		queue = [],
		entities = [], 
	
	onload_queue = function(id) {
		for(var q=0;q<queue.length;q++) {
			if(typeof queue[q][id] === 'object') {
				var item = {};
				item[id] = cache[id](queue[q][id]);
				entities.push(item)
				queue.splice(q, 1);
			}
		}
	}

	return {
		register : function(id, src){ 
			if(typeof cache[id] !== 'function') {
				cache[id] = true;
				game.autoload(src, function(){
					cache[id] = _global.tmp;	
					onload_queue(id);
				});
			}
		},
		create : function(id, data) {
			if(typeof cache[id] !== 'undefined') {
				item = {};
				if(typeof cache[id] == 'function') {
					item[id] = cache[id](data);
					entities.push( item );
				}
				else {
					item[id] = data;
					queue.push(item)
				} 	
			}
		},
		reset : function() {
			entities = {};
		},
		getEntities : function() {
			return entities;
		},
		hasEntity : function(id) {
			
		} 
	}
};