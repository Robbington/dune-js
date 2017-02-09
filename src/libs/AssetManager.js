var _global = _global || {}

_global.tmp = function(game){

	var cache = {},
	validate = function(item) {
		if(typeof item !== 'object') {
			return false;
		}

		var validation = {
			'src' : true,
		};
		for(var v in validation) {
			if(typeof item[v] === 'undefined') {
				return false;
			}
			if(typeof validation[v] == 'string') {
				if(typeof item[v] !== validation[v]) {
					return false;
				}
			}
		}
		return true;
	};

	return {
		register : function(id, asset) {
			if(validate(asset)) {
				var image = Image();
				if(typeof asset['onload'] == 'function') {
					image.onload = asset['onload'];
				}
				image.src = asset.src;
				cache[id] = image;
			}
		}, 
		get(id) {
			if(typeof cache[id] == 'object') {
				return cache[id];
			} 
		}
	}
};