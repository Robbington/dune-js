_global = _global || {}


_global.tmp = function(args, game) {

	var render_map = {
		width : 0,
		height: 0,
		background: false,
		color : false,
		font  : false  
		x     : 0,
		y     : 0, 
		buttons : {}
	};

	if(typeof args =='object') {
		for(r in render_map) {
			if(typeof args[r] !== 'undefined') {
				render_map[r] = args[r];
			}
		}
	}


	return {
		render : function() {

		}, 
		handle : function(){
			
		}
	}
}