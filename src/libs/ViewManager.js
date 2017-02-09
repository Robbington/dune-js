_global = _global || {}

_global.tmp = function(e, a, g){

	var entityManager = e,
		assetManager  = a,
		game = g,
		views = {};
		abstract = (function(){
			return {
				render : function(){}
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
		},
		registerItem = function(view, id, item, type) {
			if(type == 'asset') {
				views[view]['asset'][id] = assetManager.register(item);
			}
			if(type == 'entity') {
				views[view]['entity'][id] = assetManager.register(item);	
			}
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
		registerAssets : function(view, assets) {
			if(typeof view == 'string' && typeof views[view] == 'object') {
				if(typeof assets == 'object') {
					for(var a in assets) {
						registerItem(view, a, assets[a], 'asset');
					}
				}
			}
		},
		registerEntities : function(){
			if(typeof view == 'string' && typeof views[view] == 'object') {
				if(typeof assets == 'object') {
					for(var a in assets) {
						
					}
				}
			}
		},
		renderAsset : function(id){

		}
	}
}
